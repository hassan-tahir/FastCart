import { React, useContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { UserContext } from "../context/user";

function Cart() {
  const router = useRouter()
  const { user } = useContext(UserContext);
  useEffect(() => {
      if (!user) {
          router.push('/login');
      }
  }, [user])
  return (
    <div>Cart</div>
  )
}

export default Cart