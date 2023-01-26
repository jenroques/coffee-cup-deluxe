import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Context } from '../Utils/Context';

const ShopDetail = ({ shops }) => {
    const { setShopReviews } = useContext(Context);
    const location = useLocation();
    const { shop } = location.state;

    const [shopDetail, setShopDetail] = useState();


    useEffect(() => {
        fetch(`/shops/${shop.id}`)
            .then((res) => res.json())
            .then((shopDetail) => setShopDetail(shopDetail))
    }, [])

    const handleClick = () => {
        setShopReviews(shop)
    }

    console.log(shop)
    console.log(shopDetail)

    return (
        <>

            <Card sx={{ ml: 30, mr: 30, maxWidth: 900 }}>
                <CardActionArea>
                    <CardMedia
                        sx={{ mt: 5 }}
                        component="img"
                        height="200"
                        image={shop.image_url}
                        alt={shop.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {shop.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {shop.reviews && shop.reviews.map((review, index) => {
                                return (
                                    <>
                                        <Card key={index}>
                                            <ul>
                                                <li>
                                                    <h4>{review.title}</h4>
                                                    <h5>{review.description}</h5>
                                                </li>
                                            </ul>
                                        </Card>
                                    </>
                                )
                            })}

                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to="/addreview">
                        <Button onClick={handleClick}>Add Review</Button>
                    </Link>
                </CardActions>
            </Card>
        </>
    );
};

export default ShopDetail
