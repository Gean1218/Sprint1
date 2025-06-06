document.addEventListener('DOMContentLoaded', () => {
  fetch('restaurantes.json')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('tabela-reservas');
      tbody.innerHTML = '';

      data.reservas.forEach(reserva => {
        if (reserva.status.toLowerCase() === 'cancelada') {
          return; // Não mostrar reservas canceladas
        }

        const linha = document.createElement('tr');

        linha.innerHTML = `
          <td><img src="${reserva.imagem}" alt="Imagem da mesa" class="img-thumbnail" style="width: 100px;"></td>
          <td>${reserva.restaurante}</td>
          <td>${formatarStatus(reserva.status)}</td>
          <td>${reserva.horario}</td>
          <td>${reserva.data}</td>
          <td>${reserva.mesa}</td>
          <td>
            <button class="btn btn-sm btn-danger cancelar-btn" data-id="${reserva.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;

        tbody.appendChild(linha);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as reservas:', error);
    });
});

function formatarStatus(status) {
  switch (status.toLowerCase()) {
    case 'confirmada':
      return '<span class="badge bg-success">Confirmada</span>';
    case 'pendente':
      return '<span class="badge bg-warning text-dark">Pendente</span>';
    case 'cancelada':
      return '<span class="badge bg-danger">Cancelada</span>';
    default:
      return `<span class="badge bg-secondary">${status}</span>`;
  }
}