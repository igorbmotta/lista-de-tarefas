const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaTarefa(textoInput) {
    const li = criaLi()
    li.innerHTML = textoInput
    //Vai adicionar o 'li' no elemento pai, que é o 'ul'
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefa()
}

//Essa função vai criar um elemento HTML 'li'
function criaLi() {
    const li = document.createElement('li')
    return li
}

//Vai limpar o campo de escrever assim que adicionar a tarefa
function limpaInput() {
    inputTarefa.value = ''
    //Vai manter o input ativo mesmo clicando no botão de adicionar tarefa
    inputTarefa.focus()
}

//Essa função vai criar um botão para apagar a tarefa
function criaBotaoApagar(li) {
    //Vai dar um espaçamento entre a tarefa e o botão
    li.innerText += ' '
    //Cria um botão
    const botaoApagar = document.createElement('button')
    //Vai botar um texto no botão
    botaoApagar.innerText = 'Apagar'
    //Vai criar uma classe para o botão com o nome 'apagar'
    botaoApagar.setAttribute('class', 'apagar')
    //Vai adicionar no elemento pai que é o 'li'
    li.appendChild(botaoApagar)
}

function salvarTarefa() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON) 
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}

adicionaTarefasSalvas()

//Escutador para ver qual elemento foi clicado
document.addEventListener('click', function(e) {
    //Usando 'target' para se referir ao elemento que desencadeou um evento
    const el = e.target

    //Verifica se o elemento clicado tem a classe 'apagar'
    if (el.classList.contains('apagar')) {
        //Remove o elemento pai do elemento clicado
        el.parentElement.remove()
    }
})

//Escutador para quando a tecla 'ENTER' for pressionada criar a tarefa
inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
})

