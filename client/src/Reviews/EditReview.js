import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Utils/Context';
import { Button, TextField, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const EditReview = ({ review, handleClose, reviewCallbackHandle }) => {
    const { setReviews, reviews } = useContext(Context)
    const [errors, setErrors] = useState();

    const [form, setForm] = useState({
        title: "",
        comment: "",
        rating: 0
    });

    useEffect(() => {
        setForm(review)
    }, [review])


    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setForm({ ...form, [name]: value });
    }


    function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        fetch(`/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then((res) => {
            if (res.ok) {
                res.json().then((review) => {
                    const updatedReviews = reviews.map((rev) => {
                        if (rev.id === review.id) {
                            return review
                        } else {
                            return rev
                        }
                    })
                    setReviews(updatedReviews)
                    reviewCallbackHandle(updatedReviews);
                })
            } else {
                res.json().then((err) => setErrors(err.error));
            }
        });
    }


    function handleDeleteClick(e) {
        e.preventDefault();
        handleClose();
        fetch(`/reviews/${review.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        }).then((res) => {
            if (res.ok) {

                const newReviews = reviews.filter((rev) => rev.id !== review.id)
                setReviews(newReviews)
                reviewCallbackHandle(newReviews);
            }
        });
    }

    return (
        <div>
            {`${review.title}`}
            <form onSubmit={handleSubmit}>
                <label>
                    <h5>Update title:</h5>
                    <TextField
                        id="review-title"
                        label="Title"
                        multiline
                        maxRows={1}
                        onChange={handleChange}
                        name='title'
                        value={form.title}
                    />
                    <h5>Update new review:</h5>
                    <TextField
                        id="review-description"
                        label="Description"
                        multiline
                        rows={4}
                        onChange={handleChange}
                        value={form.description}
                        name='description'
                    />
                </label>
                <div>
                    <Button className='btn' color="secondary" type="submit">Update Review</Button>
                </div>
            </form>
            <Tooltip title="Delete Review">
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}
export default EditReview
