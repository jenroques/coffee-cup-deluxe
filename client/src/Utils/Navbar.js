import React, { Fragment, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { AppBar, Button, ButtonGroup, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from "../User/Auth"



const Navbar = ({ handleLogout, user, id, shops }) => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="grey">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {!user ? (
                <></>
              ) : (
                <>
                  {" "}
                  <ButtonGroup color="secondary" variant="text">
                    <Link to='/shops'>
                      <Button>Shops</Button>
                    </Link>
                    <Link to='/me'>
                      <Button >Profile</Button>
                    </Link>
                  </ButtonGroup>
                  {" "}
                </>
              )}
              {!user ? (
                <></>
              ) : (
                <>
                </>
              )}
            </Typography>
            {!user ? <></> :
              <Link to='/logout'>
                <Button className="button" color="secondary" onClick={handleLogout}>Logout</Button>
              </Link>
            }
          </Toolbar>
        </AppBar>
      </Box>

    </>
  )

}

export default Navbar
