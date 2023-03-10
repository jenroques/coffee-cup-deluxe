import React, { useEffect, useState, useContext } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Modal, CssBaseline, Box, Toolbar, Typography, Divider, Container, Grid, Paper } from '@mui/material';

import EditReview from '../Reviews/EditReview';
import { Context } from '../Utils/Context';

const Profile = ({ user }) => {
    const [userProfile, setUserProfile] = useState(user)
    const [editOpen, setEditOpen] = useState(false)
    const [currentReview, setCurrentReview] = useState({})
    const { isLoggedIn } = useContext(Context)


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

    // console.log(user)

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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserProfile(JSON.parse(storedUser));
        }
    }, [])

    useEffect(() => {
        fetch(`/users/${user.id}`)
            .then((res) => res.json())
            .then((userProfile) => setUserProfile(userProfile));
    }, [user.id]);


    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('user', JSON.stringify(userProfile));
        }
    }, [userProfile])


    const reviewCallbackHandle = async () => {
        fetch(`/users/${user.id}`)
            .then((res) => res.json())
            .then((userProfile) => setUserProfile(userProfile))
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isLoggedIn ? (
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
                                            <h4>Review Manager - Update or delete your reviews.</h4>
                                            {
                                                userProfile.shops.map((shop, index) => (
                                                    <div key={shop.id}>
                                                        <h4>{shop.name}</h4>
                                                        <div>
                                                            {userProfile.reviews.filter(review => review.shop_id === shop.id).map((review, index1) => (
                                                                <div key={review.id}>
                                                                    <ul>
                                                                        <li>
                                                                            <h4>{review.title}</h4>
                                                                            <Typography>{review.description}</Typography>
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
                                </Grid>
                            </Container>
                        </Box>
                    </Box>
                </ThemeProvider>
            ) : (
                <Typography>Not logged in</Typography>
            )
            }
        </div >
    );
}

export default Profile
