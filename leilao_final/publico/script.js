// document.addEventListener('DOMContentLoaded', function() {
//   const formLeilao = document.getElementById('form-leilao');
//   const itemSelect = document.getElementById('item_id');
//   const alertaErro = document.getElementById('leilaoAlert');

//   const fetchItens = async () => {
//     try {
//       const response = await fetch('/api/itens');
//       const itens = await response.json();
//       itens.forEach(item => {
//         const option = document.createElement('option');
//         option.value = item.item_id;
//         option.textContent = item.nome;
//         itemSelect.appendChild(option);
//       });
//     } catch (error) {
//       console.error('Erro ao buscar itens:', error);
//     }
//   };

//   formLeilao.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const item_id = itemSelect.value;
//     const inicio_em = document.getElementById('inicio_em').value;
//     const fim_em = document.getElementById('fim_em').value;

//     const leilao = { item_id, inicio_em, fim_em };

//     try {
//       const response = await fetch('/api/leiloes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(leilao)
//       });

//       if (!response.ok) {
//         throw new Error('Erro ao criar leilão');
//       }

//       const data = await response.json();
//       console.log('Leilão criado com sucesso:', data);
//       // Redirecionar ou dar feedback ao usuário
//     } catch (error) {
//       alertaErro.textContent = error.message;
//       alertaErro.classList.remove('d-none');
//       console.error('Erro:', error);
//     }
//   });

//   fetchItens();
// });

document.addEventListener('DOMContentLoaded', function() {
  const formLeilao = document.getElementById('form-leilao');
  const alertaErro = document.getElementById('leilaoAlert');

  formLeilao.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inicio_em = document.getElementById('inicio_em').value;
    const fim_em = document.getElementById('fim_em').value;

    const leilao = { inicio_em, fim_em };

    try {
      const response = await fetch('/api/leiloes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leilao)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar leilão');
      }

      const data = await response.json();
      console.log('Leilão criado com sucesso:', data);
      // Redirecionar ou dar feedback ao usuário
      window.location.href = '/index.html';
    } catch (error) {
      alertaErro.textContent = error.message;
      alertaErro.classList.remove('d-none');
      console.error('Erro:', error);
    }
  });
});
