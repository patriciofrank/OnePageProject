const { src, dest, watch, parallel }=require("gulp");

//css
const sass=require("gulp-sass")(require("sass"));
const plumber=require("gulp-plumber");
const autoprefixer=require("autoprefixer");
const cssnano=require("cssnano");
const postcss=require("gulp-postcss");
const sourcemaps=require("gulp-sourcemaps");

//img
const cache=require('gulp-cache');
const imagemin= require('gulp-imagemin');
const webp =require('gulp-webp');
const avif=require('gulp-avif');

//Js
const terser=require("gulp-terser-js");


function css (done){
    //identify file sass
    src("src/scss/**/*.scss")
     //compile
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write("."))
    //save 
    .pipe(dest("build/css"));
    //End callback
    done();
}
function versionWebp(done){
    const options={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')//identify img
    .pipe(webp(options))//compile
    .pipe(dest('build/img'))//save
    done();
}
function versionAvif(done){
    const options={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')//identify img
    .pipe(avif(options))//compile
    .pipe(dest('build/img'))//save
    done();
}
function imagenes(done){
    const options={
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(options)))
    .pipe(dest('build/img'))
    done();
}
function dev(done){

    watch("src/scss/**/*.scss",css)
    watch("src/js/**/*.js",javascript)
    done();
}
function javascript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest('build/js'));

    done()
}

exports.dev=parallel (imagenes,versionWebp,versionAvif,dev);
exports.css=css;
exports.js=javascript;
exports.imagenes=imagenes;
exports.versionAvif=versionAvif;
exports.versionWebp=versionWebp;
