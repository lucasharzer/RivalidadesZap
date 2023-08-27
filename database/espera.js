require("dotenv").config();
const MySql = require("sync-mysql");


function verificar_espera(telefone) {
    const connection = new MySql({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    });

    let espera;

    const resultado = connection.query(
        `SELECT Id FROM usuarios
        WHERE Telefone = "${telefone}"`
    );
    if (resultado.length == 0) {
        espera = false;
    } else {
        const registro = connection.query(
            `SELECT Pergunta, IdVoto FROM espera
            WHERE IdUsuario = ${resultado[0].Id}`
        );
        if (registro.length == 0) {
            espera = false;
        } else {
            if (registro[0].Pergunta != 1) {
                espera = registro[0].IdVoto
            } else {
                espera = "Primeira pergunta"
            }
        }
    }

    connection.dispose();

    return espera;
}

module.exports = verificar_espera;