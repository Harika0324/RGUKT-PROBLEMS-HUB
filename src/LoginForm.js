import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import "./LoginForm.css";
import React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UsernameContext } from './App.js';
export default function LoginForm(){
    const [showPassword, setShowPassword] = React.useState(false);

    const [password, setPassword] = React.useState("");

    const {setName}=useContext(UsernameContext);

    let handleChange=(event)=>{
      setPassword(event.target.value);
    }

    const [username, setUsername] = React.useState("");

    let handleChange1=(event)=>{
      setName(event.target.value);
      setUsername(event.target.value);
    }
    const navigate=useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  let handleSubmit=(event)=>{
    fetch("https://rgukt-problems-hub.onrender.com/login",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        username,
        password,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      if(data==="success"){
        console.log(username);
        navigate("/problems");
      }
      else{
        alert("Login failed...Try again");
      }
    });
  }
    return(
        <div className="LoginForm">
            <h3>Login</h3>
      <TextField
          label="Username"
          id="outlined-start-adornment"
          value={username}
          onChange={handleChange1}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
          }}
        />
            <br></br><br></br>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <br></br><br></br>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
    );
}
