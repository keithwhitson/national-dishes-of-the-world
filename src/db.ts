import Dexie from 'dexie';
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
}

// Extend the Dexie class with your tables
class MyDatabase extends Dexie {
  newcountries!: Dexie.Table<Country, number>; // string is the type of the primary key
  newcountries_!: Dexie.Table<Country, number>;
  constructor() {
    super("DishDatabase");
    this.version(13).stores({
      newcountries: '++id, name, code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients',
    });
  }
}

const db = new MyDatabase();

// Check the current version of the database
if (db.verno < 11) {
  // If the current version is less than 11, delete the database and create a new one
  db.delete().then(() => {
    db.version(13).stores({
      newcountries: '++id, name, code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients'
    });
  });
}


  db.version(17).stores({
    newcountries: '++id, name, code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients'
  }).upgrade(async (transaction) => {
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
      ingredients: country.Ingredients
    }));
    await db.newcountries.bulkAdd(formattedCountriesList);
  });


export default db;
