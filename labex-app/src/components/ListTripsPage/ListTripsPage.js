import React, { useEffect } from 'react';
import useRequestData from '../../hooks/useRequestData';
import { useHistory } from 'react-router-dom';
import usePermission from '../../hooks/usePermission';
import useProtectedRoute from '../../hooks/useProtectedRoute';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '../Header/Header';

import { useStyles } from '../../styles';

function ListTripsPage() {

  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips"
  
  const classes = useStyles();
  const trips = useRequestData(baseUrl, []);
  const history = useHistory();
  const token = useProtectedRoute();
  const permission = usePermission();

  const goToCreatePage = () => {
    history.push("/trips/create");
  }

  const goToApplication = id => {
    history.push("/trips/application-form/" + id);
  }

  const goToCandidates = id => {
    history.push("/trips/details/" + id);
  }

  const goToHome = id => {
    history.push("/");
  }

  const organizedTrips = trips.sort( (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
  });

  useEffect(() => {
    if(token === null) {
      history.push("/login");
    }
  }, [history]);

  return (
    <>
    <Header />
    <Container maxWidth="lg" className={classes.container}>
      <Typography align="center" variant="h3" component="h3" className={classes.pos} >
        Viagens
      </Typography>
      <Divider />
      <Container maxWidth="lg" className={classes.cards}>
        {trips.length === 0 && <Box className={classes.centralize}><CircularProgress color="primary" /></Box>}
          {organizedTrips.map( trip => {
              return (
                  <Card className={classes.card} key={trip.id}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {trip.date} – {trip.durationInDays} dias
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {trip.name}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {trip.planet}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {trip.description}
                      </Typography>
                    </CardContent>
                      {permission === "user" && <CardActions>
                        <Button
                        className={classes.button} color="primary" size="medium" variant="contained"
                        onClick={() => goToApplication(trip.id)}
                        >inscrever-se</Button>
                      </CardActions>}
                      {permission === "adm" || permission === "rev" ? <CardActions>
                        <Button
                        className={classes.button} color="primary"
                        size="medium"
                        variant="contained"
                        onClick={() => goToCandidates(trip.id)}>candidatos</Button>
                      </CardActions>
                      : null
                      }
                    </Card>
                )
            })}
        </Container>
        
        {permission === "adm" && 
          <Box className={classes.centralize}>
            <Button
              className={classes.button} color="primary"
              size="medium"
              variant="contained"
              onClick={goToHome}>
                voltar
            </Button>
            <Button
              className={classes.button} color="primary"
              size="medium"
              variant="contained"
              onClick={goToCreatePage}>
                criar
            </Button>
          </Box>}
    </Container>
    </>
  );
}

export default ListTripsPage;
