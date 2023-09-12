const { src, dest, watch, parallel }=require("gulp");
//css
const sass=require("gulp-sass")(require("sass"));
const plumber=require("gulp-plumber");
//img
const cache=require('gulp-cache');
const imagemin= require('gulp-imagemin');
const webp =require('gulp-webp');
const avif=require('gulp-avif');

function css (done){
    //identify file sass
    src("src/scss/**/*.scss")
     //compile
    .pipe(plumber())
    .pipe(sass())
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
    done();
}

exports.para=parallel (imagenes,versionWebp,versionAvif,dev);
exports.dev=dev;