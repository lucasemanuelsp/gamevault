const CHAVE = "gamevault_jogos";

function carregarJogos() {
  const texto = localStorage.getItem(CHAVE);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function salvarJogos(jogos) {
  localStorage.setItem(CHAVE, JSON.stringify(jogos));
}

function buscarJogoPorId(id) {
  const jogos = carregarJogos();
  for (let i = 0; i < jogos.length; i++) {
    if (String(jogos[i].id) === String(id)) {
      return jogos[i];
    }
  }
  return null;
}

function atualizarJogo(jogoAtualizado) {
  const jogos = carregarJogos();
  for (let i = 0; i < jogos.length; i++) {
    if (String(jogos[i].id) === String(jogoAtualizado.id)) {
      jogos[i] = jogoAtualizado;
    }
  }
  salvarJogos(jogos);
}

function excluirJogoPorId(id) {
  const restantes = carregarJogos().filter(function (jogo) {
    return String(jogo.id) !== String(id);
  });
  salvarJogos(restantes);
}

function pegarIdDaUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("id");
}

function mostrarMensagem(texto, tipo, idDaCaixa) {
  const caixa = document.getElementById(idDaCaixa || "mensagem");
  caixa.textContent = texto;
  caixa.className = "mensagem " + tipo;
  caixa.hidden = false;
}

function esconderMensagem(idDaCaixa) {
  document.getElementById(idDaCaixa || "mensagem").hidden = true;
}

function lerFormulario() {
  return {
    titulo: document.getElementById("titulo").value.trim(),
    plataforma: document.getElementById("plataforma").value,
    genero: document.getElementById("genero").value.trim(),
    status: document.getElementById("status").value,
    nota: Number(document.getElementById("nota").value),
    horas: Number(document.getElementById("horas").value),
    comentario: document.getElementById("comentario").value.trim(),
    capa: document.getElementById("capa").value,
    preco: document.getElementById("preco").value
  };
}

function validarJogo(jogo) {
  const erros = [];
  if (jogo.titulo.length < 2) {
    erros.push("O título deve ter pelo menos 2 caracteres.");
  }
  if (jogo.plataforma === "") {
    erros.push("Escolha uma plataforma.");
  }
  if (jogo.genero === "") {
    erros.push("Informe o gênero.");
  }
  if (isNaN(jogo.nota) || jogo.nota < 0 || jogo.nota > 10) {
    erros.push("A nota deve ser um número de 0 a 10.");
  }
  if (isNaN(jogo.horas) || jogo.horas < 0) {
    erros.push("As horas jogadas não podem ser negativas.");
  }
  return erros;
}