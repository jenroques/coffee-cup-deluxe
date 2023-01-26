import React from 'react'

const Auth = ({ user }) => {
    return (
        <div>{`Logged In: ${user.name}`}</div>
    )
}

export default Auth
