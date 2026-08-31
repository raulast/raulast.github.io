#!/bin/bash
set -e
echo "Running post-build steps..."
cp dist/index.html dist/404.html
echo "  ✓ 404.html created"
cp public/googleb16d2e2b5cd0da1f.html dist/
echo "  ✓ Search Console file copied"
node scripts/generate-sitemap.mjs
echo "  ✓ sitemap.xml generated"
rm -rf docs
cp -r dist docs
echo "  ✓ docs/ updated"
