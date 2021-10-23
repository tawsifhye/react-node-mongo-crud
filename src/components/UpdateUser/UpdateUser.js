import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    useEffect(()=>{
        const url =`http://localhost:5000/users/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    },[id])

    //update user
    const handleNameChange = e =>{
        const updatedName = (e.target.value);
        const updatedUser = {name: updatedName, email: user.email};
        setUser(updatedUser);
        // console.log({...user});
        // const updatedUser = {...user};
        // updatedUser.email = updateEmail;
    }
    const handleEmailChange = e =>{
        const updatedEmail = (e.target.value);
        const updatedUser = {name: user.name, email: updatedEmail};
        setUser(updatedUser);
    }

    const handleUpdateUser = e =>{
        const url =`http://localhost:5000/users/${id}`
        fetch(url, {
            method: "PUT",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('Updated Successfully')
                setUser({});
            }
        })
        e.preventDefault();
    }
    
    return (
        <div>
            <h2>Update {user.name}</h2>
            <p>{id}</p>
            <form onSubmit={handleUpdateUser}>
            <input type="text" onChange={handleNameChange} value={user.name || ''}/>
            <br />
            <input type="email" onChange={handleEmailChange} value={user.email || ''} />
            <br />
            <input type="submit" value="Update" />
            {
                !user && <p>User updated successfully</p>
            }
            </form>
        </div>
    );
};

export default UpdateUser;