const formulario = document.getElementById("form-jogo");
const jogoEditado = buscarJogoPorId(pegarIdDaUrl());

if (jogoEditado === null) {
  formulario.hidden = true;
  mostrarMensagem("Jogo não encontrado. Volte para a coleção e escolha um jogo.", "erro");
} else {
  document.getElementById("titulo").value = jogoEditado.titulo;
  document.getElementById("plataforma").value = jogoEditado.plataforma;
  document.getElementById("genero").value = jogoEditado.genero;
  document.getElementById("status").value = jogoEditado.status;
  document.getElementById("nota").value = jogoEditado.nota;
  document.getElementById("horas").value = jogoEditado.horas;
  document.getElementById("comentario").value = (jogoEditado.comentario || "");
  document.getElementById("capa").value = (jogoEditado.capa || "");
  document.getElementById("preco").value = (jogoEditado.preco || "");
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const jogo = lerFormulario();
  const erros = validarJogo(jogo);
  if (erros.length > 0) {
    mostrarMensagem(erros.join(" "), "erro");
    return;
  }

  jogo.id = jogoEditado.id;
  atualizarJogo(jogo);
  mostrarMensagem("Alterações salvas! Voltando para a coleção...", "sucesso");
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 1200);
});