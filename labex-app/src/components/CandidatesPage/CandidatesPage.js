import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import usePermission from '../../hooks/usePermission';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from '../../styles';

import Header from '../Header/Header';


function CandidatesPage() {
  const classes = useStyles();
  const pathParams = useParams();
  const history = useHistory();
  const token = useProtectedRoute();
  const permission = usePermission();
  
  const [tripDetails, setTripDetails] = useState({})
  const [candidates, setCandidates] = useState([])
  
  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trip"
  const axiosConfig = {
    headers: {
        auth: token
    }
  };

  
  let isCancelled = false;

  const getTripDetails = () => {
    const id = pathParams.id;

    if (!isCancelled) {
      axios.get(`${baseUrl}/${id}`, axiosConfig)
      .then( response => {
        setTripDetails(response.data.trip)
        setCandidates(response.data.trip.candidates)
      })
      .catch( err => {
        alert("Ops, algo deu errado: " + err.message)
      })
    }
  }

  useEffect(() => {

    if(token === null) {
      history.push("/login");
    } else {
      getTripDetails();

      return () => {
        isCancelled = true;
      };
    }
    
  }, []);

  const decideCandidate = (candidate, approve) => {
    const id = pathParams.id;
    const candidateId = candidate;
    const body = {
      "approve": approve
    }

    axios.put(`${baseUrl}s/${id}/candidates/${candidateId}/decide`, body, axiosConfig)
    .then(() => {
      approve ? alert("Candidato aprovado :)") : alert("Candidato rejeitado :(");
      getTripDetails();
    })
    .catch( err => {
      alert("Ops, algo deu errado: " + err.message)
    })
  }

  const goToTripsList = () => {
    history.push("/trips/list");
  }
  
  const deleteTrip = () => {
    const id = pathParams.id;

    axios.delete(`${baseUrl}s/${id}`, axiosConfig)
    .then(() => {
      alert("Viagem deletada com sucesso!");
      goToTripsList();
    })
    .catch(err => {
      alert("Ops, algo deu errado: " + err.message);
    })
  }

  return (
    <>
      <Header />
      {!tripDetails.name && <Box className={classes.centralize}><CircularProgress color="primary" /></Box>}
      {tripDetails.name && 
      <Container className={classes.container}>
         <Typography 
          align="center" 
          variant="h3" 
          component="h3" 
          className={classes.pos} >
          {tripDetails.name}
        </Typography>
        <Divider  className={classes.pos} />
        <Container  maxWidth="sm">
          <Typography 
            align="center" 
            variant="h6"
            color="textSecondary"
            className={classes.pos} 
            >
          {tripDetails.date} – {tripDetails.durationInDays} dias – {tripDetails.planet}
          </Typography>
          <Typography 
            align="center" 
            variant="body2" 
            component="p" 
            className={classes.pos} 
            >
          {tripDetails.description}
          </Typography>
        </Container>
        {permission === "rev" || permission === "adm" ? <Container maxWidth="sm" className={classes.cards}>
            {candidates.map( candidate => {
              return (
                <Card className={classes.cardLarge} key={candidate.id}>
                        <CardContent>
                            <Typography variant="h6" component="h2">
                            {candidate.name}, {candidate.age}, {candidate.profession}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            {candidate.country}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {candidate.applicationText}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                              className={classes.button} 
                              color="primary" 
                              size="medium" 
                              variant="contained" 
                              onClick={()=>{decideCandidate(candidate.id, true)}}>
                                aceitar
                            </Button>
                            <Button 
                              className={classes.button} 
                              color="secondary" 
                              size="medium" 
                              variant="contained" 
                              onClick={()=>{decideCandidate(candidate.id, false)}}>
                                recusar
                              </Button>
                        </CardActions>
                    </Card>
                )
              })}
        </Container> : null}
        <Box className={classes.centralize}>
          <Button
            className={classes.button} color="primary"
            size="medium"
            variant="contained"
            onClick={goToTripsList}>
              voltar
          </Button>
          {permission === "adm" && <Button
            className={classes.button} color="secondary"
            size="medium"
            variant="contained"
            onClick={deleteTrip}>
              deletar viagem
          </Button>}
        </Box>
      </Container>
      }
    </>
  );
}

export default CandidatesPage;
