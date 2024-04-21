                                                          //FUNCAO DE BUSCAR MUSICAS
// Função para carregar o JSON e criar os cards
function buscar() {
  const texto = document.getElementById('texto-buscar').value.toLowerCase();
  const cardContainer = document.getElementById('card-container');

  // Limpa resultados anteriores
  cardContainer.innerHTML = '';

  // Carrega o arquivo JSON
  fetch('musicas.json')
    .then(response => response.json())
    .then(data => {
      // vai ate o JSON e verifica se o texto corresponde ao nome da música ou do artista
      for (const key in data) {
        const musica = data[key].musica;
        if (
          musica.nome.toLowerCase().includes(texto) ||
          musica.artista.toLowerCase().includes(texto)
        ) {
          // Cria o card
          const card = document.createElement('section');
          card.className = 'card';

          // Adiciona a imagem do álbum ao card
          const cardImg = document.createElement('section');
          cardImg.className = 'card-img';
          cardImg.innerHTML = `<img src="${musica.album.imagem}" alt="Capa do álbum">`;
          card.appendChild(cardImg);

          // Adiciona o nome da música e do artista ao card
          const cardText = document.createElement('section');
          cardText.className = 'card-text';
          cardText.innerHTML = `<h3 id="titulo">${musica.nome}</h3><p id="artista">${musica.artista}</p>`;
          card.appendChild(cardText);

           // Adiciona a opcao de favorito ao card
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

// carrega os dados das músicas do JSON e cria os cards
function loadMusicDataAndCreateRandomCards() {
  // Carregar o arquivo JSON das músicas
  fetch('musicas.json')
      .then(response => response.json())
      .then(data => {
          // Extrair as músicas do arquivo JSON
          const musicas = Object.values(data).map(item => item.musica);

          // faz uma lista com índices aleatórios
          const randomIndexes = getRandomIndexes(musicas.length, 9);
          // Filtra as músicas para pegar apenas as nove correspondentes aos índices aleatórios
          const randomMusicas = randomIndexes.map(index => musicas[index]);

          // cria os cards com musicas aleatorias
          createMusicCards(randomMusicas);
      })
      .catch(error => {
          console.error('Erro ao carregar o JSON de músicas:', error);
      });
}

// Função para adicionar aleatorios de música na página (funcao de criar cards e a mesma da de cima)
function createMusicCards(data) {
  // Selecionar o contêiner onde os cards serão adicionados
  var cardContainer = document.getElementById("card-container");

  data.forEach(musica => {
      // Cria o card
      const card = document.createElement('section');
      card.className = 'card';

      // Adiciona a imagem do álbum ao card
      const cardImg = document.createElement('section');
      cardImg.className = 'card-img';
      cardImg.innerHTML = `<img src="${musica.album.imagem}" alt="Capa do álbum">`;
      card.appendChild(cardImg);

      // Adiciona o nome da música e do artista ao card
      const cardText = document.createElement('section');
      cardText.className = 'card-text';
      cardText.innerHTML = `<h3>${musica.nome}</h3><p>${musica.artista}</p>`;
      card.appendChild(cardText);

      // Adiciona a informação de favorito ao card
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

      // Adiciona o card ao contêiner
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
                                      //FUNCAO DE FAVORITAR MUSICAS E SALVAR NO LOCAL STORAGE

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

      // Cria e exibe os cards das músicas favoritas
      createMusicCards(favoriteTracks);
  } else {
      console.error('Local Storage não suportado!');
  }
}

// Adiciona evento de clique ao ícone "FAVORITES" do menu
const favoritesIcon = document.getElementById('favorite-tracks');
favoritesIcon.addEventListener('click', showFavoriteTracks);

// adiciona evento de clique ao ícone "HOME" do menu
const homeIcon = document.getElementById('home');
homeIcon.addEventListener('click', loadMusicDataAndCreateRandomCards);

// Chamar a função para carregar os dados das músicas e criar os cards quando a página carregar
window.onload = loadMusicDataAndCreateRandomCards;