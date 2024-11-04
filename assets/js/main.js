const canvas = document.getElementById("jogo");
const contexto = canvas.getContext("2d");

// Declaração do objeto jogador
let jogador = {
    x: canvas.width /2 -20,
    y: canvas.heigth - 60,
    largura: 40,
    altura: 60,
    cor:"blue",
    parachoque: "border-radius: 8px",
    velocidade:20
}

// Criação da pista, obstáculos, musicas
let obstaculos = [];
let pontuacao = 0;
let jogadorAtivo = false;
let cenarios = ["#3a6", "#4a4", "#66a"];
let indiceCenario = 0;
let dificuldade = 1;
let musicaUm = document.getElementById("audcorrida");


//-----Interface do usuario-----//

//==Reiniciando o jogo==//
function reiniciarJogo() {
    jogador.x = canvas.width / 2 - jogador.largura / 2;
    jogador.y = canvas.height - jogador.altura - 10;
    pontuacao = 0;
    obstaculos = [];
    jogoAtivo = true;
}

//==Iniciando o jogo==//
function iniciarJogo() {
    // Resetar as variáveis do jogo
    jogoAtivo = true;
    pontuacao = 0;
    dificuldade = 1;
    obstaculos = [];
    PluginArray.


    // Atualizar a pontuação na interface
    document.getElementById("pontuacao").textContent = pontuacao;

    // Limpar qualquer intervalo de obstáculos anterior (caso tenha sido reiniciado)
    if (window.intervaloObstaculos) {
        clearInterval(window.intervaloObstaculos);
    }

    // Configurar um intervalo para criar novos obstáculos a cada segundo
    window.intervaloObstaculos = setInterval(criarObstaculo, 1000);

    // Iniciar o loop do jogo
    loopJogo();
}

//-------Movimentação-------//
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
        jogador.x = Math.max(0, jogador.x - jogador.velocidade);
    } else if (e.key === "ArrowRight" || e.key === "d") {
        jogador.x = Math.min(canvas.width - jogador.largura, jogador.x + jogador.velocidade);
    }
});

//------Obstáculos funções----//
function criarObstaculo() {
    let largura = Math.random() * 60 + 20;
    let x = Math.random() * (canvas.width - largura);
    let velocidade = 2 + dificuldade;
    obstaculos.push({ x, y: -60, largura, altura: 60, cor: "red", velocidade });
}

function atualizarObstaculos() {
    for (let obstaculo of obstaculos) {
        obstaculo.y += obstaculo.velocidade;
    }
    // Remover obstáculos fora da tela
    obstaculos = obstaculos.filter(obstaculo => obstaculo.y < canvas.height);
}

function verificarColisao() {
    for (let obstaculo of obstaculos) {
        if (
            jogador.x < obstaculo.x + obstaculo.largura &&
            jogador.x + jogador.largura > obstaculo.x &&
            jogador.y < obstaculo.y + obstaculo.altura &&
            jogador.y + jogador.altura > obstaculo.y
        ) {
            jogoAtivo = false;
            alert("Game Over! Pontuação: " + pontuacao);
            reiniciarJogo();
        }
    }
}

//-------Pontuação-------//

//==imcremento de pontuação==// 
function atualizarPontuacao() {
    pontuacao++;
    document.getElementById("pontuacao").textContent = pontuacao;
}

// funncão para renderizar o jogo
function loopJogo() {
    if (!jogoAtivo) return;

    // Limpar o canvas
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar elementos do jogo
    atualizarObstaculos();
    verificarColisao();
    atualizarPontuacao();

    // Desenhar jogador
    contexto.fillStyle = jogador.cor;
    contexto.fillRect(jogador.x, jogador.y, jogador.largura, jogador.altura);

    // Desenhar obstáculos
    for (let obstaculo of obstaculos) {
        contexto.fillStyle = obstaculo.cor;
        contexto.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
    }

    // Aumentar dificuldade ao longo do tempo
    if (pontuacao % 50 === 0) {
        dificuldade += 0.01;
    }

    // Continuar o loop
    requestAnimationFrame(loopJogo);
}

 
function mudarCenario() {
    contexto.fillStyle = cenarios[indiceCenario % cenarios.length];
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    indiceCenario++;
}




function aumentarDificuldade() {
    dificuldade += 0.001;
    for (let obstaculo of obstaculos) {
        obstaculo.velocidade += dificuldade * 0.001;
    }
}












