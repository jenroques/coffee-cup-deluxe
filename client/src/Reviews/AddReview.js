import React, { useContext, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, TextField } from '@mui/material';
import { Context } from '../Utils/Context';




const ReviewWrapper = styled.div`
  background:white;
  padding:20px;
  margin-left: 15px;
  border-radius: 0;
  padding-bottom:80px;
  border-left: 1px solid rgba(0,0,0,0.1);
  height: 100vh;
  padding-top: 100px;
  background: black;
  padding-right: 80px;
`

const ReviewHeadline = styled.div`
  font-size:20px;
  padding: 15px 0;
  font-weight: bold;
  color: #fff;
`

const Error = styled.div`
  width: 100%;
  color: rgb(255, 80, 44);
  border: 1px solid rgb(255, 80, 44);
  border-radius: 4px;
  margin-top: 8px;
  text-align:center;
  padding: 4px;
`

const AddReview = ({ user }) => {
  const { shopReviews, setReviews, reviews, setUser } = useContext(Context)
  const defaultValues = {
    title: "",
    description: "",
    user_id: user.id || 0,
    shop_id: shopReviews.id || 0,
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        shop_id: shop.id
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push(`/shops/${shop.id}`);
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  console.log(shop)

  return (
    <ReviewWrapper>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <ReviewHeadline>Have An Experience with {shop.name}? Add Your Review!</ReviewHeadline>
        <TextField
          id="review-title"
          defaultValue="Title"
          label="Title"
          multiline
          maxRows={1}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Button type="submit">Create Review</Button>
        {
          errors &&
          <Error>{errors}</Error>
        }
      </Box>
    </ReviewWrapper>
  )
}

export default AddReview
