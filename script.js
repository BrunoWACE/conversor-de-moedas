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
async function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector('.input-currency').value) || 0;

    const fromCurrency = currencySelectToConvert.value;
    const toCurrency = currencySelect.value;

    const currencyCodes = {
        real: 'BRL',
        dolar: 'USD',
        euro: 'EUR',
        iene: 'JPY'
    };

    const fromCode = currencyCodes[fromCurrency];
    const toCode = currencyCodes[toCurrency];

    const url = `https://api.frankfurter.app/latest?from=${fromCode}&to=${toCode}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log("Resposta Frankfurter:", data);

    if (!data.rates || !data.rates[toCode]) {
        alert(`Erro ao obter taxa de câmbio para ${fromCode} → ${toCode}.`);
        return;
    }

    const conversionRate = data.rates[toCode];
    const convertedValue = inputCurrencyValue * conversionRate;

    const formatFrom = new Intl.NumberFormat(
        fromCode === 'USD' ? 'en-US' :
        fromCode === 'EUR' ? 'de-DE' :
        fromCode === 'JPY' ? 'ja-JP' :
        'pt-BR',
        {
            style: 'currency',
            currency: fromCode
        }
    );
    leftBoxValue.innerHTML = formatFrom.format(inputCurrencyValue);

    const formatTo = new Intl.NumberFormat(
        toCode === 'USD' ? 'en-US' :
        toCode === 'EUR' ? 'de-DE' :
        toCode === 'JPY' ? 'ja-JP' :
        'pt-BR',
        {
            style: 'currency',
            currency: toCode
        }
    );
    rightBoxValue.innerHTML = formatTo.format(convertedValue);
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

