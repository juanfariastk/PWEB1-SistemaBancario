class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoDataAniversario = document.querySelector('#dataAniversario');
        const elementoTipoConta = document.querySelector('#tipoConta');
    
        const numero = elementoNumero.value;
        const saldo = Number(elementoSaldo.value);
        const dataAniversario = elementoDataAniversario.value;
        const tipoConta = elementoTipoConta.value;
    
        let conta;
    
        switch (tipoConta) {
            case 'Conta':
                conta = new Conta(numero, saldo);
                break;
            case 'ContaBonificada':
                conta = new ContaBonificada(numero, saldo);
                break;
            case 'Poupanca':
                conta = new Poupanca(numero, saldo, dataAniversario);
                break;
            default:
                console.error('Tipo de conta inválido');
                return;
        }
    
        this.repositorioContas.adicionar(conta);
        this.inserirContaNoHTML(conta);
    }
    

    inserirContaNoHTML(conta) {
        const elementoDiv = document.createElement('div');
        elementoDiv.classList.add('container');
    
        const elementoCard = document.createElement('div');
        elementoCard.classList.add('card', 'mt-3');
    
        const elementoCardBody = document.createElement('div');
        elementoCardBody.classList.add('card-body');
    
        const elementoP = document.createElement('p');
        elementoP.classList.add('card-text');
        
        if (conta instanceof Poupanca) {
            elementoP.textContent = 'Conta Poupança: ' + conta.numero + ', Saldo: ' + conta.saldo;
        } else {
            elementoP.textContent = 'Conta: ' + conta.numero + ', Saldo: ' + conta.saldo;
        }
    
        const botaoApagar = document.createElement('button');
        botaoApagar.classList.add('btn', 'btn-danger');
        botaoApagar.textContent = 'Excluir';
    
        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.parentElement.parentElement.remove();
        });
    
        elementoCardBody.appendChild(elementoP);
        elementoCardBody.appendChild(botaoApagar);
        elementoCard.appendChild(elementoCardBody);
        elementoDiv.appendChild(elementoCard);
        document.body.appendChild(elementoDiv);
    }
    
}
