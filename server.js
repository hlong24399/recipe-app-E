const express = require('express')
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000
const recipe_data = require('./recipe-data');

// enable middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable public folder as static contents
app.use(express.static(path.join(__dirname, "public")));

// default
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/recipe/:id', (req, res) => {
    id = req.params.id;
    res.render('recipe', {recipe: recipe_data[id]} );
})

app.get('/about', (req, res) => {
    res.render('about');
})


// select handlebars as engine for this view
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', './views');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})