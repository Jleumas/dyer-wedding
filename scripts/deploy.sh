#!/bin/sh
# Builds the site and publishes it to the S3 bucket behind thedyerwedding.com.
#
#   npm run deploy            # upload, then invalidate CloudFront
#   DRYRUN=1 npm run deploy   # show what would change
#
# Run `npm run photos` first if photos were added or changed. Original JPEGs
# already in the bucket (gallery/<album>/*.jpg) are left alone; they back the
# lightbox "Download" button.
set -eu

BUCKET=s3://thedyerwedding.com
DISTRIBUTION=E3406V6NLMV090
DRY=${DRYRUN:+--dryrun}

npm run -s build

# Web-sized photos. Names don't change when re-generated, so cache for a week
# rather than forever.
aws s3 sync photos-out/gallery "$BUCKET/gallery" $DRY \
    --cache-control "public, max-age=604800"

# Hashed JS/CSS can be cached forever; index.html must always be revalidated.
aws s3 sync dist/assets "$BUCKET/assets" $DRY --delete \
    --cache-control "public, max-age=31536000, immutable"
aws s3 cp dist/index.html "$BUCKET/index.html" $DRY \
    --cache-control "no-cache"

if [ -z "$DRY" ]; then
    aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" \
        --paths "/index.html" "/" --query 'Invalidation.Id' --output text
fi
