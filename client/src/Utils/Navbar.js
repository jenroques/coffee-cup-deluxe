import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, ButtonGroup, Box, Toolbar, Typography } from '@mui/material';
import { Context } from '../Utils/Context'


const Navbar = ({ handleLogout, id }) => {
  const { isLoggedIn } = useContext(Context)

  return (
    <>
      {isLoggedIn ?
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="grey">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
              </Typography>
              <Link to='/logout'>
                <Button className="button" color="secondary" onClick={handleLogout}>Logout</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        :
        <></>

      }
    </>
  )
}

export default Navbar
