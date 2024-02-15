import styles from '../styles/Login.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useState, useEffect } from 'react';
import { login, logout } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@mui/material';
import Home from './Home';


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


function Login() {


  const user = useSelector((state) => state.user.value);
  console.log(user)

  const dispatch = useDispatch();

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
          return window.location.replace('/home')

        }
      });
  }

    //fonction activée lors de l'envoi du form signUp
  const handleSubmitSignUp = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameSignUp, password: passwordSignUp, firstname: firstname  }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log(data.result)
          dispatch(login({ username: usernameSignUp, token: data.token }));
          setUsernameSignUp('');
          setPasswordSignUp('');
          setFirstname('');
          return window.location.replace('/home')
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
          <Box className='box' sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Connexion
            </Typography>

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
              <button onClick={handleSubmitSignIn}>Login</button>

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
              <button onClick={handleSubmitSignUp}>Subscribe</button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
