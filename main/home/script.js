async function importarJSON(caminho) {
    try {
      const resposta = await fetch(caminho);
      const json = await resposta.json();
      return json;
    } catch (erro) {
      console.error('Erro ao importar o arquivo JSON:', erro);
      return null;
    }
  }

  // Função para pesquisar no JSON com base no texto digitado pelo usuário
  async function pesquisarMusica(texto) {
    const data = await importarJSON('musicas.json');
    if (!data) return [];

    const resultados = [];
    for (const key in data) {
      const musica = data[key];
      // Verifica se o nome da música ou o nome do artista contém o texto digitado pelo usuário
      if (musica.nome.toLowerCase().includes(texto.toLowerCase()) || musica.artista.toLowerCase().includes(texto.toLowerCase())) {
        resultados.push(musica);
      }
    }
    return resultados;
  }

  // Event listener para o botão de busca
  document.getElementById("botao-buscar").addEventListener("click", async function() {
    const textoDigitado = document.getElementById("texto-buscar").value;
    const resultados = await pesquisarMusica(textoDigitado);
    exibirResultados(resultados);
  });


// Função para exibir os resultados da pesquisa
function exibirResultados(resultados) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores
  
    if (resultados.length === 0) {
      const mensagem = document.createElement("p");
      mensagem.textContent = "Nenhum resultado encontrado.";
      cardContainer.appendChild(mensagem);
    } else {
      resultados.forEach(musica => {
        const card = document.createElement("section");
        card.classList.add("card");
  
        const cardImg = document.createElement("section");
        cardImg.classList.add("card-img");
        const img = document.createElement("img");
        img.src = musica.album.imagem;
        cardImg.appendChild(img);
  
        const cardText = document.createElement("section");
        cardText.classList.add("card-text");
        
        const musicaNome = document.createElement("p");
        musicaNome.id = "musica-nome"; // ID geral para o nome da música
        musicaNome.textContent = `${musica.nome}`;
        
        const artistaNome = document.createElement("p");
        artistaNome.id = "artista-nome"; // ID geral para o nome do artista
        artistaNome.textContent = `${musica.artista}`;
        
        cardText.appendChild(musicaNome);
        cardText.appendChild(artistaNome);
  
        const musicPlayer = document.createElement("section");
        musicPlayer.classList.add("music-player");
        const audioPlayer = document.createElement("audio");
        audioPlayer.classList.add("audioPlayer");
        audioPlayer.controls = true;
        const source = document.createElement("source");
        source.src = musica.mp3;
        source.type = "audio/mpeg";
        audioPlayer.appendChild(source);
        musicPlayer.appendChild(audioPlayer);
  
        card.appendChild(cardImg);
        card.appendChild(cardText);
        card.appendChild(musicPlayer);
  
        cardContainer.appendChild(card);
      });
    }
  }