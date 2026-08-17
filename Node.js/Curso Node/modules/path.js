const path = require("path");

// Arquivo atual
console.log(path.basename(__filename));

// Diretório atual
console.log(path.dirname(__filename));

// Extensão do arquivo
console.log(path.extname(__filename));

// Apresenta o objeto
console.log(path.parse(__filename));

// Caminho do diretório
console.log(__dirname);
