document.addEventListener('click', (event) => {
  if (event.target.classList.contains('cancelar-btn') || event.target.closest('.cancelar-btn')) {
    const button = event.target.closest('.cancelar-btn');
    const id = button.dataset.id;
    cancelarReserva(id, button);
  }
});

function cancelarReserva(id, botao) {
  fetch(`http://localhost:3000/reservas/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'Cancelada' })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cancelar reserva');
      }
      return response.json();
    })
    .then(() => {
      alert('Reserva cancelada com sucesso!');
      const linha = botao.closest('tr');
      if (linha) linha.remove();
    })
    .catch(error => {
      console.error(error);
      alert('Erro ao cancelar a reserva.');
    });
}
