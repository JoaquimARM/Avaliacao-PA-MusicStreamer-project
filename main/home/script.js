                                                          //FUNCAO DE BUSCAR MUSICAS
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

           // Adicionar a informação de favorito ao card
          const cardFavorite = document.createElement('section');
          cardFavorite.className = 'card-favorite';
          cardFavorite.innerHTML = `<span class="material-symbols-outlined ${musica.favorito ? 'favorito' : ''}">star</span>`;
          // Adicionando evento de clique para marcar/desmarcar como favorito
          cardFavorite.addEventListener('click', () => toggleFavorite(musica));
          card.appendChild(cardFavorite);

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
                                                        // TELA INICIAL QUE MOSTRA CARDS ALEATORIOS PRO USUARIO VER

// Função para carregar os dados das músicas do JSON e criar os cards
function loadMusicDataAndCreateRandomCards() {
  // Carregar o arquivo JSON de músicas
  fetch('musicas.json')
      .then(response => response.json()) // Transformar a resposta em JSON
      .then(data => {
          // Extrair as músicas do JSON
          const musicas = Object.values(data).map(item => item.musica);

          // Obter uma lista de índices aleatórios
          const randomIndexes = getRandomIndexes(musicas.length, 9);
          // Filtrar as músicas para pegar apenas as nove correspondentes aos índices aleatórios
          const randomMusicas = randomIndexes.map(index => musicas[index]);

          // Processar os dados e criar os cards
          createMusicCards(randomMusicas);
      })
      .catch(error => {
          console.error('Erro ao carregar o JSON de músicas:', error);
      });
}

// Função para criar os cards de músicas na página
function createMusicCards(data) {
  // Selecionar o contêiner onde os cards serão adicionados
  var cardContainer = document.getElementById("card-container");

  // Iterar sobre os dados das músicas e criar um card para cada uma
  data.forEach(musica => {
      // Criar o card
      const card = document.createElement('section');
      card.className = 'card';

      // Adicionar a imagem do álbum ao card
      const cardImg = document.createElement('section');
      cardImg.className = 'card-img';
      cardImg.innerHTML = `<img src="${musica.album.imagem}" alt="Capa do álbum">`;
      card.appendChild(cardImg);

      // Adicionar o texto da música e do artista ao card
      const cardText = document.createElement('section');
      cardText.className = 'card-text';
      cardText.innerHTML = `<h3>${musica.nome}</h3><p>${musica.artista}</p>`;
      card.appendChild(cardText);

      // Adicionar a informação de favorito ao card
      const cardFavorite = document.createElement('section');
      cardFavorite.className = 'card-favorite';
      cardFavorite.innerHTML = `<span class="material-symbols-outlined ${musica.favorito ? 'favorito' : ''}">star</span>`;
      // Adicionando evento de clique para marcar/desmarcar como favorito
      cardFavorite.addEventListener('click', () => toggleFavorite(musica));
      card.appendChild(cardFavorite);

      // Adicionar o player de música ao card
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

      // Adicionar o card ao contêiner
      cardContainer.appendChild(card);
  });
}

// Função para obter uma lista de índices aleatórios únicos
function getRandomIndexes(maxIndex, count) {
  const indexes = [];
  while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * maxIndex);
      if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
      }
  }
  return indexes;
}

// Função para alternar entre marcar e desmarcar como favorito
function toggleFavorite(musica) {
  musica.favorito = !musica.favorito; // Alternar entre favorito e não favorito
  const favoriteIcon = document.querySelector(`.card-favorite .material-symbols-outlined`);
  favoriteIcon.classList.toggle('favorito', musica.favorito); // Atualizar a classe do ícone
  saveToLocalStorage(musica); // Salvar no Local Storage
}

// Função para salvar as informações da música no Local Storage
function saveToLocalStorage(musica) {
  // Verificar se o Local Storage é suportado pelo navegador
  if (typeof Storage !== 'undefined') {
      // Obter ou inicializar a lista de favoritos no Local Storage
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};
      // Adicionar ou remover a música da lista de favoritos
      if (musica.favorito) {
          favoritos[musica.nome] = musica; // Adicionar música aos favoritos
      } else {
          delete favoritos[musica.nome]; // Remover música dos favoritos
      }
      // Salvar a lista atualizada de favoritos no Local Storage
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
  } else {
      console.error('Local Storage não suportado!');
  }
}

// Função para carregar as músicas favoritas do Local Storage e exibi-las na página
function showFavoriteTracks() {
  // Verificar se o Local Storage é suportado pelo navegador
  if (typeof Storage !== 'undefined') {
      // Obter a lista de favoritos do Local Storage
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};
      const favoriteTracks = Object.values(favoritos);

      // Limpar o contêiner de cards
      const cardContainer = document.getElementById("card-container");
      cardContainer.innerHTML = '';

      // Criar e exibir os cards das músicas favoritas
      createMusicCards(favoriteTracks);
  } else {
      console.error('Local Storage não suportado!');
  }
}

// Adicionar evento de clique ao ícone "FAVORITES" do menu
const favoritesIcon = document.getElementById('favorite-tracks');
favoritesIcon.addEventListener('click', showFavoriteTracks);

// adicionar evento de clique ao ícone "HOME" do menu
const homeIcon = document.getElementById('home');
homeIcon.addEventListener('click', loadMusicDataAndCreateRandomCards);

// Chamar a função para carregar os dados das músicas e criar os cards quando a página carregar
window.onload = loadMusicDataAndCreateRandomCards;