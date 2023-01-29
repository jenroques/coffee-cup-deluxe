import React from 'react'

const Auth = ({ user }) => {
    return (
        <h6>{`Logged In: ${user.name}`}</h6>
    )
}

export default Auth
