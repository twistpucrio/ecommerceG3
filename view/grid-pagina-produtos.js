fetch('prod.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao carregar o JSON");
    }
    return response.json();
  })
  .then(data => {
    const produtos = data.produtos;
    const filtradosSala = produtos.filter(p => p.id >= 1 && p.id <= 10);
    const filtradosJardim = produtos.filter(p => p.id >= 11 && p.id <= 23);

    let filtrados = [];

    if (pagina === "jardim") {
      filtrados = filtradosJardim;
    } else if (pagina === "sala") {
      filtrados = filtradosSala;
    }

    filtrados.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = p.imagem;
      img.alt = p.nome;

      const info = document.createElement('div');
      info.className = 'card-info';
      info.textContent = `${p.nome} - (R$ ${p.preco})`;

      const button = document.createElement('button');
      button.className = 'btn-add-carrinho';
      button.textContent = 'Adicionar ao carrinho';

      button.addEventListener('click', () => {
        adicionarAoCarrinho(p.nome, p.id, p.preco, p.imagem);
      });

      card.appendChild(img);
      card.appendChild(info);
      grid.appendChild(card);
      card.appendChild(button);
    });
  })
  .catch(error => {
    console.error("Erro:", error);
  });