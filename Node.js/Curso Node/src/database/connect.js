const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.u2izz1h.mongodb.net/CursoNodeJS`
    );

    console.log("Conexão realizada com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
};

module.exports = connectToDatabase;