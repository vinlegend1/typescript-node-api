import express from "express";
import mongoose from "mongoose";

const app = express();

const MONGO_URI = "mongodb://localhost:27017";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to MongoDB successfully!')
});

app.get('/', (_, res) => {
    res.send("hello world");
});

app.listen(5000, () => console.log("listening on http://localhost:5000"));