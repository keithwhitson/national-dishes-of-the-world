import React, { useState, useEffect } from 'react';
import db from './db';
import countries_list from '../src/countries.json';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DexieComponent: React.FC = () => {



//   const [countries, setCountries] = useState<Array<{name: string, code: string | null, title:string, dish: string | null}>>([]);
  const [randomCountries, setRandomCountries] = useState<Array<{name: string, code: string | null, title:string, dish:string | null, overview: string | null, originsandcreation: string | null, instructions: string | null}>>([]);
  const [withRecipes, setWithRecipes] = useState<Array<{name: string, code: string | null, title:string, dish:string | null, overview: string | null, originsandcreation: string | null, instructions: string | null}>>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const allCountries = async (): Promise<void> => {
        const allCountries = await db.newcountries.toArray();
        const randomIndex = Math.floor(Math.random() * allCountries.length);
        const randomCountry = allCountries[randomIndex];
        setRandomCountries([randomCountry]);
        // setCountries(allCountries);
      };

      const randomCountry = async (): Promise<void> => {
        const allCountries = await db.newcountries.toArray();
        const randomIndex = Math.floor(Math.random() * allCountries.length);
        const randomCountry = allCountries[randomIndex];
        setRandomCountries([randomCountry]);
      }

      const withRecipe = async (): Promise<void> => {
        const recipes = await db.newcountries.filter(country => country.instructions !== null && country.instructions !== '').toArray();
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const randomWithRecipeCountry = recipes[randomIndex];
        setWithRecipes([randomWithRecipeCountry]);
      }

      useEffect(() => {
        randomCountry();
        withRecipe();
      },[])

  useEffect(() => {

    db.newcountries.count().then(count => {
        if (count ===0){
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
            db.newcountries.bulkPut(formattedCountriesList)
              .then(() => {
                allCountries()
                console.log(formattedCountriesList)
            })
              .catch(error => console.error("Error loading JSON into IndexedDB:", error));
        }

    });
  }, [allCountries]);


return (
    <div>
        <h1>{withRecipes.map(country => (
                <ul style={{ listStyleType: 'none' }}>
                <li>
                    Country: {country.name} <br />
                </li>
                </ul>
            ))}</h1>
        <ul style={{ listStyleType: 'none' }}>
            {withRecipes.map(country => (
                <li>
                   Dish:  {country.dish && country.dish !== '' && country.dish} <br /> <br />
                   {/* Code: {country.code && country.code !=='' && country.code} <br /> <br />
                   Title: { country.title && country.title !=='' && country.title  } <br /> <br />
                   Overview: { country.overview && country.overview !=='' && country.overview } <br /> <br />
                   Origins and Creation:  { country.originsandcreation && country.originsandcreation !=='' && country.originsandcreation } <br /> <br />
                   Recipe:  { country.instructions && country.instructions !=='' && country.instructions} */}
                </li>
            ))}
        </ul>
    </div>
);
};

export default DexieComponent;
