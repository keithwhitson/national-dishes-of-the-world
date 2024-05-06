import React, { useState, useEffect } from 'react';
import db from './db';
import { useParams } from 'react-router-dom';
import logo from './images/logo.png';

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

const CountryDetailComponent: React.FC = () => {
  const { code } = useParams();
  const [specificCountry, setSpecificCountry] = useState<{
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
  } | null>(null);

  useEffect(() => {
    db.newcountries
      .get({ code: code })
      .then((country) => {
        if (country) {
          setSpecificCountry(country);
        } else {
          console.error('No country with code:', code);
        }
      })
      .catch((error) => console.error('Error fetching country:', error));
  }, [code]);

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
              {specificCountry && (specificCountry?.dish ?? '')[0]}
            </Avatar>
          }
          title=<Typography style={{ color: '#032153' }}>
            {specificCountry && specificCountry.name}
          </Typography>
          subheader=<Typography style={{ color: '#53afad' }}>
            {specificCountry && specificCountry.dish}
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
          image={specificCountry?.imagelink ?? ''}
          alt={specificCountry?.dish ?? ''}
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
          {specificCountry && specificCountry.overview}
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
          {specificCountry?.originsandcreation ?? ''}
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
          {specificCountry?.culturalsignificance ?? ''}
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
          {specificCountry?.whatmakesitnationaldish ?? ''}
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
          {specificCountry?.ingredients ?? ''}
          <br />
          <br />
        </Typography>
        <Typography align="left" style={{ color: '#032153' }}>
          {' '}
          Instructions{' '}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          style={{ color: '#53afad' }}
        >
          {specificCountry?.instructions ?? ''}
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

export default CountryDetailComponent;
