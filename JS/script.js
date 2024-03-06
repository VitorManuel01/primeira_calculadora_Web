const operacoesAnterioresText = document.querySelector("#operacoes-anteriores");
const operacaoAtualText = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#buttons button");


class Calculator{
    constructor(operacoesAnterioresText, operacaoAtualText){
        this.operacoesAnterioresText = operacoesAnterioresText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
    }

    //adiciona digito para tela
    addDigito(digito){
        //ver se já tem ponto
        if(digito === "." && this.operacaoAtualText.innerText.includes(".")){
            return;
        }

        this.operacaoAtual = digito;
        this.atualizarTela()
    }

    //processar operações da calculadora
    processarOperacao(operacao){    
        //pegar valor atual e anterior
        if(this.operacaoAtualText.innerText === "" && operacao !== "CE"){
            if(this.operacoesAnterioresText.innerText !== ""){
                this.mudarOperacao(operacao);
            }
            return;
        }
        let valorOperacao;
        const anterior = +this.operacoesAnterioresText.innerText.split(" ")[0];
        const atual = +this.operacaoAtualText.innerText;

        switch(operacao){
            case "+":
                valorOperacao = anterior + atual;
                this.atualizarTela(valorOperacao, operacao, anterior, atual);
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.atualizarTela(valorOperacao, operacao, anterior, atual);
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.atualizarTela(valorOperacao, operacao, anterior, atual);
                break;
            case "/":
                valorOperacao =  anterior / atual;
                this.atualizarTela(valorOperacao, operacao, anterior, atual);
                break;
            case "C":
                this.deletarUltimoDigito();
                break;
            case "CE":
                this.deletarTudo();
                break;
            case "=":
                this.processarBotaoIgual();
                break;    
            default:
                return;
        }
    }


    //muda os valores da tela
    atualizarTela(valorOperacao = null, operacao = null, anterior = null, atual = null){
        console.log(valorOperacao, operacao, atual, anterior);
        if(valorOperacao === null){
            this.operacaoAtualText.innerText += this.operacaoAtual;
       
        }else{
           //ver se o valor é 0, se sim, só add o valor atual
           if(anterior === 0){
            valorOperacao = atual
           }
           //add valor atual para anterior
           this.operacoesAnterioresText.innerText = `${valorOperacao} ${operacao}`
           this.operacaoAtualText.innerText = "";
        }
    }   
    
    //mudar a operação matematica
    mudarOperacao(operacao){
        const operacoesMatematicas = ["+","-","*","/"];
        if(!operacoesMatematicas.includes(operacao)){
            return;
        }

        this.operacoesAnterioresText.innerText = this.operacoesAnterioresText.innerText.slice(0, -1) + operacao;
    }

    deletarUltimoDigito(){
        this.operacaoAtualText.innerText = this.operacaoAtualText.innerText.slice(0,-1);
    }
    deletarTudo(){
        this.operacaoAtualText.innerText = "";
        this.operacoesAnterioresText.innerText = "";
    }
    processarBotaoIgual(){
        const operacao = operacoesAnterioresText.innerText.split(" ")[1];
        this.processarOperacao(operacao);
    }
}

const calc = new Calculator(operacoesAnterioresText, operacaoAtualText);


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText;

        if(+valor >= 0 || valor === "."){
            calc.addDigito(valor)
        }else{
            calc.processarOperacao(valor);
        }
    })
})