import express from "express";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();

const MONGO_URI = "mongodb://localhost:27017/new-database?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to MongoDB successfully!')
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_, res) => {
    res.send("hello world");
});

app.post('/create', async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({
        username,
        password
    });
    console.log(newUser);

    await newUser.save()

    res.json(newUser);
});

app.get('/all', async (req, res) => {
    const { l, p } = req.query;

    const limit: number = typeof l !== "string" ? 10 : Math.min(50, parseInt(l));
    const page: number = typeof p !== "string" ? 0 : parseInt(p);

    // page 0, don't skip, page 1, we skip based limit...
    const users = await User.find().limit(limit).skip(limit * page);

    res.json(users);
});

app.get('/find/:username', async (req, res) => {
    const { username } = req.params;

    const theUser = await User.findOne({ username });
    res.json(theUser);
})

app.listen(5000, () => console.log("listening on http://localhost:5000"));