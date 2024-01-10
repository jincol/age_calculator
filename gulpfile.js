 const {src,dest,watch,parallel} = require("gulp");

 const sass = require("gulp-sass")(require("sass"))
 const plumber = require("gulp-plumber")

 function css (done){
    src("src/scss/**/*.scss")
    .pipe(plumber()) //detecta errores y no para
    .pipe(sass())
    .pipe(dest("build/css"))//Lugar de almacenamiento
    done();
 }

 //f¿Funcion que mueve los archivos a otra carpeta
function javaScript(done) {
    src("src/js/**/*.js")
    .pipe(dest("build/js"));
    done();
  }  
  


 function dev (done){
    watch("src/scss/**/*.scss", css); //el archivo a ejecutra,la funcion a ejecutar
    watch("src/js/**/*.js", javaScript); //el archivo a ejecutra,la funcion a ejecutar
    done()
 }

 exports.css=css;
 exports.javaScript=javaScript;
 exports.dev=parallel(javaScript,dev);
