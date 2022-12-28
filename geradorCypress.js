
const fs = require('fs')

function geraArquivo(objs){
    let it = ''
    let describe = ''
    let card = ''
    Object.keys(objs).forEach(key => {
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
        });
        card = card + `
        describe('${describe}', () => {
            ${it}
        })
        `
        it = ''  
    });
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    let arquivo = today.toISOString().substring(0,19)
    arquivo = `${arquivo.replace(':', '-')}.cy.js`
    arquivo = arquivo.replace(':', '-')
    fs.writeFile(`arquivos/${arquivo}`, card, (err) => {
        if (err) throw err;
      console.log('O arquivo foi criado!');
    });
    return true
}

module.exports = {geraArquivo} 