require("dotenv").config();
const MySql = require("sync-mysql");
const moment = require("moment");


function atualizar_espera(telefone, fim, voto) {
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
        
        if (fim) {
            let dataAtual = moment().format("YYYY-MM-DD HH:mm:ss");

            const id_voto = connection.query(
                `SELECT IdVoto FROM espera
                WHERE IdUsuario = ${id[0].Id}`
            )
            connection.query(
                `DELETE FROM espera
                WHERE IdUsuario = ${id[0].Id}`
            );
            connection.query(
                `INSERT INTO registro
                (IdUsuario, IdVoto, Criacao)
                VALUES
                (${id[0].Id}, ${id_voto[0].IdVoto}, "${dataAtual}")`
            )
            connection.query(
                `UPDATE rivalidades SET Votos = Votos + 1 
                WHERE NCategoria = ${id_voto[0].IdVoto} AND Nopcao = ${voto}`
            )
        } else {
            connection.query(
                `UPDATE espera SET Pergunta = 2, IdVoto = ${voto}
                WHERE IdUsuario = ${id[0].Id}`
            );
        }
    } catch(erro) {
        console.error(erro);
    }

    connection.dispose();

    return espera;
}

module.exports = atualizar_espera;