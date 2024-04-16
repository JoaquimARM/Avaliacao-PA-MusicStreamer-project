// Função para carregar o JSON e criar os cards
function buscar() {
  const texto = document.getElementById('texto-buscar').value.toLowerCase();
  const cardContainer = document.getElementById('card-container');

  // Limpa resultados anteriores
  cardContainer.innerHTML = '';

  // Carrega o JSON
  fetch('musicas.json')
    .then(response => response.json())
    .then(data => {
      // Percorre o JSON e verifica se o texto corresponde ao nome da música ou do artista
      for (const key in data) {
        const musica = data[key].musica;
        if (
          musica.nome.toLowerCase().includes(texto) ||
          musica.artista.toLowerCase().includes(texto)
        ) {
          // Cria um novo card
          const card = document.createElement('section');
          card.className = 'card';
          
          // Adiciona a imagem do álbum ao card
          const cardImg = document.createElement('section');
          cardImg.className = 'card-img';
          cardImg.innerHTML = `<img src="${musica.album.imagem}" alt="Capa do álbum">`;
          card.appendChild(cardImg);
          
          // Adiciona o texto da música e do artista ao card
          const cardText = document.createElement('section');
          cardText.className = 'card-text';
          cardText.innerHTML = `<h3 id="titulo">${musica.nome}</h3><p id="artista">${musica.artista}</p>`;
          card.appendChild(cardText);
          
          // Adiciona o player de música ao card
          const musicPlayer = document.createElement('section');
          musicPlayer.className = 'music-player';
          const audioPlayer = document.createElement('audio');
          audioPlayer.className = 'audioPlayer';
          audioPlayer.controls = true;
          const source = document.createElement('source');
          source.src = musica.mp3;
          source.type = 'audio/mpeg';
          audioPlayer.appendChild(source);
          musicPlayer.appendChild(audioPlayer);
          card.appendChild(musicPlayer);
          
          // Adiciona o card ao container de cards
          cardContainer.appendChild(card);
        }
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o JSON:', error);
    });
}