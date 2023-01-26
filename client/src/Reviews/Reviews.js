import React, { useState } from 'react'
import styled from 'styled-components'
import Rating from '../Reviews/Rating'


const Card = styled.div`
  border-radius: 4px;
  border: 1px solid #E6E6E6;
  padding: 20px;
  margin: 0px 0px 20px 0px;
  position: relative;
  margin-right: 12px;
`

const Title = styled.div`
  padding: 20px 0px 0px 0px;
  font-family: 'Poppins-Bold';
  font-size: 18px;
`

const Description = styled.div`
  padding: 0 0 20px 0;
  font-size: 14px;
`
const Options = styled.div`
position:absolute;
right :15px;
top: 15px;
display: flex;
flex-direction: columns;
`

const Icon = styled.button`
  box-shadow: none;
  border-radius: 4px;
  margin: 0 4px;
  i {
    font-size: 18px;
  }
`

const Author = styled.div`
  font-size: 16px;
  font-family: 'Poppins-Bold';
  margin: 0 8px;
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Reviews = ({ user, shop, props }) => {
    const [review, setReview] = useState({ title: '', description: '', score: 0 })


    const handleDestroy = (id, e) => {
        fetch(`/reviews/${review.id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    console.log(res)
                } else {
                    res.json().then(console.log)
                }
            })
    }



    console.log(shop)

    return (
        <Card>
            <RatingContainer>
                <Rating score={0} />
                <Author>{ }</Author>
            </RatingContainer>
            <Title>
                {shop}
            </Title>
            <Description>
                {shop}
            </Description>

            <Options>
                <Icon onClick={handleDestroy}>
                    <i className="fa fa-trash"></i>
                </Icon>
                <Icon>
                    <i className="fa fa-pencil"></i>
                </Icon>
            </Options>

        </Card>


    )
}

export default Reviews
