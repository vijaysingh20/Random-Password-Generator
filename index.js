const resultEL = document.getElementById("res");
const upperCaseEL = document.getElementById("uppercase");
const lowerCaseEL = document.getElementById("lowercase");
const numberEL = document.getElementById("number");
const symbolEL = document.getElementById("symbols");
const generatePasswordEL = document.getElementsByClassName("generatePass");

let lengthEl = document.getElementById("range");
let output = document.getElementById("value");

output.innerHTML = lengthEl.value;
let slVal = 5;
lengthEl.oninput = function() {
    output.innerHTML = this.value;
    slVal = this.value;
}




function getLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
    const symbols = "!@#$%^&*()<>?/.,{}[]|";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
    lower: getLower,
    upper: getUpper,
    number: getNumber,
    symbol: getSymbol
}

generatePasswordEL[0].addEventListener("click", function() {
    const length = slVal;
    const isUpper = upperCaseEL.checked;
    const isLower = lowerCaseEL.checked;
    const isNumber = numberEL.checked;
    const isSymbol = symbolEL.checked;

    const password = generatePassword(isLower, isUpper, isNumber, isSymbol, length);

    if (password === "") {
        alert("Please select at least one type of input");
        resultEL.value = null;
    } else{
        resultEL.value = password;
    }
    console.log(slVal);
})

function generatePassword(lower, upper, number, symbol, length){
    let generatedPass = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0){
        return "";
    }

    for(let i=0; i< length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPass += randomFunc[funcName]();
        });
    }

    return generatedPass.slice(0, length);
}

