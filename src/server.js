const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

// usando template engine (ejs)
server.set('view engine', 'ejs');

// mudar a localização da pasta views
server.set("views", path.join(__dirname, "views"));

// habilitar arquivos statics
server.use(express.static("public"));

// Utilizar o req.body
server.use(express.urlencoded({ extend: true }));

//routes
server.use(routes);

// Abrindo uma porta
server.listen(3000, () => {
    console.log('rodando')
})