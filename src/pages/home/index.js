import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ImageList from '@mui/material/ImageList'; // Updated import
import ImageListItem from '@mui/material/ImageListItem'; // Updated import
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';
import NavBar from '../../Componenets/AppBar/PrimarySearchAppBar';
import Grid from '@mui/material/Grid';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/home">
        EATS.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Home = (props) => {
  return (
    <React.Fragment>
      <NavBar logout={props.handleLogout} />
      <main>
        {/* Hero unit */}
        <div sx={{ padding: 4, backgroundColor: 'background.paper' }}>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to EATS.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Here are some food options near you. Search below to personalize your results.
            </Typography>
            <div sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <InputBase
                placeholder="Search…"
                sx={{
                  backgroundColor: 'background.default',
                  '&:hover': {
                    backgroundColor: 'background.paper',
                  },
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={props.handleSearch}
              />
            </div>
          </Container>
        </div>
        <Container maxWidth="md">
          {/* End hero unit */}
          <ImageList rowHeight={200} gap={16} variant="masonry"> {/* Updated component and props */}
            {props.allRestaurants.reverse().map((card) => (
              <ImageListItem key={card.id} cols={1}>
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    src={card.image_url === '' ? 'https://www.officespacesny.com/wp-content/themes/realestate-7/images/no-image.png' : card.image_url}
                    alt={card.name}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {card.mom}
                    </Typography>
                    <Typography>
                      {card.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => props.handleMoreInfo(card)}>
                      More Info
                    </Button>
                    <Button size="small" color="primary">
                      Favorite
                    </Button>
                  </CardActions>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </main>
      {/* Footer */}
      <footer sx={{ bgcolor: 'background.paper', py: 3 }}>
        <Container maxWidth="sm">
          <Typography variant="h6" align="center" gutterBottom>
            EATS
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Flatiron School Capstone Project 2021
          </Typography>
        </Container>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default Home;
