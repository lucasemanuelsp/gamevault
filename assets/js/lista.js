const CAPA_PADRAO = "assets/img/capa-exemplo.jpg";

const campoBusca = document.getElementById("busca");
const campoPlataforma = document.getElementById("plataforma");
const campoStatus = document.getElementById("status");
const campoOrdem = document.getElementById("ordem");
const corpoTabela = document.getElementById("lista-jogos");
const areaTabela = document.getElementById("area-tabela");

function filtrarJogos(jogos) {
  const texto = campoBusca.value.trim().toLowerCase();
  return jogos.filter(function (jogo) {
    const achouTitulo = jogo.titulo.toLowerCase().includes(texto);
    const plataformaOk = campoPlataforma.value === "" || jogo.plataforma === campoPlataforma.value;
    const statusOk = campoStatus.value === "" || jogo.status === campoStatus.value;
    return achouTitulo && plataformaOk && statusOk;
  });
}

function ordenarJogos(jogos) {
  const criterio = campoOrdem.value;
  if (criterio === "titulo") {
    jogos.sort(function (a, b) {
      return a.titulo.localeCompare(b.titulo);
    });
  } else if (criterio === "nota") {
    jogos.sort(function (a, b) {
      return b.nota - a.nota;
    });
  } else if (criterio === "horas") {
    jogos.sort(function (a, b) {
      return b.horas - a.horas;
    });
  }
  return jogos;
}

function criarCelula(texto) {
  const celula = document.createElement("td");
  celula.textContent = texto;
  return celula;
}

function criarLinha(jogo) {
  const linha = document.createElement("tr");

  const celulaCapa = document.createElement("td");
  const imagem = document.createElement("img");
  imagem.src = jogo.capa ? jogo.capa : CAPA_PADRAO;
  imagem.alt = "Capa de " + jogo.titulo;
  imagem.onerror = function () {
    imagem.onerror = null;
    imagem.src = CAPA_PADRAO;
  };
  celulaCapa.appendChild(imagem);
  linha.appendChild(celulaCapa);

  linha.appendChild(criarCelula(jogo.titulo));
  linha.appendChild(criarCelula(jogo.plataforma));

  const celulaStatus = document.createElement("td");
  const etiqueta = document.createElement("span");
  etiqueta.textContent = jogo.status;
  etiqueta.className = "status status-" + jogo.status.toLowerCase().replace(" ", "-");
  celulaStatus.appendChild(etiqueta);
  linha.appendChild(celulaStatus);

  linha.appendChild(criarCelula(jogo.nota));

  const celulaAcoes = document.createElement("td");
  celulaAcoes.className = "acoes";

  const linkDetalhes = document.createElement("a");
  linkDetalhes.href = "pages/detalhes.html?id=" + jogo.id;
  linkDetalhes.textContent = "Ver detalhes";

  const linkEditar = document.createElement("a");
  linkEditar.href = "pages/editar.html?id=" + jogo.id;
  linkEditar.textContent = "Editar";

  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.className = "perigo";
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.addEventListener("click", function () {
    excluirJogo(jogo.id);
  });

  celulaAcoes.appendChild(linkDetalhes);
  celulaAcoes.appendChild(linkEditar);
  celulaAcoes.appendChild(botaoExcluir);
  linha.appendChild(celulaAcoes);

  return linha;
}

function atualizarResumo(jogos) {
  let zerados = 0;
  let horas = 0;
  for (let i = 0; i < jogos.length; i++) {
    if (jogos[i].status === "Zerado") {
      zerados++;
    }
    horas = horas + jogos[i].horas;
  }
  document.getElementById("resumo-total").textContent = jogos.length;
  document.getElementById("resumo-zerados").textContent = zerados;
  document.getElementById("resumo-horas").textContent = horas;
}

function mostrarLista() {
  const todos = carregarJogos();
  const visiveis = ordenarJogos(filtrarJogos(todos));

  corpoTabela.innerHTML = "";
  for (let i = 0; i < visiveis.length; i++) {
    corpoTabela.appendChild(criarLinha(visiveis[i]));
  }

  if (todos.length === 0) {
    mostrarMensagem("Nenhum jogo cadastrado ainda. Use o menu Adicionar jogo.", "vazio", "aviso-vazio");
  } else if (visiveis.length === 0) {
    mostrarMensagem("Nenhum jogo encontrado. Tente mudar a pesquisa ou os filtros.", "vazio", "aviso-vazio");
  } else {
    esconderMensagem("aviso-vazio");
  }
  areaTabela.hidden = visiveis.length === 0;

  atualizarResumo(todos);
}

function excluirJogo(id) {
  if (confirm("Deseja excluir este jogo da coleção?")) {
    excluirJogoPorId(id);
    mostrarLista();
  }
}

campoBusca.addEventListener("input", mostrarLista);
campoPlataforma.addEventListener("change", mostrarLista);
campoStatus.addEventListener("change", mostrarLista);
campoOrdem.addEventListener("change", mostrarLista);
document.getElementById("form-filtros").addEventListener("submit", function (evento) {
  evento.preventDefault();
  mostrarLista();
});

mostrarLista();