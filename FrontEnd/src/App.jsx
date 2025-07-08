import React, { useState } from "react";


const API_URL="http://localhost:5000";


function App(){

const [username, setUsername]=useState('');
const [password, setPassword]=useState('');
const [token, setToken] = useState(localStorage.getItem('token') || '');
const [message, setMessage] =useState('');


/*login function*/

const login=async()=>{

    //fetch the login route from the api url
    const res=await fetch(`${API_URL}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({username, password}),
    })

    //assigning the res as a json to the data
    const data=await res.json();

    //if token is found from the backend
    if(data.token){
        //save the token in the localstorage
        localStorage.setItem('token',data.token);
        
        setToken(data.token);
        setMessage('login')
    }
    else{
        setMessage(data.message || 'login failed');
    }



const getProtectedData=async()=>{
    //if token is not found
    if(!token){
        setMessage('you must login first');
        return;
    }
    const res=await fetch(`${API_URL}/me`,{
        headers: {Authorization: `Bearer ${token}`},

    });
    const data=await res.json();
    setMessage(data.message || 'No message');
};


//logout function 
const logout=()=>{
    //remove the token
    setToken('');
    //remove the token from the localstorage
    localStorage.removeItem('token');
    //set the message to logged out
    setMessage('Logged out');
}

return(


    <div className="mainDiv">

    <h1>Authentication </h1>

    <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={e=>setUsername(e.target.value)}
    /><br /><br />

    <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={e=>{setPassword(e.target.value)}}
    /><br/> <br/> 

     <button onClick={login}>Login</button>
      <button onClick={getProtectedData} disabled={!token}>Access Protected Route</button>
      <button onClick={logout}>Logout</button>

      <p>{message}</p>

      {token && (
        <>
          <h4>Your JWT Token:</h4>
          <code>{token}</code>
        </>
      )}
    </div>
  );
} 
 


  

}


export default App



