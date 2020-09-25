import mongoose from "mongoose";

const mongooseConnection = {
  connect: (DB_HOST: string) => {
    // used mongodb drvier's new url string parser
    mongoose.set("useNewUrlParser", true);
    // to use mongodb driver's findOneAndUpdate function instead of mongodb's findAndModiy
    mongoose.set("useFindAndModify", false);
    // make mongoose use MongoDB0s createIndex instead of ensureIndex function when we define endexes in schemas
    mongoose.set("useCreateIndex", true);
    // use new server discover and monitoring engie
    mongoose.set("useUnifiedTopology", true);

    // connect finally
    mongoose.connect(DB_HOST);

    mongoose.connection.on("error", (err) => {
      console.log(err);
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running"
      );
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};

export default mongooseConnection;
