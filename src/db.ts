import Dexie from 'dexie';

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

  constructor() {
    super("MyDatabase_");
    this.version(12).stores({
      newcountries: '++id, name, code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients'
    });
  }
}

const db = new MyDatabase();

// Check the current version of the database
if (db.verno < 12) {
  // If the current version is less than 11, delete the database and create a new one
  db.delete().then(() => {
    db.version(12).stores({
      newcountries: '++id, name, code, title, dish, overview, originsandcreation, culturalsignificance, whatmakesitnationaldish,  instructions, ingredients'
    });
  });
}

export default db;
