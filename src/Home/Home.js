
import React
  // , {useState}  
  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button variant="contained" color="primary" onClick={() => props.handleLogout()}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to EATS.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Here are some food near you, click one of the buttons below to get started
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" >
                    Personalize food near me
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Suprise me
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={5}>
            {props.allResturaunts.map((card) => (

              <Grid item key={card.id} xs={12} sm={6} md={4} >
                {/*----------------------------------------card----------------------------------------*/}
                <Card className={classes.card}>
                  {/* {console.log(props.allResturaunts.length, "Count")} */}
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image_url}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.mom}
                    </Typography>
                    <Typography>
                      {card.name}
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      More Info
                    </Button>
                    <Button size="small" color="primary">
                      Favorite
                    </Button>
                  </CardActions>
                </Card>
                {/*---------------------------------------card end---------------------------------------*/}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          EATS
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Flatiron School Capstone Project 2021
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}