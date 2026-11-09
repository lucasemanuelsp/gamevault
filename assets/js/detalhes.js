const CAPA_PADRAO = "../assets/img/capa-exemplo.jpg";

const jogoAtual = buscarJogoPorId(pegarIdDaUrl());
const areaDetalhes = document.getElementById("area-detalhes");
const botaoPreco = document.getElementById("btn-preco");

function textoDoPreco(jogo) {
  if (jogo.preco) {
    return "US$ " + jogo.preco + " (CheapShark)";
  }
  return "Ainda não consultado";
}

function mostrarDetalhes(jogo) {
  document.getElementById("det-titulo").textContent = jogo.titulo;
  const capa = document.getElementById("det-capa");
  capa.onerror = function () {
    capa.onerror = null;
    capa.src = CAPA_PADRAO;
  };
  capa.src = jogo.capa ? jogo.capa : CAPA_PADRAO;
  document.getElementById("det-plataforma").textContent = jogo.plataforma;
  document.getElementById("det-genero").textContent = jogo.genero;
  document.getElementById("det-status").textContent = jogo.status;
  document.getElementById("det-nota").textContent = jogo.nota;
  document.getElementById("det-horas").textContent = jogo.horas;
  document.getElementById("det-preco").textContent = textoDoPreco(jogo);
  document.getElementById("det-comentario").textContent = jogo.comentario === "" ? "Sem comentário." : jogo.comentario;
  document.getElementById("btn-editar").href = "editar.html?id=" + jogo.id;
}

if (jogoAtual === null) {
  areaDetalhes.hidden = true;
  mostrarMensagem("Jogo não encontrado. Volte para a coleção e escolha um jogo.", "erro");
} else {
  mostrarDetalhes(jogoAtual);

  document.getElementById("btn-excluir").addEventListener("click", function () {
    if (confirm("Deseja excluir este jogo da coleção?")) {
      excluirJogoPorId(jogoAtual.id);
      window.location.href = "../index.html";
    }
  });

  botaoPreco.addEventListener("click", async function () {
    botaoPreco.disabled = true;
    botaoPreco.textContent = "Consultando...";
    try {
      const resultados = await buscarJogosNaApi(jogoAtual.titulo);
      if (resultados.length === 0) {
        mostrarMensagem("Nenhum preço encontrado para este jogo.", "vazio");
      } else {
        jogoAtual.preco = resultados[0].cheapest;
        atualizarJogo(jogoAtual);
        mostrarDetalhes(jogoAtual);
        mostrarMensagem("Preço atualizado!", "sucesso");
      }
    } catch (erro) {
      mostrarMensagem("Não foi possível consultar a API agora. Tente de novo mais tarde.", "erro");
    }
    botaoPreco.disabled = false;
    botaoPreco.textContent = "Atualizar preço";
  });
}