import Link from 'next/link'
import {React, useContext, useEffect} from 'react'
import { UserContext } from '../../context/user'
import { useRouter } from 'next/router'

function Admin() {
  const router = useRouter();
  const { user } = useContext(UserContext);
    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user])
  
  return (<div className="container mx-auto">
    <h1 className='font-bold text-3xl my-5'>Wellcome to the Admin Panel of FastCart</h1>
    <ul className='mt-10 text-xl'>
      <li>
        <Link href="admin/manageProducts">
          <a>Manage Products</a>
        </Link>
        </li>
        <li>
        <Link href="admin/manageCategories">
          <a>Manage Categories</a>
        </Link>
        </li>
        <li>
        <Link href="admin/manageUsers">
          <a>Manage Users</a>
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default Admin