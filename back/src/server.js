const express = require("express");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// Configuración de CORS basada en el entorno
if (process.env.NODE_ENV === 'development') {
    server.use(cors({
        origin: 'http://localhost:5173', // Permitir solicitudes desde el frontend local durante el desarrollo
        credentials: true // Permitir enviar cookies desde el frontend
    }));
} else {
    server.use(cors({
        origin: 'https://computech.vercel.app', // Reemplazar con el dominio de tu frontend en producción
        credentials: true // Permitir enviar cookies desde el frontend
    }));
}
server.use("/", router);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.log(err);
	res.status(status).send(message);
});

module.exports = server;
