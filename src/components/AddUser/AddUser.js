import React, {useRef} from 'react';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const handleAddUser = (e) =>{
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUSer = {name, email};
        fetch('http://localhost:5000', {
            method: "POSt",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUSer)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                window.alert("Successfully added user")
            }
        }).finally(e.target.reset())
        e.preventDefault();
    }
    
    return (
        <div>
            <h2>Please add an user</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef} placeholder="Name"/>
                <br />
                <input type="email" ref={emailRef} placeholder="Email"/>
                <br />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddUser;