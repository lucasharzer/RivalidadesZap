const venom = require("venom-bot");
const atualizar_etapa = require("./database/usuario");
const pegar_mensagem = require("./messages/texto");
const verificar_espera = require("./database/espera");
const registrar_espera = require("./database/aguardar");
const atualizar_espera = require("./database/retorno");


venom
    .create({
        session: 'session-name'
    })
    .then((client) => start(client));


function start(client){
    client
        .onMessage((message) => {    
            // Mensagem Recebida  
            // - Informações
            if (message.isGroupMsg === false) {
                let nome = message.notifyName;
                let telefone = message.sender.id.replace("@c.us", "");
                let texto = message.content;
                let status;
                if (message.isOnline) {
                    status = "online";
                }else {
                    status = "offline";
                }
                
                console.log(`\nNome: ${nome}\nTelefone: ${telefone}\nTexto: ${texto}\nStatus: ${status}`);

                const espera = verificar_espera(telefone);
                let etapa;
                if (!espera) {
                    etapa = atualizar_etapa(telefone, nome);
                    client
                        .startTyping(message.sender.id);
                    // Pegar mensagem
                    console.log("pegando mensagem...");
                    let mensagem = pegar_mensagem(etapa);
                    console.log("mensagem enviada");
                    // Enviar mensagem
                    client
                        .sendText(message.from, mensagem);
                    if (etapa == 1) {
                        // registrar espera de pergunta geral
                        registrar_espera(telefone, 1);
                    }
                } else if (espera == "Primeira pergunta") {
                    // recebendo resposta
                    client
                        .startTyping(message.sender.id);
                    // Pegar mensagem
                    console.log("pegando mensagem...");
                    if (["1", "2", "3"].includes(texto)) {
                        etapa = 3;
                    } else {
                        etapa = 2;
                    }
                    console.log(etapa);
                    let mensagem = pegar_mensagem(etapa, texto);
                    console.log("mensagem enviada");
                    // Enviar mensagem
                    client
                        .sendText(message.from, mensagem);
                    // Remover espera caso a resposta seja válida
                    if (etapa == 3) {
                        atualizar_espera(telefone, false, parseInt(texto));
                    }
                } else {
                    // recebendo resposta
                    client
                        .startTyping(message.sender.id);
                    // Pegar mensagem
                    console.log("pegando mensagem...");
                    if (["1", "2"].includes(texto)) {
                        etapa = 5;
                    } else {
                        etapa = 4;
                        texto = espera;
                    }

                    let mensagem = pegar_mensagem(etapa, texto);
                    console.log("mensagem enviada");
                    // Enviar mensagem
                    client
                        .sendText(message.from, mensagem);
                    // Remover espera e registrar voto
                    if (etapa == 5) {
                        atualizar_espera(telefone, true, parseInt(texto));
                    }
                }
            }
    });
}  