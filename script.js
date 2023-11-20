(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_cameras')) ?? [];
}

function setLocalStorage(bd_cameras) {
  localStorage.setItem('bd_cameras', JSON.stringify(bd_cameras));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_cameras = getLocalStorage();
  let index = 0;
  for (camera of bd_cameras) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${camera.marca}</td>
        <td>${camera.modelo}</td>
        <td>${camera.sensor}</td>
        <td>${camera.resolucao}</td>
        <td>${camera.preco}</td>
        <td>${camera.data}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const camera = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    sensor: document.getElementById('sensor').value,
    resolucao: document.getElementById('resolucao').value,
    preco: document.getElementById('preco').value,
    data: document.getElementById('data').value
  }
  const bd_cameras = getLocalStorage();
  bd_cameras.push(camera);
  setLocalStorage(bd_cameras);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_cameras = getLocalStorage();
  bd_cameras.splice(index, 1);
  setLocalStorage(bd_cameras);
  atualizarTabela();
}

function validarModelo() { // Adaptação da função validar (10 pontos)
  const bd_cameras = getLocalStorage();
  for (camera of bd_cameras) {
    if (modelo.value == camera.modelo) {
      modelo.setCustomValidity("Este modelo já existe!");
      feedbackModelo.innerText = "Este modelo já existe!";
      return false;
    } else {
      modelo.setCustomValidity("");
      feedbackModelo.innerText = "Informe o modelo corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const modelo = document.getElementById("modelo");
const feedbackModelo = document.getElementById("feedbackModelo");
modelo.addEventListener('input', validarModelo);