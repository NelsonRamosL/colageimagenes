const express = require('express');
const app = express();
const fs = require("fs");
app.listen(3000);
app.use(express.static("public"));


/**
 * 1. Integrar express-fileupload a Express.
 */
 const expressFileUpload = require('express-fileupload');


/**
2. Definir que el límite para la carga de imágenes es de 5MB.
 */
app.use( expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,

    /**
3. Responder con un mensaje indicando que se sobrepasó el límite especificado.
 */
    responseOnLimit: "El peso del archivo que intentas subir supera el limite especificado",

})
    );

    app.get("/", (req, res) => {
        res.sendFile(__dirname + '/collage.html')
        });
        
        app.get("/formulario", (req, res) => {
            res.sendFile(__dirname + '/formulario.html')
            });


/**
4. Crear una ruta POST /imagen que reciba y almacene una imagen en una carpeta
pública del servidor. Considerar que el formulario envía un payload con una
propiedad “position”, que indica la posición del collage donde se deberá mostrar la
imagen.
 */


app.post("/imagen", (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;
    const { name } = target_file;
    target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
    res.send("Archivo cargado con éxito");
    //console.log(req);
    });
    });


/**
5. Crear una ruta GET /deleteImg/:nombre que reciba como parámetro el nombre de
una imagen y la elimine de la carpeta en donde están siendo alojadas las imágenes.
Considerar que esta interacción se ejecuta al hacer click en alguno de los números
del collage.
  */


app.get("/deleteImg/:nombre", (req, res) => {
    console.log("entramos en delete",req)
    const { nombre } = req.params;
    fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
    err
    ? res.send("Lo siento, este archivo no existe en servidor")
    : res.send(`Imagen ${nombre} fue eliminada con éxito`);
    console.log(nombre)
    });
    });
    