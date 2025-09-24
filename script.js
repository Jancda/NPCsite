const estoque = {
  'PROD001': { nome: 'sorvete de chocolate', quantidade: 50 },
  'PROD002': { nome: 'sorvete de morango', quantidade: 20 },
  'PROD003': { nome: 'sorvete de baunilha', quantidade: 75 }
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function rastrearPedido() {
  const codigo = document.getElementById('codigoPedido').value.trim();
  const result = document.getElementById('resultadoRastreamento');
  if (codigo === '') {
    result.textContent = "Por favor, digite um código de pedido.";
    return;
  }

  result.innerHTML = `
    <p><strong>Status:</strong> Em transporte</p>
    <p><strong>Última atualização:</strong> 17/07/2025 às 10:32</p>
  `;
}

function mostrarEstoque() {
  const lista = document.getElementById('listaEstoque');
  lista.innerHTML = '';
  for (const cod in estoque) {
    const item = estoque[cod];
    const li = document.createElement('li');
    li.textContent = `${item.nome} (${cod}): ${item.quantidade} unidades`;
    lista.appendChild(li);
  }
}

function identificarProduto() {
  const codigo = document.getElementById('codigoProduto').value.trim();
  const info = document.getElementById('infoProduto');
  if (estoque[codigo]) {
    info.innerHTML = `
      <p><strong>Produto:</strong> ${estoque[codigo].nome}</p>
      <p><strong>Quantidade:</strong> ${estoque[codigo].quantidade}</p>
    `;
  } else {
    info.textContent = 'Produto não encontrado.';
  }
}

function registrarEntrada() {
  const produto = document.getElementById('produtoEntrada').value.trim();
  const qtd = parseInt(document.getElementById('quantidadeEntrada').value);
  if (estoque[produto]) {
    estoque[produto].quantidade += qtd;
    alert('Entrada registrada com sucesso!');
    mostrarEstoque();
  } else {
    alert('Produto não encontrado.');
  }
}

function registrarSaida() {
  const produto = document.getElementById('produtoSaida').value.trim();
  const qtd = parseInt(document.getElementById('quantidadeSaida').value);
  if (estoque[produto]) {
    if (estoque[produto].quantidade >= qtd) {
      estoque[produto].quantidade -= qtd;
      alert('Saída registrada com sucesso!');
      mostrarEstoque();
    } else {
      alert('Quantidade insuficiente em estoque.');
    }
  } else {
    alert('Produto não encontrado.');
  }
}

// Mostrar a página inicial ao carregar
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
