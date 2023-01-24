import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding:50px 50px 10px 50px;

  h1 {
    font-size:32px;
  }
`

const Subheader = styled.p`
  font-weight:300;
  font-size:26px;
`

const Header = () => {
  // Add Animation

  const handleCookieClick = () => {
    fetch('/cookie_click')
      .then(res => res.json())
      .then(console.log)
  }

  return (
    <Wrapper>
      <h1>The Coffee Cup</h1>
      <Subheader>Your neighborhood headquarters. Share your experience.</Subheader>
    </Wrapper>
  )
}

export default Header
