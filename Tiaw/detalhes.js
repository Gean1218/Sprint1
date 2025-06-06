document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('main');
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  fetch('restaurantes.json')
    .then(response => response.json())
    .then(restaurantes => {
      const favoritosRestaurantes = restaurantes.filter(r => favoritos.includes(r.id));

      if (favoritosRestaurantes.length === 0) {
        container.innerHTML = "<h2>Você ainda não favoritou nenhum restaurante.</h2>";
        return;
      }

      // Título da seção
      const titulo = document.createElement('h2');
      titulo.textContent = "Seus restaurantes favoritos:";
      container.innerHTML = ""; // Limpa conteúdo anterior
      container.appendChild(titulo);

      // Container dos cards
      const lista = document.createElement('div');
      lista.classList.add('cards');

      favoritosRestaurantes.forEach(restaurante => {
        // Card do restaurante
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.position = 'relative';

        // Imagem simulada
        const placeholder = document.createElement('div');
        placeholder.classList.add('imagem-placeholder');
        placeholder.innerText = restaurante.nome;

        // Botão de desfavoritar
        const botaoFavorito = document.createElement('button');
        botaoFavorito.classList.add('btn-favorito');
        botaoFavorito.innerHTML = '⭐';

        // Evento ao clicar para remover dos favoritos
        botaoFavorito.addEventListener('click', () => {
          let novosFavoritos = favoritos.filter(id => id !== restaurante.id);
          localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));

          // Animação ao clicar
          botaoFavorito.classList.add('ativo');
          setTimeout(() => {
            botaoFavorito.classList.remove('ativo');
            location.reload(); // Só recarrega depois da animação
          }, 400);
        });

        card.appendChild(placeholder);
        card.appendChild(botaoFavorito);
        lista.appendChild(card);
      });

      container.appendChild(lista);
    })
    .catch(error => {
      container.innerHTML = "<p>Erro ao carregar os dados dos restaurantes.</p>";
      console.error(error);
    });
});