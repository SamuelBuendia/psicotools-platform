const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/psicotools-platform-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
