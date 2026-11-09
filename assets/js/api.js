const URL_API = "https://www.cheapshark.com/api/1.0/games";

async function buscarJogosNaApi(titulo) {
  const endereco = URL_API + "?limit=6&title=" + encodeURIComponent(titulo);
  const resposta = await fetch(endereco);
  if (!resposta.ok) {
    throw new Error("A API respondeu com erro " + resposta.status);
  }
  return await resposta.json();
}