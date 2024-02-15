import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useState, useEffect } from 'react';
import { login, logout } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@mui/material';



//problème pour insérer balises Head entre balise title autour du titre


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Home() {

  const [firstname, setFirstname] = useState('');
  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [usernameSignIn, setUsernameSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');

  const [openSignIn, setOpenSignIn] = useState(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);


  //fonction activée lors de l'envoi du form signIn
  const handleSubmitSignIn = () => {
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameSignIn, password: passwordSignIn }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: usernameSignIn, token: data.token }));
          setUsernameSignIn('');
          setPasswordSignIn('');
          window.location.replace('/main')
        }
      });
  }

    //fonction activée lors de l'envoi du form signUp
  const handleSubmitSignUp = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameSignUp, password: passwordSignUp }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: usernameSignUp, token: data.token }));
          setUsernameSignUp('');
          setPasswordSignUp('');
        }
      });
  };

  return (
    <div>
      <h1>Hackatweet</h1>
      <div>

        <Button onClick={handleOpenSignIn}>Sign In</Button>
        <Modal
          open={openSignIn}
          onClose={handleCloseSignIn}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Connexion
            </Typography>
            <form onSubmit={handleSubmitSignIn}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={usernameSignIn}
                  onChange={(e) => setUsernameSignIn(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={passwordSignIn}
                  onChange={(e) => setPasswordSignIn(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </Box>
        </Modal>

        <Button onClick={handleOpenSignUp}>Sign Up</Button>
        <Modal
          open={openSignUp}
          onClose={handleCloseSignUp}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Inscription
            </Typography>
            <form onSubmit={handleSubmitSignUp}>
            <div>
                <label htmlFor="firstname">firstname:</label>
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={usernameSignUp}
                  onChange={(e) => setUsernameSignUp(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={passwordSignUp}
                  onChange={(e) => setPasswordSignUp(e.target.value)}
                />
              </div>
              <button type="submit">Subscribe</button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
