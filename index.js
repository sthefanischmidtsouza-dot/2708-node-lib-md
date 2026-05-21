import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

function extraiLinks(texto) {
    // Nova regex simplificada e mais eficiente para capturar os links
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s)]+)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({ [captura[1]]: captura[2] }));

    return resultados.length === 0 ? 'não há links no arquivo' : resultados;
}

// async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        
        // A MÁGICA ACONTECE AQUI:
        // Passamos o texto do arquivo para a função que extrai os links
        const linksExtraidos = extraiLinks(texto);
        
        // Exibimos o resultado bonitinho no console
        console.log(chalk.cyan('Links encontrados no arquivo:'));
        console.dir(linksExtraidos);

    } catch (erro) {
        trataErro(erro);
    }
}

// Executa a função passando o caminho do seu arquivo texto.md
pegaArquivo('./arquivos/texto.md');