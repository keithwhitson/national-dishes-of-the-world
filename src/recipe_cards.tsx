import React, { useState, useEffect } from 'react';
import db from './db';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';

const RecipeCardComponent: React.FC = () => {


//   const [countries, setCountries] = useState<Array<{name: string, code: string | null, title:string, dish: string | null}>>([]);
  const [randomCountries, setRandomCountries] = useState<Array<{name: string, code: string | null, title:string, dish:string | null, overview: string | null, originsandcreation: string | null, id?: number, culturalsignificance: string | null , whatmakesitnationaldish: string | null, instructions: string | null , ingredients: string | null, imagelink: string | null}>>([]);
  const [withRecipes, setWithRecipes] = useState<Array<{name: string, code: string | null, title:string, dish:string | null, overview: string | null, originsandcreation: string | null,  id?: number, culturalsignificance: string | null, whatmakesitnationaldish: string | null, instructions: string | null, ingredients: string | null, imagelink: string | null}>>([]);




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


  const card = (
    <React.Fragment>
        <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {withRecipes[0] && (withRecipes[0]?.dish ?? '')[0]}
                    </Avatar>
                  }
                          action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                      title = {withRecipes[0] && withRecipes[0].name}
                      subheader = {withRecipes[0] && withRecipes[0].dish}>

        </CardHeader>
        <CardMedia
        component="img"
        height="194"
        // image="https://raw.githubusercontent.com/keithwhitson/national-dishes-of-the-world/gh-pages/country_pics/Botswana.webp"
        image={(withRecipes[0]?.imagelink ?? '')}
        alt={(withRecipes[0]?.dish ?? '')}
      />
      <CardContent>
        <Typography align="left"> Overview </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
      {withRecipes[0] && withRecipes[0].overview}
      <br /><br />
      </Typography>
      <Typography align="left"> Origin and Creation </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
      {(withRecipes[0]?.originsandcreation ?? '')}
      <br /><br />
      </Typography>
      <Typography align="left"> Cultural Significance </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
        {(withRecipes[0]?.culturalsignificance ?? '')}
        <br /><br />
      </Typography>
      <Typography align="left"> What Makes it a National Dish </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
        {(withRecipes[0]?.whatmakesitnationaldish ?? '')}
        <br /><br />
      </Typography>
      <Typography align="left"> Ingredients </Typography>
      <Typography variant="body2" color="text.secondary" align="left">{(withRecipes[0]?.ingredients ?? '')}
      <br /><br />
      </Typography>
      <Typography align="left"> Instructions </Typography>
      <Typography variant="body2" color="text.secondary" align="left">{(withRecipes[0]?.instructions ?? '')}
      </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </React.Fragment>
  );

return (
    <Box>
        <Card style={{ backgroundColor: 'beige' }}>
            {card}
        </Card>
    </Box>

);
};

export default RecipeCardComponent;
