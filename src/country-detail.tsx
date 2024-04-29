import React, { useState, useEffect } from 'react';
import db from './db';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';


const CountryDetailComponent: React.FC=() => {
  const { code } = useParams();
  const [specificCountry, setSpecificCountry] = useState<{name: string, code: string | null, title:string, dish:string | null, overview: string | null, originsandcreation: string | null,  id?: number, culturalsignificance: string | null, whatmakesitnationaldish: string | null, instructions: string | null, ingredients: string | null, imagelink: string | null} | null>(null);

  useEffect(() => {
    db.newcountries.get({ code: code })
      .then(country => {
        if(country) {
            setSpecificCountry(country)
        }
        else {
            console.error('No country with code:', code);
        }
      })
      .catch(error => console.error('Error fetching country:', error));
  }, [code]);


  const card = (
    <React.Fragment>
        <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {specificCountry && (specificCountry?.dish ?? '')[0]}
                    </Avatar>
                  }
                          action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                      title = {specificCountry && specificCountry.name}
                      subheader = {specificCountry && specificCountry.dish}>

        </CardHeader>
        <CardMedia
        component="img"
        height="194"
        // image="https://raw.githubusercontent.com/keithwhitson/national-dishes-of-the-world/gh-pages/country_pics/Botswana.webp"
        image={(specificCountry?.imagelink ?? '')}
        alt={(specificCountry?.dish ?? '')}
      />
      <CardContent>
        <Typography align="left"> Overview </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
      {specificCountry && specificCountry.overview}
      <br /><br />
      </Typography>
      <Typography align="left"> Origin and Creation </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
      {(specificCountry?.originsandcreation ?? '')}
      <br /><br />
      </Typography>
      <Typography align="left"> Cultural Significance </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
        {(specificCountry?.culturalsignificance ?? '')}
        <br /><br />
      </Typography>
      <Typography align="left"> What Makes it a National Dish </Typography>
      <Typography variant="body2" color="text.secondary" align="left">
        {(specificCountry?.whatmakesitnationaldish ?? '')}
        <br /><br />
      </Typography>
      <Typography align="left"> Ingredients </Typography>
      <Typography variant="body2" color="text.secondary" align="left">{(specificCountry?.ingredients ?? '')}
      <br /><br />
      </Typography>
      <Typography align="left"> Instructions </Typography>
      <Typography variant="body2" color="text.secondary" align="left">{(specificCountry?.instructions ?? '')}
      </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box>
        <Card >
            {card}
        </Card>
    </Box>
  );
}

export default CountryDetailComponent;