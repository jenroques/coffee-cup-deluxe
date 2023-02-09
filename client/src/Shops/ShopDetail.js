import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, } from "react-router-dom";
import { Button, Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import { Context } from '../Utils/Context';
import AddReview from "../Reviews/AddReview";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ShopDetail = () => {
    const { setShopReviews, setReviews, user, users, reviews } = useContext(Context);
    const location = useLocation();
    const { shop } = location.state;
    const [open, setOpen] = React.useState(false);
    const [newReviews, setNewReviews] = useState();
    const [currentShop, setCurrentShop] = useState({});

    const handleClose = () => {
        setOpen(false);
        setNewReviews(reviews)
    }

    useEffect(() => {
        fetch(`/shops/${shop.id}`)
            .then((res) => res.json())
            .then((currentShop) => setCurrentShop(currentShop))
    }, [shop])

    useEffect(() => {
        setShopReviews(shop)
    }, [shop, setShopReviews]);

    const handleClick = () => {
        setShopReviews(shop)
        setOpen(true);
    }

    const reviewCallbackHandle = async () => {
        fetch(`/shops/${shop.id}`)
            .then((res) => res.json())
            .then((currentShop) => setCurrentShop(currentShop))
    }

    return (
        <>

            <Card sx={{ mt: 10, ml: 30, mr: 30, maxWidth: 900 }}>
                <CardActionArea>
                    <CardMedia
                        sx={{ mt: 5 }}
                        component="img"
                        height="150"
                        image={shop.image_url}
                        alt={shop.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {shop.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {currentShop.reviews && currentShop.reviews.map(review => {
                                const profile_name = users.find(profile_name => profile_name.id === review.user_id)
                                return (
                                    <div>
                                        <Card key={review.id}>
                                            <ul>
                                                <li>
                                                    <h3>{review.title}</h3>
                                                    <h4>{review.description}</h4>
                                                    <h5> - {profile_name.name}</h5>
                                                </li>
                                            </ul>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleClick}>Add Review</Button>
                    <Modal
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-review"
                        aria-describedby="modal-review"
                    >
                        <div>
                            <Box sx={style}>
                                <AddReview shop={shop} reviews={reviews} setReviews={setReviews} user={user} open={open} setOpen={setOpen} handleClose={handleClose} setNewReviews={setNewReviews} reviewCallbackHandle={reviewCallbackHandle} />
                            </Box>
                        </div>
                    </Modal>
                    <Link to={{
                        pathname: "/shops",
                    }}
                    >
                        <Button>Back</Button>
                    </Link>
                </CardActions>
            </Card>
        </>
    );
};

export default ShopDetail
