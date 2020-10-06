const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
var Router  = require('./routers/router');
app.use('/',Router);

const uri = "mongodb+srv://test:123@cluster0.bpcug.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});