import { useRouter } from 'next/router';
import { useState, createContext } from 'react';
export const UserContext = createContext(null);
import instance, { linstance } from '../lib/api';

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
      const resp = await linstance.post('/api/auth/register', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const doLogout = async () => {
    const resp = await linstance.post('/api/auth/logout', {
      method: 'POST',
    });
    if (resp.data.message == 'success') {
      setUser('');
      setEmail('');
      setId('');
      // router.push('/user/login');
    }
  };

  async function checkLogin() {
    try {
      const resp = await linstance.get('/api/auth/user');
      // console.log(resp);
      setUser(resp.data.user);
      setEmail(resp.data.email);
      setId(resp.data.id);
      setAdmin(resp.data.isAdmin);
      return resp;
    } catch (error) {
      return error.response;
    }
  }

  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [admin, setAdmin] = useState();
  const [jwt, setJwt] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
  const useract = {
    user: user,
    setUser: setUser,
    loggingIn: loggingIn,
    doLogout: doLogout,
    doLogin: doLogin,
    setLoggingIn: setLoggingIn,
    checkLogin: checkLogin,
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
  };
  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
