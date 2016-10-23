var devBuild = true; // If set to `false`, minifies HTML and doesn't run BrowserSync (compile only)

var metalsmith = require('metalsmith'), // Metalsmith
    markdown = require('metalsmith-markdownit'), // Markdown to HTML parser
    handlebars = require('handlebars') // Handlebars for Metalsmith layouts
    layouts = require('metalsmith-layouts'), // Layouts and Partials
    inplace = require('metalsmith-in-place'), // Partials inside pages
    htmlmin = require('metalsmith-html-minifier'), // Metalsmith HTML minifier
    collections = require('metalsmith-collections'), // Make collections to call and loop
    paths = require('metalsmith-paths'), // Add Paths to global metadata
    permalinks = require('metalsmith-permalinks'), // Adds Permalinks to posts/pages

    gulp = require('gulp'), // Gulp
    gulpif = require('gulp-if'), // Gulp if thingie
    rename = require('gulp-rename'), // Gulp rename
    sass = require('gulp-sass'), // Gulp SASS
    combineMq = require('gulp-combine-mq'), // Gulp Combine Media queries
    autoprefixer = require('gulp-autoprefixer'), // Gulp CSS Autoprefixer
    csso = require('gulp-csso'), // Gulp CSS minifier
    browserSync = require('browser-sync').create(); // Use BrowserSync

handlebars.registerHelper('moment', require('helper-moment')); // Handlebars helper with date parsing

gulp.task('html', function() {
  var ms = metalsmith(__dirname) // It's Metalsmith!
  .metadata({
    site: {
      title: 'Project Name',
      url: 'http://project-url.com'
    }
  })
  .clean(false) // DON'T delete folder contents
  .source('src/content')
  .destination('build')
  .use(collections({ // determine page collection/taxonomy; delete if not needed
    blog: {
      pattern: 'blog/*.md',
      sortBy: 'date',
      reverse: true,
      refer: true,
      limit: 50
    }
  }))
  .use(markdown()) // Parse Markdown
  .use(permalinks({ // generate permalinks
    pattern: 'blog/:date-:title',
    date: 'YYYY-MM-DD',
    linksets: [{
      match: { collection: 'blog' },
      pattern: 'blog/:date-:title'
    }]
  }))
  .use(inplace({
    engine: 'handlebars', // Use Handlebars as templating language
    directory: 'src/layouts',
    partials: 'src/partials',
    default: 'post.html' // Default layout
  }))
  .use(layouts({
    engine: 'handlebars', // Use Handlebars as templating language
    pattern: '**/*.html',
    directory: 'src/layouts',
    partials: 'src/partials',
    default: 'post.html' // Default layout
  }));
  if (!devBuild) ms.use(htmlmin()); // Minimize HTML if it is in "Production mode"
  ms.build(function(err) {
    if (err) console.log(err);
  })
});


gulp.task('renameNormalize', function() {
  gulp.src('node_modules/normalize.css/normalize.css')
  .pipe(rename('_normalize.scss')) // Rename so it compiles in the same CSS file
  .pipe(gulp.dest('src/sass/resets')) // Copy Normalize to desired folder
});


gulp.task('sass', function() {
  gulp.src('src/sass/main.sass')
    .pipe(sass().on('error', sass.logError)) // SASS to CSS
    .pipe(combineMq({ // Combine media queries
        beautify: true // Beautify for debugging (will compress later if Production build)
    }))
    .pipe(autoprefixer({ // Add browser vendor prefixes
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // .pipe(csso()) // Minify CSS
    .pipe(gulp.dest('build/assets/css'))
    .pipe(browserSync.stream()); // Send changes to BrowserSync
});


gulp.task('serve', ['renameNormalize', 'sass', 'html'], function() {
  if (devBuild) {
    browserSync.init({ // Start BrowserSync server
      server: {
        baseDir: 'build'
      }
    });
    gulp.watch('src/sass/**/*.s*ss', ['sass']); // Run sass task
    gulp.watch('src/**/*.+(html|md|js)', ['html']); // Run Metalsmith
    gulp.watch('build/**/*.html').on('change', browserSync.reload); // Reload BrowserSync if HTMLs have changed
  }
});


gulp.task('default', ['serve'], function () {});