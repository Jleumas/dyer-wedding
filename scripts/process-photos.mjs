// Builds web-sized copies of every photo and the album manifest the site reads.
//
//   npm run photos -- [originals-dir] [output-dir]
//
// originals-dir has one folder per album (folder name = URL slug), each holding
// the full-size JPEGs plus an optional splash.jpg used as the album header.
// Output mirrors the bucket layout under gallery/<album>/:
//   t400/, t800/  grid thumbnails (WebP)
//   l/            lightbox size, 2048px on the long edge (WebP)
//   splash-960.webp, splash-1920.webp
// The originals themselves are not copied; they stay in the bucket at
// gallery/<album>/<name>.jpg and are linked as "full size" downloads.
//
// Album order and display titles come from albums.config.json. Folders not
// listed there are appended alphabetically with a title made from the slug.
// Existing outputs newer than their source are skipped, so re-runs are cheap.

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcDir = path.resolve(process.argv[2] ?? path.join(root, '../dyer-wedding-photos/originals'));
const outDir = path.resolve(process.argv[3] ?? path.join(root, 'photos-out'));
const config = JSON.parse(await readFile(path.join(root, 'albums.config.json'), 'utf8'));

const THUMBS = [400, 800];
const LARGE = 2048;
const SPLASH = [960, 1920];

const isPhoto = (f) => /\.jpe?g$/i.test(f) && !/^splash\./i.test(f);
const titleFromSlug = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

async function isFresh(out, src) {
    try {
        return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
    } catch {
        return false;
    }
}

async function render(src, out, resize, quality) {
    if (await isFresh(out, src)) return false;
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(src).rotate().resize(resize).webp({ quality }).toFile(out);
    return true;
}

// Small worker pool so we don't open hundreds of files at once.
async function pool(items, size, fn) {
    let i = 0;
    const workers = Array.from({ length: size }, async () => {
        while (i < items.length) await fn(items[i++]);
    });
    await Promise.all(workers);
}

const folders = (await readdir(srcDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
const ordered = [
    ...config.order.filter((s) => folders.includes(s)),
    ...folders.filter((s) => !config.order.includes(s)).sort()
];

const albums = [];
let written = 0;

for (const slug of ordered) {
    const dir = path.join(srcDir, slug);
    const files = (await readdir(dir)).sort();
    const photos = [];

    await pool(files.filter(isPhoto), os.availableParallelism(), async (file) => {
        const src = path.join(dir, file);
        const id = path.parse(file).name;
        const { width, height } = await sharp(src).rotate().metadata().then((m) =>
            // metadata() reports pre-rotation size; swap for EXIF orientations 5-8.
            m.orientation >= 5 ? { width: m.height, height: m.width } : m
        );
        for (const w of THUMBS) {
            if (await render(src, path.join(outDir, 'gallery', slug, `t${w}`, `${id}.webp`), { width: w }, 72)) written++;
        }
        const large = { width: LARGE, height: LARGE, fit: 'inside', withoutEnlargement: true };
        if (await render(src, path.join(outDir, 'gallery', slug, 'l', `${id}.webp`), large, 80)) written++;
        photos.push({ id, file, w: width, h: height });
    });
    photos.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

    const splashSrc = files.find((f) => /^splash\.jpe?g$/i.test(f));
    if (splashSrc) {
        for (const w of SPLASH) {
            const out = path.join(outDir, 'gallery', slug, `splash-${w}.webp`);
            if (await render(path.join(dir, splashSrc), out, { width: w, withoutEnlargement: true }, 78)) written++;
        }
    }

    albums.push({
        slug,
        title: config.titles?.[slug] ?? titleFromSlug(slug),
        splash: Boolean(splashSrc),
        photos
    });
    console.log(`${slug.padEnd(20)} ${String(photos.length).padStart(4)} photos${splashSrc ? ' + splash' : ''}`);
}

const manifest = { home: config.home, albums };
await writeFile(path.join(root, 'src/albums.json'), JSON.stringify(manifest) + '\n');
console.log(`\n${written} image(s) written to ${outDir}; manifest at src/albums.json`);
