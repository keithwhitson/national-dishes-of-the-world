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
    imagelink: string | null;
}

// Extend the Dexie class with your tables
class MyDatabase extends Dexie {
  newcountries!: Dexie.Table<Country, number>; // string is the type of the primary key
  constructor() {
    super("DishDatabase_2");
    this.version(13).stores({
      newcountries: '++id, name, &code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients, imagelink',
    });
  }
}

const db = new MyDatabase();




  db.version(37).stores({
    newcountries: '++id, name, &code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients, imagelink'
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
      ingredients: country.Ingredients,
      imagelink: country.ImageLink
    }));
    await db.newcountries.bulkAdd(formattedCountriesList);
  });


export default db;
