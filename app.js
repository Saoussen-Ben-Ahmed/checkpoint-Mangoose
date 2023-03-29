const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });

// Connect to data base
//console.log(process.env.MONGO_URI);
mongoose
  .connect(
    "mongodb://localhost:27017/person",
    { family: 4 },
    {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    }
  )
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err.message));

//create a person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
//Model
const Person = mongoose.model("person", personSchema);

//To create and save a record of a model
const person = new Person({
  name: "John",
  age: 35,
  favoriteFoods: ["pizza", "pasta"],
});

person
  .save()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
//create many contact
const createPeople = async () => {
  const arrayOfPeople = [
    { name: "Alice", age: 25, favoriteFoods: ["tacos", "burgers"] },
    { name: "Bob", age: 40, favoriteFoods: ["steak", "pasta"] },
    { name: "Charlie", age: 20, favoriteFoods: ["burritos", "pizza"] },
  ];

  try {
    const data = await Person.create(arrayOfPeople);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
//To find all the people
const findPersonName = async (name) => {
  try {
    const person = await Person.find({ name: "John" });
    console.log(person);
  } catch (error) {
    console.error("Error", err.message);
  }
};
//To find just one person which has a certain food in the person's favorites

const findPersonFood = async (favoriteFoods) => {
  try {
    const person = await Person.findOne({ ifavoriteFoods: "pizza" });
    console.log(person);
  } catch (error) {
    console.error("Error", err.message);
  }
};

//To find the (only!!) person having a given _id
const findPerson = async (id) => {
  try {
    const person = await Person.findById({ id });
    console.log(person);
  } catch (error) {
    console.error("Error", err.message);
  }
};
//To perform classic updates by running find,
const update = async (id, favoriteFoods) => {
  try {
    const person = await Person.findById(
      { favoriteFoods: "hamburger" },
      { age: 20 },
      { new: true }
    );
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

//To perform new updates on a document
const updatePerson = async (id, name) => {
  try {
    const person = await Person.findByIdAndUpdate(
      { name: "John" },
      { age: 20 },
      { new: true }
    );
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

//To delete one document

const personRemove = async (id, name) => {
  try {
    const person = await Person.findByIdAndRemove(
      { name: "John" },
      { age: 20 },
      { new: true }
    );
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
};
/*require("dotenv").config(); // Charge les variables d'environnement de .env
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté à la base de données MongoDB"))
  .catch((err) =>
    console.log(
      "Impossible de se connecter à la base de données MongoDB: ",
      err
    )
  );
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "John",
  age: 25,
  favoriteFoods: ["Pizza", "Pasta"],
});

person.save(function (err, data) {
  if (err) return console.error(err);
  console.log("Personne enregistrée avec succès");
});
const arrayOfPeople = [
  { name: "Mary", age: 29, favoriteFoods: ["Burritos", "Pizza"] },
  { name: "Alex", age: 32, favoriteFoods: ["Sushi", "Ramen"] },
  { name: "Lisa", age: 27, favoriteFoods: ["Salade", "Fruits"] },
];

Person.create(arrayOfPeople, function (err, people) {
  if (err) return console.error(err);
  console.log(`${people.length} personnes enregistrées avec succès`);
});
Person.find({ name: "John" }, function (err, people) {
  if (err) return console.error(err);
  console.log(`Trouvé ${people.length} personne(s) avec le nom John: `, people);
});
Person.findOne({ favoriteFoods: "Pizza" }, function (err, person) {
  if (err) return console.error(err);
  console.log("Trouvé une personne qui aime la pizza: ", person);
});
const personId = "insert_id_here";

Person.findById(personId, function (err, person) {
  if (err) return console.error(err);
  console.log("Trouvé la personne avec l'id", personId, ": ", person);
});
Person.remove({ name: "Mary" }, function (err, data) {
  if (err) console.log(err);
  else console.log("Toutes les personnes nommées Mary ont été supprimées.");
});
Person.find({ favoriteFoods: "burrito" })
  .sort("name")
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });*/
