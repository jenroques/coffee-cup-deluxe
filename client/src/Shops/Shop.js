import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Rating from '../Reviews/Rating'

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
`

const ShopLogo = styled.div`
  height: 150px;
  img {
    height: 150px;
    width: 150px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 100%;
  }
`

const ShopName = styled.div`
  padding: 20px 0 10px 0;
`

const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height:50px;
  a {
    color: #fff;
    background-color: #71b406;
    border-radius: 4px;
    padding: 10px 50px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #71b406;
    text-align: center;
    line-height: 20px;
    min-height: 40px;
    margin: 7px;
    font-weight: 600;
    text-decoration: none;
    width: 100%;
    transition: ease-in-out 0.1s;
    &:hover{
      border-color: #619a07;
      background: #619a07;
    }
  }
`
const Shop = ({ id, name, image_url, average_score, ...props }) => {
    return (
        <Card>
            <ShopLogo>
                <img src={image_url} alt={name} width="150" />
            </ShopLogo>
            <ShopName>
                {name}
            </ShopName>
            <Rating score={average_score} />
            <LinkWrapper>
                <Link to={`/shops/${id}`}> Shop Details </Link>
            </LinkWrapper>
        </Card>
    )
}

export default Shop
