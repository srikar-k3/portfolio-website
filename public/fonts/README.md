Place your self-hosted webfonts here.

Recommended files (variable fonts):
- figtree/Figtree-VariableFont_wght.woff2
- nunito-sans/NunitoSans-VariableFont_wght.woff2

You can source these from Google Fonts or upstream repos.

How this project uses them:
- CSS `@font-face` rules in `src/app/globals.css` point to files under `public/fonts/...`.
- No environment variables or external services are required.
- If you change filenames, update the URLs in `globals.css` accordingly.
