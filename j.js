document.addEventListener("DOMContentLoaded", function () {
  const listaRestaurantes = document.getElementById('lista-restaurantes');

  fetch('restaurantes.json') 
    .then(response => response.json()) 
    .then(restaurantes => {
      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

      restaurantes.forEach(restaurante => {
        // Cria um novo card para cada restaurante
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.position = 'relative';

        // Simulação da imagem do restaurante (placeholder)
        const placeholder = document.createElement('div');
        placeholder.classList.add('imagem-placeholder');
        placeholder.innerText = restaurante.nome;

        // Criação do botão de favorito
        const botaoFavorito = document.createElement('button');
        botaoFavorito.innerHTML = favoritos.includes(restaurante.id) ? '⭐' : '☆';
        botaoFavorito.classList.add('btn-favorito');

        // Evento de clique no botão de favorito
        botaoFavorito.addEventListener('click', () => {
          // Recarrega os favoritos atuais
          favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

          if (favoritos.includes(restaurante.id)) {
            // Se já é favorito, remove
            favoritos = favoritos.filter(id => id !== restaurante.id);
            botaoFavorito.innerHTML = '☆';
          } else {
            // Se não é favorito, adiciona
            favoritos.push(restaurante.id);
            botaoFavorito.innerHTML = '⭐';
          }

          // Atualiza no localStorage
          localStorage.setItem('favoritos', JSON.stringify(favoritos));

          // Adiciona animação
          botaoFavorito.classList.add('ativo');
          setTimeout(() => botaoFavorito.classList.remove('ativo'), 400);
        });

        // Monta o card
        card.appendChild(placeholder);
        card.appendChild(botaoFavorito);
        listaRestaurantes.appendChild(card);
      });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
});

  