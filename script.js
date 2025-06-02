/*
//Feito com o Rodolfo 
const convertButton = document.querySelector('.convert-button')
const currencySelect = document.querySelector('.currency-select')

function convertValues() {
    const inputCurrencyValue = document.querySelector('.input-currency').value
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert') // Valor real
    const currencyValueToConverted = document.querySelector('.currency-value') // Outras moedas

    const dolarToday = 5.2
    const euroToday = 6.2
    const IeneToday = 3.9

    if (currencySelect.value == 'dolar') { // Se o select estive selecionado o valor de dolar entre aqui
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(inputCurrencyValue / dolarToday)
    }

    if (currencySelect.value == 'euro') { // Se o select estive selecionado o valor de euro entre aqui
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(inputCurrencyValue / euroToday);
    }

    if (currencySelect.value == 'iene') { // Se o select estive selecionado o valor de iene entre aqui
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        }).format(inputCurrencyValue / IeneToday);
    }


    currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(inputCurrencyValue)
}

function changeCurrency() {
    const currencyName = document.getElementById('currency-name')
    const currencyImage = document.querySelector('.currency-img')

    if (currencySelect.value == 'dolar') {
        currencyName.innerHTML = 'Dólar Americano'
        currencyImage.src = './assets/ImgUSA.png'
    }

    if (currencySelect.value == 'euro') {
        currencyName.innerHTML = 'Euro'
        currencyImage.src = './assets/ImgEURO.png'
    }

    if (currencySelect.value == 'iene') {
        currencyName.innerHTML = 'Iene'
        currencyImage.src = './assets/ImgJP.png'
    }

    convertValues()
}

currencySelect.addEventListener('change', changeCurrency)
convertButton.addEventListener('click', convertValues)*/


// Seletores do DOM
const currencySelectToConvert = document.querySelector('.currency-select-to-convert');
const currencySelect = document.querySelector('.currency-select');
const convertButton = document.querySelector('.convert-button');
const arrow = document.querySelector('.arrow');

const leftBoxImage = document.querySelector('.currency-img-to');
const leftBoxName = document.querySelectorAll('.currency-box .currency')[0];
const leftBoxValue = document.querySelector('.currency-value-to-convert');

const rightBoxImage = document.querySelector('.currency-img');
const rightBoxName = document.getElementById('currency-name');
const rightBoxValue = document.querySelector('.currency-value');


// Função que converte valores de qualquer moeda A para qualquer moeda B,
// usando o Real (BRL) como “moeda ponte”.
function convertValues() {
    // 2.1) Pega o valor digitado (string) e transforma em número
    const inputCurrencyValue = parseFloat(document.querySelector('.input-currency').value) || 0;

    //  Defina aqui as cotações em Relação ao REAL:
    //  ex: 1 USD = 5.2 BRL, 1 EUR = 6.2 BRL, 1 JPY = 3.9 BRL
    const dolarToday = 5.2;
    const euroToday = 6.2;
    const ieneToday = 3.9;

    // Primeiro: converter de “origem” → BRL
    let valorEmReais = 0;
    switch (currencySelectToConvert.value) {
        case 'real':
            // Se a moeda de origem já for Real, não multiplica nada:
            valorEmReais = inputCurrencyValue;
            break;
        case 'dolar':
            // Se for Dólar, multiplica para converter USD → BRL
            valorEmReais = inputCurrencyValue * dolarToday;
            break;
        case 'euro':
            // Se for Euro, multiplica para converter EUR → BRL
            valorEmReais = inputCurrencyValue * euroToday;
            break;
        case 'iene':
            // Se for Iene, multiplica para converter JPY → BRL
            valorEmReais = inputCurrencyValue * ieneToday;
            break;
        default:
            valorEmReais = 0;
    }

    //  Atualiza o valo r no BOX da ESQUERDA (origem),
    //  mostrando como “origem formatada”:
    switch (currencySelectToConvert.value) {
        case 'real':
            leftBoxValue.innerHTML = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(inputCurrencyValue);
            break;
        case 'dolar':
            leftBoxValue.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(inputCurrencyValue);
            break;
        case 'euro':
            leftBoxValue.innerHTML = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(inputCurrencyValue);
            break;
        case 'iene':
            leftBoxValue.innerHTML = new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY'
            }).format(inputCurrencyValue);
            break;
    }

    //  Em seguida: converter de BRL → “moeda de destino”
    let valorConvertido = 0;
    switch (currencySelect.value) {
        case 'real':
            // Se destino for Real, o valor é exatamente valorEmReais
            valorConvertido = valorEmReais;
            rightBoxValue.innerHTML = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valorConvertido);
            break;
        case 'dolar':
            // Se destino for Dólar, divide o valorEmReais pela cotação do Dólar
            valorConvertido = valorEmReais / dolarToday;
            rightBoxValue.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(valorConvertido);
            break;
        case 'euro':
            // Se destino for Euro, divide o valorEmReais pela cotação do Euro
            valorConvertido = valorEmReais / euroToday;
            rightBoxValue.innerHTML = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(valorConvertido);
            break;
        case 'iene':
            // Se destino for Iene, divide o valorEmReais pela cotação do Iene
            valorConvertido = valorEmReais / ieneToday;
            rightBoxValue.innerHTML = new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY'
            }).format(valorConvertido);
            break;
        default:
            rightBoxValue.innerHTML = '–';
    }
}


// Função que atualiza o nome e a imagem de cada box (origem e destino):
function updateBoxesUI() {
    //  Box da esquerda (moeda de origem):
    switch (currencySelectToConvert.value) {
        case 'real':
            leftBoxName.innerText = 'Real Brasileiro';
            leftBoxImage.src = './assets/ImgBR.png';
            break;
        case 'dolar':
            leftBoxName.innerText = 'Dólar Americano';
            leftBoxImage.src = './assets/ImgUSA.png';
            break;
        case 'euro':
            leftBoxName.innerText = 'Euro';
            leftBoxImage.src = './assets/ImgEURO.png';
            break;
        case 'iene':
            leftBoxName.innerText = 'Iene';
            leftBoxImage.src = './assets/ImgJP.png';
            break;
    }

    //  Box da direita (moeda de destino):
    switch (currencySelect.value) {
        case 'real':
            rightBoxName.innerText = 'Real Brasileiro';
            rightBoxImage.src = './assets/ImgBR.png';
            break;
        case 'dolar':
            rightBoxName.innerText = 'Dólar Americano';
            rightBoxImage.src = './assets/ImgUSA.png';
            break;
        case 'euro':
            rightBoxName.innerText = 'Euro';
            rightBoxImage.src = './assets/ImgEURO.png';
            break;
        case 'iene':
            rightBoxName.innerText = 'Iene';
            rightBoxImage.src = './assets/ImgJP.png';
            break;
    }
}


// Eventos de mudança nos selects e clique no botão “Converter”
currencySelectToConvert.addEventListener('change', () => {
    updateBoxesUI();
    convertValues();
});
currencySelect.addEventListener('change', () => {
    updateBoxesUI();
    convertValues();
});
convertButton.addEventListener('click', () => {
    convertValues();
});


// Clique na seta: faz o swap (troca) dos valores dos dois selects
arrow.addEventListener('click', () => {
    // troca valor entre SELECT de destino e SELECT de origem
    const temp = currencySelect.value;
    currencySelect.value = currencySelectToConvert.value;
    currencySelectToConvert.value = temp;

    // atualiza nomes e imagens, depois recalcula conversão
    updateBoxesUI();
    convertValues();
});


// Ao carregar a página, inicializa os boxes e valores
window.addEventListener('DOMContentLoaded', () => {
    updateBoxesUI();
    convertValues();
});

