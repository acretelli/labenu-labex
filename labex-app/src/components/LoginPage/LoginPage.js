import React, { useEffect } from 'react';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../styles';

function LoginPage() {
  const classes = useStyles();
  const { form, onChange, resetForm } = useForm({ email: "", password: ""});
  const history = useHistory();
  const token = useProtectedRoute();
  
  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/login"
  
  const goToSignUp = () => {
    history.push("/signup");
  }
  
  const goToCreateForm = () => {
    history.push("/");
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    onChange(name, value)
  }

  const login = event => {
    event.preventDefault();

    const body = {
      "email": form.email,
      "password": form.password
    }

    axios.post(baseUrl, body)
    .then( response => {
      window.localStorage.setItem("permission", response.data.user.email.substring(0, 3))
      window.localStorage.setItem("token", response.data.token);
      goToCreateForm();
      resetForm();
    })
    .catch( err => {
      alert("Usuário ou senha incorretos.")
    })
  }

  useEffect(() => {
    if(token !== null) {
      history.push("/trips/list");
    }
  }, [history]);

  return (
    <>
    <Header />
    <Container>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={login}
        >
            <TextField
              required
              className={classes.input}
              name="email"
              id="outlined-required"
              label="usuário"
              type="email"
              variant="outlined"
              value={form.email}
              onChange={handleInputChange}
            />
            <TextField
              required
              className={classes.input}
              name="password"
              id="outlined-password-input"
              label="senha"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={form.password}
              onChange={handleInputChange}
            />
            <Button 
              className={classes.button}  
              color="primary" 
              variant="contained" 
              type="submit"
              >
                entrar
            </Button>
        </form>
        <Typography 
          color="primary" 
          variant="h6" 
          component="h6" 
          className={classes.link}
          onClick={goToSignUp}
        >
          Não é cadastrado? Cadastre-se aqui.
        </Typography>
    </Container>
    </>
  );
}

export default LoginPage;
