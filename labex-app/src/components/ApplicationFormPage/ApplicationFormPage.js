import React from 'react';
import useRequestData from '../../hooks/useRequestData';
import { useHistory, useParams } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../styles';

import Header from '../Header/Header';
import ApplicationFormContainer from '../ApplicationFormContainer/ApplicationFormContainer';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips"

function ApplicationsFormPage() {
    const classes = useStyles();
    const pathParams = useParams();
    const trips = useRequestData(baseUrl, [],);
    const history = useHistory();

    const goToTripsList = () => {
      history.push("/trips/list");
    }

  return (
    <>
    <Header />
    <Container className={classes.container}>
      {trips.map( trip => trip.id === pathParams.id ?
      <Typography key={trip.id} variant="h4" component="h4" className={classes.center}>
        Inscreva-se para {trip.name}
      </Typography>
      : null )}
      <ApplicationFormContainer />
        <Box className={classes.centralize}>
          <Button
            className={classes.button} color="primary"
            size="medium"
            variant="contained"
            onClick={goToTripsList}>
              voltar
          </Button>
        </Box>
    </Container>
    </>
  );
}

export default ApplicationsFormPage;
