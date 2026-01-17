import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';

const sass = gulpSass(dartSass);

gulp.task('clean', async function () {
  await deleteAsync(['dist']);
});

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('src/styles/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('build', gulp.series('clean', 'html', 'sass'));

gulp.task('watch', function () {
  gulp.watch('src/styles/**/*.scss', gulp.series('sass'));
  gulp.watch('*.html', gulp.series('html'));
});

gulp.task('default', gulp.series('build', 'watch'));
