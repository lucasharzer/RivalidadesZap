function pegar_mensagem(etapa, escolha=0) {
    let mensagem;

    switch (etapa) {
        case 1:
            const horaAtual = new Date().getHours();
    
            if (horaAtual >= 5 && horaAtual <= 11) {
                mensagem = "Bom dia!";
            } else if (horaAtual >= 12 && horaAtual <= 17) {
                mensagem = "Boa tarde!";
            } else {
                mensagem = "Boa noite!";
            }

            mensagem += "\nEstamos realizando uma pesquisa de opinião para melhorar nossos serviços/produtos.\nATENÇÃO: Você só poderá escolher uma categoria para votar.\nSuas respostas são anônimas e confidenciais. Agradecemos sua participação!\n\nEscolha o tipo de pesquisa:";

            mensagem += "\n1 - Heróis\n2 - Pets\n3 - Achocolatados";
            mensagem += "\n\nObservação: responda apenas com o número da opção.";
            break;
        case 2:
            mensagem = "Opção inválida. Tente novamente\n\nEscolha o tipo de pesquisa:";
            mensagem += "\n1 - Heróis\n2 - Pets\n3 - Achocolatados";
            mensagem += "\n\nObservação: responda apenas com o número da opção.";
            break;
        case 3:
            mensagem = "Vote na categoria escolhida:";
            if (escolha == "1") {
                mensagem += "\n1 - DC Comics\n2 - Marvel Comics";
            } else if (escolha == "2") {
                mensagem += "\n1 - Cachorro\n2 - Gato";
            } else {
                mensagem += "\n1 - Nescau\n2 - Tody";
            }
            mensagem += "\n\nObservação: responda apenas com o número da opção.";
            break;
        case 4:
            mensagem = "Opção inválida. Tente novamente\n\nVote na categoria escolhida:";
            if (escolha == "1") {
                mensagem += "\n1 - DC Comics\n2 - Marvel Comics";
            } else if (escolha == "2") {
                mensagem += "\n1 - Cachorro\n2 - Gato";
            } else {
                mensagem += "\n1 - Nescau\n2 - Tody";
            }
            mensagem += "\n\nObservação: responda apenas com o número da opção.";
            break;
        case 5:
            mensagem = "Voto registrado com sucesso na categoria escolhida!";
            break;
        case 6:
            mensagem = "Sua votação já foi realizada!";
            break;
    }

    return mensagem;
}


module.exports = pegar_mensagem;