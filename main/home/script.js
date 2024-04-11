function buscarArtistasEMusicas(textoBuscar) {
    return fetch("teste.json")
        .then(response => response.json())
        .then(data => {
            return data.artistas.filter(function(artista) {
                return artista.nome.toLowerCase().includes(textoBuscar); // Verifica se o nome do artista contém o texto buscado
            });
        })
        .catch(error => {
            console.error("Erro ao buscar artistas:", error);
            return []; // Retorna um array vazio em caso de erro
        });
}

// Função para criar o HTML dos cards dos artistas e músicas
function criarCards(artistasEncontrados) {
    if (artistasEncontrados.length > 0) {
        var resultado = "";
        artistasEncontrados.forEach(function(artista) {
            resultado += "<section class='card'>";
            resultado += "<section class='card-img'></section>";
            resultado += "<section class='card-text'><h2>" + artista.nome + "</h2>";
            resultado += "<ul>";
            artista.musicas.forEach(function(musica) {
                resultado += "<li>" + musica + "</li>";
            });
            resultado += "</ul></section>";
            resultado += "<section class='music-player'></section>";
            resultado += "</section>";
        });
        return resultado;
    } else {
        return "Nenhum resultado encontrado.";
    }
}

// Função para atualizar a seção de cards com os resultados
function atualizarCards(resultadoHtml) {
    document.getElementById("card-container").innerHTML = resultadoHtml;
}

// Event listener para o botão de busca
document.getElementById("botao-buscar").addEventListener("click", function() {
    var textoBuscar = document.getElementById("texto-buscar").value.toLowerCase(); // Obtém o texto digitado e converte para minúsculas
    buscarArtistasEMusicas(textoBuscar)
        .then(artistasEncontrados => {
            var resultadoHtml = criarCards(artistasEncontrados);
            atualizarCards(resultadoHtml);
        });
});