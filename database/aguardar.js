require("dotenv").config();
const MySql = require("sync-mysql");


function registrar_espera(telefone, pergunta, voto=0) {
    const connection = new MySql({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    });

    try {
        const id = connection.query(
            `SELECT Id FROM usuarios
            WHERE Telefone = "${telefone}"`
        );
    
        connection.query(
            `INSERT INTO espera
            (IdUsuario, Pergunta, IdVoto)
            VALUES
            (${id[0].Id}, ${pergunta}, ${voto})`
        );
    } catch(erro) {
        console.error(erro);
    }

    connection.dispose();

    return espera;
}

module.exports = registrar_espera;