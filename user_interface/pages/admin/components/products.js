import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import UserMoreMenu from "./UserMoreMenu";
import instance from "../../../lib/api";
import { useRouter } from "next/router";
import { deleteProduct } from "../../../DAL/products"; 
import { useSnackbar } from "notistack";
const columns = [
  { id: "image", label: "Image", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 170 },
  {
    id: "inventory",
    label: "Inventory",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

export default function StickyHeadTable() {
  const Router = useRouter();
  const {enqueueSnackbar} = useSnackbar()
  const [products, setProducts] = useState();
  const [change, setChange] = useState();
  useEffect(() => {
    const getProducts = async () => {
      let header = {
        Authorization:
          "Bearer b730f65dc102cef4d448a275393cf999ec567fcf46bb45278b33c3bee723c3b5471d5646a8280720f0e402c127e2e5e6ae955215bb5146ec534ec7a13ecaa71a5a35802b39f228df029593fdf88d42ff7aa706a50bd66a17582f8ea826d95fbd2b1a37d5a1439106d13965669c91cb35c38e0227e4b920e8cac44b800ff1e596",
      };
      const res = await instance.get(
        "/api/products?populate=*",
        {
          headers: header,
        }
      );
      setProducts(res.data.data);
    };
    getProducts();
  }, [change]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id)
      if(response.code===200)
      {
        enqueueSnackbar("Product Deleted Successfully", {variant:'success'})
      }
      // setChange(!change);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = (id) => {
    console.log("edit clicked");
  };
  return (
    <Paper sx={{ width: "90%", overflow: "hidden", m: "auto" }}>
      
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length > 0 ? (
              products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={product.id}
                    >
                      <TableCell>
                        <img
                          src={product.attributes.image}
                          width="60px"
                          height="60px"
                        />
                      </TableCell>
                      <TableCell>{product.attributes.product_name}</TableCell>
                      <TableCell>
                        {product.attributes.category}
                      </TableCell>
                      <TableCell>
                        {product.attributes.inventory_items}
                      </TableCell>
                      <TableCell>Rs. {product.attributes.price}</TableCell>
                      <TableCell>
                        <UserMoreMenu
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                          id={product.id}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-xl font-bold"
                >
                  Sorry! No Product Found!!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products ? products.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
