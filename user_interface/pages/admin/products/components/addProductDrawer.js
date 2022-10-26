import * as React from "react";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { Container } from "@mui/system";
import { uploadImage } from "../../../../DAL/files";
import { addProduct } from "../../../../DAL/products";
import { useSnackbar } from "notistack";
import {
  FormControl,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
  InputAdornment,
  TextareaAutosize,
} from "@mui/material";
import instance from "../../../../lib/api";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
export default function AddProductDrawer({ openAddDrawer, setOpenAddDrawer }) {
  const {enqueueSnackbar} = useSnackbar();
  const [categories, setCategories] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [name, setName] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inventory, setInventory] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [productDescription, setProductDescription] = useState();
  const [slug, setSlug] = useState();
  useEffect(() => {
    const getHabits = async () => {
      try {
        const response = await instance.get("/api/categories");
        // console.log(response.data.data)
        setCategories(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getHabits();
  }, []);
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    let formData = new FormData();
    formData.append("files", selectedImage);
    try {
      const response = await uploadImage(formData);
      console.log(response);
      if (response.code===200) {
        setImage(response.data[0].url);
        let data = {
          product_name: name,
          product_description: productDescription,
          inventory_items: inventory,
          price: price,
          slug: slug,
          category: selectedCategory,
          image: image,
        };
        try {
          if(image){
          const res = await addProduct(data);
          console.log(res);
          enqueueSnackbar("Product Added Successfully", {variant:'success'});
          }
          else{
            console.log('no image');
          }
        } catch (error) {
          console.log(error);
        }
      }
      else{
        console.log('not hitted');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={openAddDrawer}
      onClose={() => setOpenAddDrawer(false)}
    >
      <Container sx={{ width: 300, my: 5 }}>
        <Typography sx={{ mb: 2, pb: 1 }} variant="h5">
          Add New Product
        </Typography>
        <form>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              id="outlined-basic"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Product Description"
              multiline
              maxRows={4}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              autoWidth
              label="Category"
            >
              {categories &&
                categories.map((category) => {
                  return (
                    <MenuItem
                      key={category.id}
                      value={category.attributes.category_name}
                    >
                      {category.attributes.category_name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              type="number"
              id="outlined-basic"
              label="Inventory"
              onChange={(e) => setInventory(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              id="outlined-basic"
              type="number"
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField variant="outlined" id="outlined-basic" label="Slug" onChange={e=>setSlug(e.target.value)} />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            {!selectedImage && (
              <Button
                variant="contained"
                component="label"
                className="inline-flex text-white border-0 py-1 px-1 focus:outline-none rounded text-md"
                style={{ backgroundColor: "#f0661f" }}
              >
                Select Image <PhotoCamera sx={{ ml: 1 }} />
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </Button>
            )}
            {selectedImage && (
              <Button
                variant="contained"
                component="label"
                className="inline-flex text-white border-0 py-1 px-1 focus:outline-none rounded text-md"
                style={{ backgroundColor: "#f0661f" }}
              >
                <PhotoCamera sx={{ mr: 2 }} /> {selectedImage.name}
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </Button>
            )}
          </FormControl>
          <Button
            className="inline-flex text-white border-0 py-1 px-1 focus:outline-none rounded text-md"
            style={{ backgroundColor: "#f0661f" }}
            onClick={handleSubmit}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Container>
    </Drawer>
  );
}
