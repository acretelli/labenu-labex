import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useForm from '../../hooks/useForm';

import Header from '../Header/Header';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import { useStyles } from '../../styles';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/signup"

function SignUpPage() {
  const classes = useStyles();
  const { form, onChange, resetForm } = useForm({ email: "", password: ""});

  const handleInputChange = event => {
    const { name, value } = event.target;
    onChange(name, value)
  }

  const history = useHistory();

  const signUp = event => {
    event.preventDefault();

    const body = {
      "email": form.email,
      "password": form.password
    }

    axios.post(baseUrl, body)
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      resetForm();
      history.push("/login");
    })
    .catch(err => {
      alert("Ops, algo deu errado:" + err.message)
    })
  }

  return (
    <>
    <Header />
    <Container>
        <form 
          className={classes.form}
          autoComplete="off"
          onSubmit={signUp}
        >
            <TextField
              required
              className={classes.input}
              name="email"
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
                cadastrar
            </Button>
        </form>
    </Container>
    </>
  );
}

export default SignUpPage;
