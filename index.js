const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB Connected")
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Connected!')
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});