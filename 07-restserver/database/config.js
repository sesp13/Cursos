const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODBCNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error de conexion con la base de datos");
  }
};

module.exports = {
  dbConnection,
};
