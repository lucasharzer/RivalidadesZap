require("dotenv").config();
const MySql = require("sync-mysql");
const moment = require("moment");


function atualizar_etapa(telefone, nome) {
    const connection = new MySql({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    });

    let etapa = 0;

    try{
        const registro = connection.query(`
            SELECT Id FROM usuarios 
            WHERE "${telefone}"
        `);

        let dataAtual = moment().format("YYYY-MM-DD HH:mm:ss");

        if (registro.length == 0) {
            etapa = 1;
            connection.query(`
                INSERT INTO usuarios
                (Nome, Telefone, Criacao, Atualizacao, Etapa)
                VALUES
                ("${nome}", "${telefone}", "${dataAtual}", "${dataAtual}", ${etapa})
            `);
        } else {
            const quantidade = connection.query(`
                SELECT COUNT(*) AS Numero FROM registro
                WHERE IdUsuario = ${registro[0].Id}
            `);
            if (quantidade[0].Numero == 0) {
                etapa = 1;
            } else {
                etapa = 6;
            }
        }
    }catch(erro){
        console.log(erro);
    }

    connection.dispose();

    return etapa;
}


module.exports = atualizar_etapa;