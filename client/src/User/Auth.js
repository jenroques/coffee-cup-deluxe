import React from 'react'

const Auth = ({ setCurrentUser }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            name,
            password
        }
        fetch('/users', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(setCurrentUser)
                } else {
                    res.json().then(e => setErrors(e.error))
                }
            })
    }


    return (
        <div>Auth</div>
    )
}

export default Auth
