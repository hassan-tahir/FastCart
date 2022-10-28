import { useRouter } from 'next/router';
import { useState, createContext, useEffect } from 'react';
// import { token } from '../config/config';
import {checkLogin} from '../DAL/user'
export const UserContext = createContext(null);
import instance, { linstance } from '../lib/api';
import { useSnackbar } from 'notistack';
import { set } from 'react-hook-form';
import { token } from '../config/config';

const UserProvider = ({ children }) => {
  const router = useRouter()
  async function doLogin(values) {
    var ret = ['niente'];
    try {
      const resp = await linstance.post('/api/auth/login', values);
      console.log("hello")
      console.log(resp);
      router.push('/user')
      return resp.data;
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doReset(values) {
    try {
      const resp = await linstance.post('/api/auth/reset', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doRemind(values) {
    try {
      const resp = await linstance.post('/api/auth/reminder', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doGoogleCallback(values) {
    try {
      const resp = await linstance.post('/api/auth/google/callback', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doFacebookCallback(values) {
    try {
      const resp = await linstance.post('/api/auth/facebook/callback', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function doRegister(values) {
    var ret = ['niente'];
    try {
      console.log(values);
      const resp = await linstance.post('/api/auth/register', values);
      console.log(resp);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const doLogout = async () => {
    // const resp = await linstance.post('/api/auth/logout', {
    //   method: 'POST',
    // });
    // if (resp.data.message == 'success') {
    //   setUser('');
    //   setEmail('');
    //   setId('');
      localStorage.clear();
      setUser();
      router.push('/login');
    // }
  };

  async function checkIfLogin(error) {
    try{
      const response = await checkLogin();
      if(response.code==200){
        setUser(response.data.username)
        setEmail(response.data.email)
        setId(response.data.id)
        setAdmin(response.data.isAdmin)
      } else {
        if(error){
        enqueueSnackbar(response.message, {variant:'error'})
      }}
    } catch(error){
      console.log(error)
    }
    // try {
    //   const resp = await linstance.get('/api/auth/user');
    //   console.log(resp);
    //   setUser(resp.data.user);
    //   setEmail(resp.data.email);
    //   setId(resp.data.id);
    //   setAdmin(resp.data.isAdmin);
    //   return resp;
    // } catch (error) {
    //   return error.response;
    // }
  }

  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [admin, setAdmin] = useState();
  const [confirmed, setConfirmed] = useState();
  const [jwt, setJwt] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const useract = {
    user: user,
    setUser: setUser,
    loggingIn: loggingIn,
    doLogout: doLogout,
    doLogin: doLogin,
    setLoggingIn: setLoggingIn,
    checkLogin: checkIfLogin,
    jwt: jwt,
    setJwt: setJwt,
    email: email,
    setEmail: setEmail,
    id: id,
    setId: setId,
    doRegister: doRegister,
    doGoogleCallback: doGoogleCallback,
    doFacebookCallback: doFacebookCallback,
    doRemind: doRemind,
    doReset: doReset,
    admin: admin,
    confirmed:confirmed,
  };
  // useEffect(() => {
  //   const func = async () => {
  //     await checkIfLogin();
  //   }
  //   func();
  // }, [])
  
  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
