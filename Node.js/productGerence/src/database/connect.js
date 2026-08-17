const mongoose = require("mongoose")

const connectToDatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Conexão realizada com sucesso!");
    } catch (error) {
        console.log(`Falha ao conectar com o banco de dados: ${error}`)
    }
}

module.exports = connectToDatabase