import React, { useState, useEffect } from 'react'
import Shop from './Shop';
import Header from '../Utils/Header';
// import airlinesQuery from '../../queries/airlinesQuery'
import styled from 'styled-components'


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

const Shops = () => {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        fetch('/shops')
            .then(res => res.json())
            .then(setShops)
    }, [])

    console.log(shops)

    const grid = shops.map((shop, index) => {
        const { id, name, image_url, slug, average_score } = shop

        return (
            <Shop
                key={index}
                name={name}
                image_url={image_url}
                slug={slug}
                average_score={average_score}
                id={id}
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
