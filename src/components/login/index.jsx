import React, { useState } from 'react';
import { View, Text } from 'react-native';

import firebase from '../../firebase/firebaseConnection';

import { 
  Container, 
  Inputs, 
  ButtonLogin, 
  TextButtonLogin, 
  ButtonNewAccount 
} from './styled.js';

export function ScreenLogin({ changeStatus }) {
  const [type, setType] = useState('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if(type === 'login'){
      //aqui login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid);
      })
      .catch((err) => {
        console.log(err);
        alert('ops, parece que deu algum erro!');
        return;
      })

    }else{
      //aqui cadastro
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid);
      })
      .catch((err) => {
        console.log(err);
        alert('ops, parece que deu algum erro!');
        return;
      })
    }
  }

  return(
    <Container>
      <Inputs
        placeholder='Email'
        value={email}
        onChangeText={ (text) => setEmail(text) }
      />

      <Inputs
        placeholder = 'Password'
        value={password}
        secureTextEntry
        onChangeText={ (text) => setPassword(text) }
      />

      <ButtonLogin 
        onPress={handleLogin}
        style={{backgroundColor: type === 'login' ? '#E5ACA5' : '#f2d1ca'}}
      >
        <TextButtonLogin>
          { type === 'login' ?  'Login' : 'Register' }
        </TextButtonLogin>
      </ButtonLogin>

      <ButtonNewAccount 
        onPress={ () => setType(type => type === 'login' ? 'register' : 'login') }
      >
        <Text>
          { type === 'login' ? 'New Account' : 'Login' }
        </Text>
      </ButtonNewAccount>
    </Container>
  )
}