import Dexie from 'dexie'; // Add the missing import statement for 'dexie' package

import countries_list from '../src/countries.json';

interface Country {
  id?: number;
    name: string;
    code: string | null;
    title: string;
    dish: string | null;
    overview: string | null;
    originsandcreation: string | null;
    culturalsignificance: string | null;
    whatmakesitnationaldish: string | null;
    instructions: string | null;
    ingredients: string | null;
    imagelink: string | null;
}

// Extend the Dexie class with your tables
class MyDatabase extends Dexie {
  newcountries!: Dexie.Table<Country, number>; // string is the type of the primary key
  constructor() {
    super("DishDatabase");
    this.version(39).stores({
      newcountries: '++id, name, &code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients, imagelink',
    });
  }
}

const db = new MyDatabase();

db.version(39).stores({
  newcountries: '++id, name, &code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients, imagelink'
}).upgrade(async () => {
  await db.newcountries.clear();
  const formattedCountriesList = countries_list.map(country => ({
    name: country.Name,
    code: country.Code,
    title: country.Title,
    dish: country.Dish,
    overview: country.Overview,
    originsandcreation: country.OriginsAndCreation,
    culturalsignificance: country.CulturalSignificance,
    whatmakesitnationaldish: country.WhatMakesItNationalDish,
    instructions: country.Instructions,
    ingredients: country.Ingredients,
    imagelink: country.ImageLink
  }));
  await db.newcountries.bulkAdd(formattedCountriesList);
});

// Function to load data into the database if empty
async function loadDataIfEmpty() {
  const count = await db.newcountries.count();
  if (count === 0) { // Check if the table is empty
    const formattedCountriesList = countries_list.map(country => ({
      name: country.Name,
      code: country.Code,
      title: country.Title,
      dish: country.Dish,
      overview: country.Overview,
      originsandcreation: country.OriginsAndCreation,
      culturalsignificance: country.CulturalSignificance,
      whatmakesitnationaldish: country.WhatMakesItNationalDish,
      instructions: country.Instructions,
      ingredients: country.Ingredients,
      imagelink: country.ImageLink
    }));
    await db.newcountries.bulkAdd(formattedCountriesList);
    console.log('Data loaded as the database was empty.');
    window.location.reload(); // Reload the application
  } else {
    console.log('Database already has data.');
  }
}

// Call the function to load data if the database is empty
loadDataIfEmpty();

export default db;
