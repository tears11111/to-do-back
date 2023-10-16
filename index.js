require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const router = require("./src/modules/router/task");

const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors());

app.use(express.json());
app.use("/", router);

const launch = async () => {
  try {
    await mongoose.connect(process.env.URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
      });
      
    app.listen(PORT, () => console.log(`Example app listenning on port ${PORT}!`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

launch();
