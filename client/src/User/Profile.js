import React, { useEffect } from 'react'

const Profile = ({ user }) => {

    useEffect(() => {
        fetch(`/users/${user.id}`)
            .then(res => res.json())
            .then(console.log(user))
    }, [])


    return (
        <div>{user.name}</div>
    )
}

export default Profile
