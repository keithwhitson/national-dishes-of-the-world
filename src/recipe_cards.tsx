import React, { useState, useEffect } from 'react';
import db from './db';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import logo from './images/logo.png';

const RecipeCardComponent: React.FC = () => {
  //   const [countries, setCountries] = useState<Array<{name: string, code: string | null, title:string, dish: string | null}>>([]);
  const [randomCountries, setRandomCountries] = useState<
    Array<{
      name: string;
      code: string | null;
      title: string;
      dish: string | null;
      overview: string | null;
      originsandcreation: string | null;
      id?: number;
      culturalsignificance: string | null;
      whatmakesitnationaldish: string | null;
      instructions: string | null;
      ingredients: string | null;
      imagelink: string | null;
    }>
  >([]);
  const [withRecipes, setWithRecipes] = useState<
    Array<{
      name: string;
      code: string | null;
      title: string;
      dish: string | null;
      overview: string | null;
      originsandcreation: string | null;
      id?: number;
      culturalsignificance: string | null;
      whatmakesitnationaldish: string | null;
      instructions: string | null;
      ingredients: string | null;
      imagelink: string | null;
    }>
  >([]);

  const randomCountry = async (): Promise<void> => {
    const allCountries = await db.newcountries.toArray();
    const randomIndex = Math.floor(Math.random() * allCountries.length);
    const randomCountry = allCountries[randomIndex];
    setRandomCountries([randomCountry]);
  };

  const withRecipe = async (): Promise<void> => {
    const recipes = await db.newcountries
      .filter(
        (country) =>
          country.instructions !== null && country.instructions !== '',
      )
      .toArray();
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomWithRecipeCountry = recipes[randomIndex];
    setWithRecipes([randomWithRecipeCountry]);
  };

  useEffect(() => {
    randomCountry();
    withRecipe();
  }, []);

  const card = (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#b2dbd4' }} aria-label="recipe">
              {withRecipes[0] && (withRecipes[0]?.dish ?? '')[0]}
            </Avatar>
          }
          title=<Typography style={{ color: '#032153' }}>
            {withRecipes[0] && withRecipes[0].name}
          </Typography>
          subheader=<Typography style={{ color: '#53afad' }}>
            {withRecipes[0] && withRecipes[0].dish}
          </Typography>
        ></CardHeader>
        <CardMedia
          component="img"
          image={logo}
          alt="Logo"
          style={{
            width: '15%',
            paddingRight: '2%',
            paddingTop: '5%',
            opacity: '0.4',
          }}
        />
      </div>

      <CardContent>
        <CardMedia
          component="img"
          style={{ height: 194, paddingBottom: '3%' }}
          image={withRecipes[0]?.imagelink ?? ''}
          alt={withRecipes[0]?.dish ?? ''}
        />

        <Typography align="left" style={{ color: '#032153' }}>
          {' '}
          Overview{' '}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          style={{ color: '#53afad' }}
        >
          {withRecipes[0] && withRecipes[0].overview}
          <br />
          <br />
        </Typography>
        <Typography align="left" style={{ color: '#032153' }}>
          {' '}
          Origin and Creation{' '}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          style={{ color: '#53afad' }}
        >
          {withRecipes[0]?.originsandcreation ?? ''}
          <br />
          <br />
        </Typography>
        <Typography align="left" style={{ color: '#032153' }}>
          {' '}
          Cultural Significance{' '}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          style={{ color: '#53afad' }}
        >
          {withRecipes[0]?.culturalsignificance ?? ''}
          <br />
          <br />
        </Typography>
        <Typography align="left" style={{ color: '#032153' }}>
          {' '}
          What Makes it a National Dish{' '}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          style={{ color: '#53afad' }}
        >
          {withRecipes[0]?.whatmakesitnationaldish ?? ''}
          <br />
          <br />
        </Typography>
        <Typography align="left" style={{ color: '#032153' }}>
          {' '}
          Ingredients{' '}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          style={{ color: '#53afad' }}
        >
          {withRecipes[0]?.ingredients ?? ''}
          <br />
          <br />
        </Typography>
        <Typography align="left" style={{ color: '#032153' }}>
          {' '}
          Instructions{' '}
        </Typography>
        <Typography
          style={{ color: '#53afad' }}
          variant="body2"
          color="text.secondary"
          align="left"
        >
          {withRecipes[0]?.instructions ?? ''}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </React.Fragment>
  );

  return (
    <Box>
      <Typography style={{ color: '#025278' }}>Recipe</Typography>
      <Card style={{ backgroundColor: 'beige' }}>{card}</Card>
    </Box>
  );
};

export default RecipeCardComponent;
