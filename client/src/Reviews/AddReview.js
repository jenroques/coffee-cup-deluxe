import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { Alert, Box, Button, TextField } from '@mui/material';
import { Context } from '../Utils/Context';



const ReviewHeadline = styled.div`
  font-size:20px;
  padding: 15px 0;
  font-weight: bold;
  color: #000;
`


const AddReview = ({ user, handleClose, setNewReviews, reviewCallbackHandle }) => {
  const { shopReviews, setReviews, reviews, setUser } = useContext(Context)


  const defaultValues = {
    title: "",
    description: "",
    user_id: user.id || 0,
    shop_id: shopReviews.id || 0,
  }

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(defaultValues);
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setForm({ ...form, [name]: value });
  }


  function handleSubmit(e) {
    e.preventDefault();
    setErrors([])
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        res.json().then((review) => {
          setReviews([...reviews, review])
          setUser({ ...user, shops: [...user.shops, review.shop] })
          reviewCallbackHandle(review);
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      }
      setForm(defaultValues);
      setNewReviews(reviews)
      setIsLoading(false)
    });
    handleClose();
  }

  return (

    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <ReviewHeadline>Have An Experience with {shopReviews.name}? Add Your Review!</ReviewHeadline>
      <TextField
        id="review-title"
        label="Title"
        multiline
        maxRows={1}
        onChange={handleChange}
        value={form.title}
        name='title'
      />
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          onChange={handleChange}
          value={form.description}
          name='description'
        />
      </div>
      <Button type="submit">Create Review</Button>
      <Button onClick={handleClose}>Cancel</Button>
      {errors.map((error) => {
        return <Alert key={error} severity="error" className='error'>{error}</Alert>
      })}
    </Box>
  )
}

export default AddReview
