import Navbar from "../components/navbar";
import "../styles/globals.css";
import { useState, useEffect, createRef } from "react";
import UserProvider from "../context/user";
import { SnackbarProvider } from "notistack";
import { IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function MyApp({ Component, pageProps }) {
  const notiStackRef = createRef();
  const onClickDismiss = (key) => () => {
    notiStackRef.current.closeSnackbar(key);
  };
  const [cart, setCart] = useState([]);
  const [reloadKey, setReloadKey] = useState(1);
  const addToCart = (item, quantity, price) => {
    let newCart = cart;
    for (var i = 0; i < quantity; i++) {
      newCart.push([item, price]);
    }
    setCart(newCart);
    setReloadKey(Math.random());
  };
  const removeFromCart = (item) => {
    let newCart = cart;
    let index = newCart.indexOf(item);
    newCart.splice(index);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <SnackbarProvider
      hideIconVariant
      ref={notiStackRef}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      TransitionComponent={Slide}
      maxSnack={3}
      autoHideDuration={3000}
      action={(key) => (
        <IconButton onClick={onClickDismiss(key)}>
          <CloseIcon htmlColor="white" />
        </IconButton>
      )}
    >
      <UserProvider>
        <Navbar key={reloadKey} cart={cart} />{" "}
        <Component
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          {...pageProps}
        />
      </UserProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
