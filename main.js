'use strict';
let bancoDeDados = [];

function estadoInicial() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.querySelector('#numero').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
};

function limpaCampos() {
    document.getElementById('cep').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
};

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
};

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);

const pesquisarCep = async() => {
    const cep = document.getElementById('cep').value ;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    /* fetch(url).then(responde => responde.json()).then(console.log); */
    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){
            alert('Cep não encontrado!');
            limpaCampos()
        } else {
            preencherFormulario(endereco);
        } 
    } else {
        alert('Cep incorreto!');
        limpaCampos()
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);


document.getElementById('salvar').addEventListener('click', function salvar(){
    let nome = document.querySelector('#nome').value;
    let email = document.querySelector('#email').value;
    let numero = document.querySelector('#numero').value;
    let cep = document.querySelector('#cep').value;
    let bairro = document.querySelector('#bairro').value;
    let cidade = document.querySelector('#cidade').value;
    let estado = document.querySelector('#estado').value;

    let dados = {};

    dados.Nome = nome;
    dados.Email = email;
    dados.Numero = numero;
    dados.Cep = cep;
    dados.Bairro = bairro;
    dados.Cidade = cidade;
    dados.Estado = estado;

    dados.ID = bancoDeDados.length + 1
    bancoDeDados.push(dados);

    estadoInicial()

    localStorage.setItem('Clientes', JSON.stringify(bancoDeDados))

    const local = JSON.parse(localStorage.getItem('Clientes'));

    console.log(local)
    
})

    

 

