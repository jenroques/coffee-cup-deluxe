import React, { useContext, useState, useEffect } from 'react'
import Shop from './Shop';
import Header from '../Utils/Header';
import styled from 'styled-components';
import { Context } from '../Utils/Context';
import { Box, Button, TextField, Modal } from '@mui/material';

const Home = styled.div`
  text-align:center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Shops = ({ user, shops, setShop }) => {
  const { setShops } = useContext(Context)
  const [errors, setErrors] = useState([])
  const [newShop, setNewShop] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)


  const defaultValues = {
    name: "",
    image_url: "",
  }

  const [form, setForm] = useState(defaultValues)
  console.log(shops)

  const handleClose = () => {
    setOpen(false);
  }

  const handleClick = () => {
    setOpen(true);
  }

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setForm({ ...form, [name]: value });
  }


  function handleSubmit(e) {
    e.preventDefault();
    setErrors([])
    fetch("/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        res.json().then((shop) => {
          setShops([...shops, shop])
          shopCallbackHandle(shop);
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      }
      setForm(defaultValues);
      setNewShop(shops)
      setIsLoading(false)
    });
    handleClose();
  }

  const shopCallbackHandle = async () => {
    fetch('/shops')
      .then((res) => res.json())
      .then((newShop) => setNewShop(newShop))
  }

  const grid = shops.map((shop, index) => {
    const { id, name, image_url } = shop

    return (
      <Shop
        key={index}
        name={name}
        image_url={image_url}
        id={id}
        user={user}
        shop={shop}
        setShop={setShop}
      />
    )
  })


  return (
    <div>
      <Home>
        <Header />
        <Grid>{grid}</Grid>
      </Home>
      <div>
        <Button onClick={handleClick}>Add Shop</Button>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-review"
          aria-describedby="modal-review"
        >
          <div>
            <Box
              component="form"
              sx={style}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="shop-name"
                defaultValue="Name"
                label="Name"

                onChange={handleChange}
                value={form.name}
                name='name'
              />
              <div>
                <TextField
                  sx={{ mt: 2 }}
                  id="shop_image"
                  label="Image URL"
                  defaultValue="Image URL"
                  onChange={handleChange}
                  value={form.image_url}
                  name='image_url'
                />
              </div>
              <Button type="submit">Create Shop</Button>
              <Button onClick={handleClose}>Cancel</Button>

            </Box>
          </div>
        </Modal>

      </div> </div>
  )
}

export default Shops
