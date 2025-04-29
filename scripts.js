const convertButoon = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-convert-to")
const currencySelectFrom = document.querySelector(".currency-convert-inside")

function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const CurrencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const CurrencyValueConverted = document.querySelector(".currency-value")

    const rates = {
        real: { dolar: 0.18, euro: 0.16, iene: 5.0 },
        dolar: { real: 5.6, euro: 0.89, iene: 140 },
        euro: { real: 6.4, dolar: 1.1, iene: 150 },
        iene: { real: 0.03, dolar: 0.0071, euro: 0.0066 }
    }

    const from = currencySelectFrom.value
    const to = currencySelect.value
    const rate = rates[from][to]

    const convertedValue = inputCurrencyValue * rate

    CurrencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: from === "real" ? "BRL" : from === "dolar" ? "USD" : from === "euro" ? "EUR" : "JPY"
    }).format(inputCurrencyValue)

    CurrencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: to === "real" ? "BRL" : to === "dolar" ? "USD" : to === "euro" ? "EUR" : "JPY"
    }).format(convertedValue)
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name-convert-to")
    const currencyImage = document.querySelector(".flag-icon2")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/ImgUSA.png"
    }

    if (currencySelect.value == "real") {
        currencyName.innerHTML = "Real Brasileiro"
        currencyImage.src = "./assets/ImgBR.png"
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/ImgEURO.png"
    }

    if (currencySelect.value == "iene") {
        currencyName.innerHTML = "Iene"
        currencyImage.src = "./assets/ImgJP.png"
    }

    convertValues()
}

function changeCurrencyFrom() {
    const currencyNameFrom = document.getElementById("currency-name")
    const currencyImageFrom = document.querySelector(".flag-icon1")

    if (currencySelectFrom.value == "dolar") {
        currencyNameFrom.innerHTML = "Dólar Americano"
        currencyImageFrom.src = "./assets/ImgUSA.png"
    }

    if (currencySelectFrom.value == "real") {
        currencyNameFrom.innerHTML = "Real Brasileiro"
        currencyImageFrom.src = "./assets/ImgBR.png"
    }

    if (currencySelectFrom.value == "euro") {
        currencyNameFrom.innerHTML = "Euro"
        currencyImageFrom.src = "./assets/ImgEURO.png"
    }

    if (currencySelectFrom.value == "iene") {
        currencyNameFrom.innerHTML = "Iene"
        currencyImageFrom.src = "./assets/ImgJP.png"
    }

    convertValues()
}

currencySelectFrom.addEventListener("change", changeCurrencyFrom)
currencySelect.addEventListener("change", changeCurrency)
convertButoon.addEventListener("click", convertValues)

// Inicializa com as moedas padrão
changeCurrency()
changeCurrencyFrom()

