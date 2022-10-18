const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const { dest } = require('gulp');

function compilaSass() {
  return gulp.src('scss/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoPrefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream())
}

function gulpJs() {
  return gulp.src('js/scripts/*.js')   //pega todos os arquivos Js que estão no caminho descrito
  .pipe(concat('all.js'))               //concatena todos os arquivos em apenas um arquivo
  .pipe(babel({
    presets: ['@babel/env']             //transforma os arquivos em uma versão mais aceitavel por navegadores antigos
  }))
  .pipe(uglify())                       //minimiza os arquivos otimizando o codigo
  .pipe(gulp.dest('js/'))               //leva tudo que foi feito para o caminho descrito
  .pipe(browserSync.stream())           //É o mesmo que apertar refresh no browser
}

function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    }
  });
}

function watch() {
  gulp.watch('scss/*.scss', compilaSass)
  gulp.watch('*.html').on('change', browserSync.reload)
  gulp.watch('js/scripts/*.js', gulpJs)
  gulp.watch('js/lib/*.js', pluginsJs)
  gulp.watch('css/lib/*.css', pluginsCss)
}

function pluginsCss() {
  gulp.src('css/lib/*.css')
  .pipe(concat('plugins.css'))
  .pipe(dest('css/'))
  .pipe(browserSync.stream())
}

function pluginsJs() {
  //Jogue aqui todos os arquivos Js / plugins que serão usados no projeto ex.: AOS.min.js ou Swiper.min.js
  return gulp.src(['./js/lib/swiper.min.js', './js/lib/aos.min.js'])
  .pipe(concat('plugins.js'))
  .pipe(dest('./js/'))
  .pipe(browserSync.stream())
}



gulp.task('gulpJs', gulpJs)
gulp.task('pluginsJs', pluginsJs)
gulp.task('browserSync', browser)
gulp.task('watch', watch)
gulp.task('sass', compilaSass)
gulp.task('pluginsCss', pluginsCss)
gulp.task('default', gulp.parallel('watch', 'browserSync', 'sass', 'gulpJs', 'pluginsJs', 'pluginsCss'));