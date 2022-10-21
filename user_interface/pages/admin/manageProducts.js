import { Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { useState } from 'react'
import AddProductDrawer from './components/addProductDrawer';
import StickyHeadTable from './components/products';
import {useSnackbar} from 'notistack';


function manageProducts() {
  const {enqueueSnackbar} = useSnackbar();
  const [openAddDrawer, setOpenAddDrawer] = useState(false)
  return (
    <Container>
      <AddProductDrawer 
      openAddDrawer={openAddDrawer}
      setOpenAddDrawer={setOpenAddDrawer}
      />
      <Button
        className="inline-flex float-right my-5 text-white border-0 py-1 px-1 focus:outline-none rounded text-md"
        style={{ backgroundColor: "#f0661f" }}
        // onClick={()=>setOpenAddDrawer(true)}
        onClick={()=>enqueueSnackbar("Button clicked", {variant:'success'})}
      >
        Add New Product
      </Button>
      <StickyHeadTable />
      </Container>
  )
  }
export default manageProducts;