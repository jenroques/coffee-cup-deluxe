import React, { useContext } from 'react'
import Shop from './Shop';
import Header from '../Utils/Header';
import styled from 'styled-components';
import { Context } from '../Utils/Context';

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

const Shops = ({ user, shops, shop, setShop }) => {

    console.log(shops)

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
        <Home>
            <Header />
            <Grid>{grid}</Grid>
        </Home>
    )
}

export default Shops
