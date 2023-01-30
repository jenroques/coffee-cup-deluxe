import React, { useEffect, useState, Fragment } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Modal, CssBaseline, Box, Toolbar, Typography, Divider, Container, Grid, Grow, Paper } from '@mui/material';

import EditReview from '../Reviews/EditReview';
import ShopDetail from '../Shops/ShopDetail';
import { useContext } from 'react';
import { Context } from '../Utils/Context';


const Profile = ({ }) => {
    const { user, loadUser, setUser } = useContext(Context)
    //const [userProfile, setUser] = useState(user)
    const [editOpen, setEditOpen] = useState(false)
    const [currentReview, setCurrentReview] = useState({})

    const mdTheme = createTheme();

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


    console.log(user)

    const handleOpen = () => setEditOpen(true);
    const handleClose = () => setEditOpen(false);

    const ReviewModal = ({ review }) => (

        <Modal
            open={editOpen}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <EditReview review={review} editOpen={editOpen} handleClose={handleClose} reviewCallbackHandle={reviewCallbackHandle} />
            </Box>
        </Modal>
    );

    const reviewCallbackHandle = async () => {
        // fetch(`/users/${user.id}`)
        //     .then((res) => res.json())
        //     .then((userData) => loadUser)
        loadUser()
    }
    if (!user) {
        return null
    }
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{}}>
                <CssBaseline />
                <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                    sx={{ ml: 3, mt: 3, mb: -6 }}
                >
                    {user.name}
                </Typography>
                <Divider />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h4>Review Manager</h4>
                                    <p>Update or delete your reviews.</p>
                                    {
                                        user.shops.map((shop, index) => (
                                            <div key={shop.id}>
                                                <p>{shop.name}</p>
                                                <p>{shop.description}</p>
                                                <div>
                                                    {
                                                        user.reviews.filter(review => review.shop_id === shop.id).map((review, index1) => (
                                                            <div key={review.id}>
                                                                <ul>
                                                                    <li>
                                                                        <h5>{review.title}</h5>
                                                                        <h6>{review.description}</h6>
                                                                    </li>
                                                                </ul>

                                                                <Button key={index} size="small" color="secondary" onClick={() => { handleOpen(); setCurrentReview(review) }} >Manage Review</Button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {currentReview && <ReviewModal review={currentReview} />}
                                </Paper>
                            </Grid>
                            {/* Shops */}

                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Profile
