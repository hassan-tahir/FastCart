import Navbar from '../components/navbar'
import '../styles/globals.css'
import {useState, useEffect} from 'react'
import UserProvider from '../context/user'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([])
  const [reloadKey, setReloadKey] = useState(1)
  const addToCart = (item, quantity, price) => {
    let newCart = cart;
    for(var i=0; i<quantity; i++)
    {
      newCart.push([item, price]);
    }
    setCart(newCart);
    setReloadKey(Math.random())
  }
  const removeFromCart = (item) => {
    let newCart = cart;
    let index = newCart.indexOf(item)
    newCart.splice(index)
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }
  
  return <UserProvider> <Navbar key={reloadKey} cart={cart} /> <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} {...pageProps} /></UserProvider>
}

export default MyApp
