## Synopsis

Pedro Pimenta's simple website bootstrapper.

Very very simple: Gulp for tasks, SASS for CSS compiling and Metalsmith for HTML building.

## Tech stack

- Gulp
  - `gulp` runs tasks
  - `browser-sync` to auto serve files and autoreload
  - `gulp-rename` renames 'normalize.css' to '_normalize.scss' so it's only 1 file
  - `gulp-if` for condition checking
- Metalsmith
  - `metalsmith` plays with and renders the HTML
  - `metalsmith-collections` to for a great blog or others
  - `metalsmith-paths` for path to work for collections
  - `metalsmith-paths` to render permalinks for posts
  - `metalsmith-markdownit` parses Markdown and outputs HTML
  - `metalsmith-layouts` is used for different layouts and Handlebars parsing
  - `handlebars` is the templating language for Metalsmith Layouts
  - `metalsmith-html-minifier` minifies HTML for production
- SASS
  - `gulp-sass` to compile CSS
  - `gulp-combine-mq` to combine media queries
  - `gulp-csso` to minify, clean and compress
  - `gulp-autoprefixer` to forget about vendor prefixes
- CSS
  - `normalize.css` to normalize styles between browsers

## Installation

- Install Node: [https://nodejs.org/](https://nodejs.org/)
- Then do `npm install` on the project's folder, it installs everything you need based on `package.json`
- Run `gulp`.
- That's it :)

## License

I don't care; CC0-1.0.