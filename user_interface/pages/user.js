import { React, useContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { UserContext } from "../context/user";

function User() {
    const router = useRouter()
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user])
    
  return <div>user </div>;
}
export default User;
