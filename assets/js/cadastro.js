const formulario = document.getElementById("form-jogo");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const jogo = lerFormulario();
  const erros = validarJogo(jogo);
  if (erros.length > 0) {
    mostrarMensagem(erros.join(" "), "erro");
    return;
  }

  jogo.id = Date.now();
  const jogos = carregarJogos();
  jogos.push(jogo);
  salvarJogos(jogos);

  formulario.reset();
  document.getElementById("capa").value = "";
  document.getElementById("preco").value = "";
  mostrarMensagem("Jogo cadastrado com sucesso!", "sucesso");
});

const formularioApi = document.getElementById("form-api");
const listaResultados = document.getElementById("resultados");

function usarJogoDaApi(resultado) {
  document.getElementById("titulo").value = resultado.external;
  document.getElementById("capa").value = resultado.thumb;
  document.getElementById("preco").value = resultado.cheapest;
  listaResultados.innerHTML = "";
  mostrarMensagem("Jogo selecionado: " + resultado.external + ". Complete os outros campos e salve.", "sucesso", "mensagem-api");
}

function criarItemResultado(resultado) {
  const item = document.createElement("li");

  const imagem = document.createElement("img");
  imagem.src = resultado.thumb;
  imagem.alt = "Capa de " + resultado.external;
  imagem.onerror = function () {
    imagem.hidden = true;
  };

  const texto = document.createElement("div");
  texto.className = "info-jogo";
  const nome = document.createElement("strong");
  nome.textContent = resultado.external;
  const preco = document.createElement("span");
  preco.textContent = "Menor preço: US$ " + resultado.cheapest;
  texto.appendChild(nome);
  texto.appendChild(document.createElement("br"));
  texto.appendChild(preco);

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Usar este jogo";
  botao.addEventListener("click", function () {
    usarJogoDaApi(resultado);
  });

  item.appendChild(imagem);
  item.appendChild(texto);
  item.appendChild(botao);
  return item;
}

formularioApi.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const titulo = document.getElementById("busca-api").value.trim();
  if (titulo === "") {
    mostrarMensagem("Digite o nome de um jogo para buscar.", "erro", "mensagem-api");
    return;
  }

  listaResultados.innerHTML = "";
  mostrarMensagem("Buscando...", "info", "mensagem-api");

  try {
    const resultados = await buscarJogosNaApi(titulo);
    if (resultados.length === 0) {
      mostrarMensagem("Nenhum jogo encontrado com esse nome.", "vazio", "mensagem-api");
      return;
    }
    esconderMensagem("mensagem-api");
    for (let i = 0; i < resultados.length; i++) {
      listaResultados.appendChild(criarItemResultado(resultados[i]));
    }
  } catch (erro) {
    mostrarMensagem("Não foi possível consultar a API agora. Você ainda pode cadastrar o jogo manualmente.", "erro", "mensagem-api");
  }
});