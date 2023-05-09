const fraseAtual = document.querySelector('img').alt
const h1 = document.querySelector('h1')
const p = document.querySelector('.p')
h1.innerHTML = fraseAtual
const listFrase = []
let letDisplayFrase = ''
let displayCPM = 0

//O cálculo de WPM, CPM ou PPM (Palavras por Minuto)
//é calculado com a quantidade total de palavras ou letras dividido pelo tempo gasto na digitação.

//TODO:
//CPM ta muito alto consertar os cálculos
//FIXME:
const velocidadeDigitação = {
    letras: 0,
    palavras: 0,
    letrasPalavras: 0,
    CPM: 0,
    CPMString: '0',
    WPM: 0,
    WPMString: '0',
    tempoInicio: 0,
    tempoAtual: 0,
    segundos: 0,
    calculo() {
        let diff = Math.abs(this.tempoAtual.getTime() - this.tempoInicio.getTime());
        this.segundos = Math.floor(diff / (1000))
        /*if(this.letrasPalavras==7){
            this.palavras++
        }
        this.WPM = (this.palavras / (this.segundos + 1)) * 60 */
        return this.CPM = (this.letras / (this.segundos + 1)) * 60
    },
    tempoAtualGet() {
        this.tempoAtual = new Date()
    },
    atualiza() {
        this.CPMString = String(this.CPM)
        this.CPMString = this.CPMString.split('.', 1)
        displayCPM = 'CPM: ' + this.CPMString
        p.innerHTML = displayCPM
    },
    exeAll() {
        this.tempoAtualGet()
        this.calculo()
        this.atualiza()
    }
}

function criaLista() {
    for (element in fraseAtual) {
        listFrase.push(fraseAtual[element])
    }
}
criaLista()

//x = posição da letra
//color = cor da letra
const frase = {
    fraseAtualiza(x, color) {
        h1.innerHTML = ''
        listFrase[x] = `<span style="color: ${color};">${fraseAtual[x]}</span>`
        letDisplayFrase = listFrase.join('')
        h1.innerHTML = letDisplayFrase
    }
}

function verificaLetra() {
    let inputText = document.querySelector('.inputText')
    inputText = String(inputText.value)
    if (inputText == '') {

    } else if (inputText !== undefined) {
        velocidadeDigitação.tempoAtualGet()
        for (element in inputText) {
            if (inputText[element] == fraseAtual[element]) {
                velocidadeDigitação.letras = inputText.length
                //velocidadeDigitação.letrasPalavras++
                velocidadeDigitação.exeAll()
                frase.fraseAtualiza(element, 'green')
                document.querySelector('.inputText').style.backgroundColor = 'rgba(128, 128, 128, 0.247)'
            } else {
                frase.fraseAtualiza(element, 'red')
                document.querySelector('.inputText').style.backgroundColor = 'rgba(255, 6, 6, 0.247)'
            }
        }
    }
    if (inputText.length >= fraseAtual.length) {
        if (inputText[inputText.length - 1] == fraseAtual[inputText.length - 1]) {
            for (element in inputText) {
                frase.fraseAtualiza(element, 'blue')
            }
        }
    } else {
        requestIdleCallback(verificaLetra)
    }

}
verificaLetra()

let oneTimeKeyPressed = 0

function keyPressed() {
    if (oneTimeKeyPressed == 0) {
        velocidadeDigitação.tempoInicio = new Date()
        oneTimeKeyPressed = 1
    }
}
document.querySelector('body').addEventListener('keydown', keyPressed)

function clickGerarFrase() {
    window.location.reload()
}