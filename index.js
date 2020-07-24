const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: "Ceviche",
      level: "Amateur Chef",
      ingredients: ["fish", "lime", "cilantro", "onion", "black pepper", "aji peppers"],
      cuisine: "Peruvian",
      dishType: "main_course",
      image: "https://www.laylita.com/recipes/wp-content/uploads/2013/07/2-Peruvian-ceviche.jpg",
      duration: 25,
      creator: "some guy",
      created: new Date(1912, 0, 1),
    });
  })
  .then((recipe) => {
    console.log("Created new recipe,", recipe.title);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.map((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true });
  })
  .then((recipe) => {
    console.log("Recipe was updated", recipe.duration);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe was deleted");
    console.log("Disconnecting from database");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
