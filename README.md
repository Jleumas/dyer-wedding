# The Dyer Wedding

Photo site for [thedyerwedding.com](https://thedyerwedding.com): Vue 3 + Vite,
served from S3 behind CloudFront.

## Albums are folders

Albums, routes and navigation all come from the photo folders. Nothing in
`src/` names an album.

```
dyer-wedding-photos/originals/
  home/            shown on the front page
    img001.jpg …
    splash.jpg     header image (optional)
  the-party/       → /gallery/the-party
    img001.jpg …
    splash.jpg
```

`albums.config.json` sets the nav order, which folder is the front page, and
any title that shouldn't come from the folder name (`getting-ready` → "The
Prep"). New folders not listed there are added at the end, titled from their
name.

To add or change photos:

```sh
npm run photos -- ../dyer-wedding-photos/originals   # makes thumbnails + src/albums.json
aws s3 sync ../dyer-wedding-photos/originals s3://thedyerwedding.com/gallery   # originals, for Download
npm run deploy
```

## How images load

| Use | File | Typical size |
|---|---|---|
| Grid thumbnail | `gallery/<album>/t400/<id>.webp` (`t800` on high-DPI) | ~17 KB |
| Lightbox | `gallery/<album>/l/<id>.webp` | ~190 KB |
| Download button | `gallery/<album>/<id>.jpg` (original) | ~450 KB |

Thumbnails are only requested when they come within 200px of the screen.
The lightbox shows the already-loaded thumbnail blurred, fades the larger
image in over it, and preloads the photos either side. The open photo is in
the URL (`?photo=img123`), so links can be shared and the back button
closes it.

## Develop

```sh
npm install
npm run photos     # once, so there's something to show
npm run dev
```
