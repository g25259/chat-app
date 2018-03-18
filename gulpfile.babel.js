import gulp from 'gulp';
import uglify from 'gulp-uglify';
import pump from 'pump';
import babel from 'gulp-babel';
import livereload from 'gulp-livereload';
import concat from 'gulp-concat';
import minifyCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import handlebars from 'gulp-handlebars';
import handlebarsLib from 'handlebars';
import declare from 'gulp-declare';
import wrap from 'gulp-wrap';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import del from 'del';
import htmlmin from 'gulp-htmlmin';

const DIST_PATH = 'public/';
const SCRIPTS_PATH = 'src/js/**/*.js';
const CSS_PATH= 'src/scss/**/*.scss';
const HTML_PATH= 'src/html/**/*.html';
const TEMPLATES_PATH = 'src/templates/**/*.hbs';
const IMAGES_PATH = 'src/images/**/*.{png,jpeg,jpg,svg,gif}';

gulp.task('styles', (cb) => {
    console.log('starting styles task');
    pump([
        gulp.src(CSS_PATH),
        sourcemaps.init(),
        autoprefixer({
            browsers: ['> 1%']
        }),
        sass({
            outputStyle: 'compressed'
        }),
        // Below two would be done by sass
        // concat('styles.css'),
        // minifyCss(),
        sourcemaps.write(),
        gulp.dest(DIST_PATH + '/css'),
        livereload(),
    ],
        cb);
});

gulp.task('scripts', (cb) => {
    console.log('starting scripts task');
    pump([
        gulp.src(SCRIPTS_PATH),
        sourcemaps.init(),
        babel(),
        uglify(),
        concat('scripts.js'),
        sourcemaps.write(),
        gulp.dest(DIST_PATH + '/js'),
        livereload(),
    ],
        cb
    );
});

gulp.task('images', (cb) => {
    console.log('starting images task');
    pump([
        gulp.src(IMAGES_PATH),
        imagemin([
            imageminPngquant(),
            imageminJpegRecompress()
        ]),
        gulp.dest(DIST_PATH + '/images'),
    ],
        cb
    );
});

gulp.task('templates', (cb) => {
    console.log('starting template task');
    pump([
        gulp.src(TEMPLATES_PATH),
        handlebars({
            handlebars: handlebarsLib
        }),
        wrap('Handlebars.template(<%= contents %>)'),
        declare({
            namespace: 'templates',
            noRedeclare: true
        }),
        concat('templates.js'),
        gulp.dest(DIST_PATH),
        livereload(),
    ],
        cb
    );
});

gulp.task('html', (cb) => {
    console.log('starting html task');
    pump([
        gulp.src(HTML_PATH),
        htmlmin({collapseWhitespace: true}),
        gulp.dest(DIST_PATH)
    ],
    cb);
});

gulp.task('clean', () => del.sync([DIST_PATH]));

gulp.task('default', ['images', 'templates', 'styles', 'scripts', 'html'], () => {
    console.log('Start default taks');
})

gulp.task('watch', ['default'], () => {
    console.log('starting watch task');
    require('./src/server/server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(CSS_PATH, ['styles']);
    gulp.watch(TEMPLATES_PATH, ['templates']);
});
