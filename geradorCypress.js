
const fs = require('fs')

function geraArquivo(objs){
    let it = ''
    let describe = ''
    let card = ''
    // Separa os objetos em arrays
    Object.keys(objs).forEach(key => {
        //Separa os dados dos objetos em arrays
        Object.entries(objs[key]).forEach(entry => {
            const [key, value] = entry;
            if(key == 'descricao'){
                describe = value
            }else{
                it = it + `
                it('${key.includes('e_') ? 'e' : key} ${value}', () => {

                    })
                    `
            }
        })
        // Inclui todos os dados já organizados dentro de uma variável
        card = card + `
        describe('${describe}', () => {
            ${it}
        })
        `
        it = ''  
    })
    // Cria um nome para o arquivo com data e hora atual
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    let arquivo = today.toISOString().substring(0,19)
    arquivo = `${arquivo.replace(':', '-')}.cy.js`
    arquivo = arquivo.replace(':', '-')

    //Verifica se não existe
    if (!fs.existsSync('arquivos')){
        //Efetua a criação do diretório
        fs.mkdirSync('arquivos')
    }

    // Grava o arquivo
    fs.writeFile(`arquivos/${arquivo}`, card, (err) => {
        if (err) return false
      console.log('O arquivo foi criado!');
    })
    return true
}

module.exports = {geraArquivo} 