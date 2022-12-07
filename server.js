const express = require('express')
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000
const recipe_data = require('./recipe-data');

const like_recipe = []

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
    res.render('recipe', {recipe: recipe_data[id], recipe_id : id} );
})

app.get('/about', (req, res) => {
    res.render("about");
})

app.get('/recipe/like/:id', (req, res) => {
  id = parseInt(req.params.id);
  
  var isAlreadyLiked = like_recipe.includes(recipe_data[id]);

  if (isAlreadyLiked == false)
  {
    like_recipe.push(recipe_data[id]);
  }

  
  id+=1;
  if (id == 16)
  {
    id = 0;
  }
  res.redirect(`/recipe/${id}`);
})

app.get('/recipe/nolike/:id', (req, res) => {
  id = parseInt(req.params.id);
  id+=1;
  res.redirect(`/recipe/${id}`);
})

app.get('/recipe', (req, res) => {
  console.log(like_recipe);
  res.render('favorite', {recipe : like_recipe});
});

// select handlebars as engine for this view
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', './views');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})