const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dynamicProjectRouter = require('./routes/dynamic-project-router');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/projectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', dynamicProjectRouter);

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/project', function (req, res) {
    res.render('pages/project');
});

app.get('/contact', function (req, res) {
    res.render('pages/contact');
});

// about page
app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(3000);
console.log('Server is listening on port 3000');