const { src, dest, watch }=require("gulp");
const sass=require("gulp-sass")(require("sass"));
const plumber=require("gulp-plumber")

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
function dev(done){

    watch("src/scss/**/*.scss",css)
    done();
}

exports.dev=dev;