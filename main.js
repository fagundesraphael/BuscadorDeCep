'use-strict';

const cep = document.getElementById('cep');
const pesquisar = document.getElementById('pesquisar');
const limpar = document.getElementById('limpar');

// Validando o CEP
const validarCep = (cep) => {
    return cep.length == 8 && /^[0-9]+$/.test(cep);
}

const preencherDados = async (endereco) => {

    const div_resposta = document.createElement('div')
    div_resposta.setAttribute('class', 'container')
    div_resposta.setAttribute('id', 'div_resposta')

    const lograudouro = document.createElement('p');
    lograudouro.setAttribute('class', 'resposta');
    lograudouro.setAttribute('id', 'logradouro');
    lograudouro.innerHTML = `Logradouro: ${endereco.logradouro}`;

    const bairro = document.createElement('p');
    bairro.setAttribute('class', 'resposta');
    bairro.setAttribute('id', 'bairro');
    bairro.innerHTML = `Bairro: ${endereco.bairro}`;

    const localidade = document.createElement('p');
    localidade.setAttribute('class', 'resposta');
    localidade.setAttribute('id', 'localidade');
    localidade.innerHTML = `Localidade: ${endereco.localidade}`;

    div_resposta.appendChild(lograudouro);
    div_resposta.appendChild(bairro);
    div_resposta.appendChild(localidade);

    document.body.appendChild(div_resposta);

}

const pesquisarCep = async () => {
    const cep_valor = cep.value;
    try {
        if (validarCep(cep_valor)) {
            const viacep_url = `https://viacep.com.br/ws/${cep_valor}/json/`;
            const cep_dados = await fetch(viacep_url);
            const cep_json = await cep_dados.json();

            console.log(cep_json)

            if (cep_json.hasOwnProperty('erro')) {
                throw {
                    'name': 'ErroCep',
                    'message': 'CEP não encontrado'
                }
            } else {
                preencherDados(cep_json);
            }

        } else {
            throw {
                'name': 'ErroCep',
                'message': 'CEP inválido'
            }
        }
    } catch (error) {
        const erro_cep = document.createElement('p');
        erro_cep.setAttribute('id', 'erro_cep');
        erro_cep.setAttribute('class', 'erro');
        erro_cep.innerHTML = error.message;

        document.body.appendChild(erro_cep);
    }
}

const limparDados = () => {
    const div_resposta = document.getElementById('div_resposta');

    const erro = document.getElementById('erro_cep');

    document.getElementById('cep').value = '';

    if (div_resposta) {
        document.body.removeChild(div_resposta);
    } else {
        document.body.removeChild(erro);
    }
}

pesquisar.addEventListener('click', pesquisarCep)
limpar.addEventListener('click', limparDados)
// cep.addEventListener('focus', limparDados)