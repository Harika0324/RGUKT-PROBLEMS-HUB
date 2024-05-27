import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import "./Problem.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UsernameContext } from './App.js';
// import InputAdornment from '@mui/material/InputAdornment';
export default function Problem(){
    const [problem, setProblem] = useState('');
  const handleChange = (event) => {
    setProblem(event.target.value);
  };
  const {name}=useContext(UsernameContext);
  const [hostel, setHostel] = useState('');

  const handleHostelChange = (event) => {
    setHostel(event.target.value);
  };
  const [wing, setWing] = useState('');

  const handleWingChange = (event) => {
    setWing(event.target.value);
  };

  const [roomNo,setRoomNo]=useState('');
  const handleChange1=(event)=>{
    setRoomNo(event.target.value);
  }

  const navigate=useNavigate();

  const [description, setDescription] = useState('');

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
//   const handleClick=()=>{

//   }
fetch(`https://rgukt-problems-hub.onrender.com/problems/${name}`,{
        method:"GET",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        // body:JSON.stringify({
        //   problem,
        //   hostel,
        //   wing,
        //   description
        // }),
      }).then((res)=>res.json())
      .then((data)=>{
        // if(data==="success"){
          // console.log(data);
          setActiveCases(data);
          // navigate("/problems");
        // }
      });
const [activeCases, setActiveCases] = useState([{}]);
  const handleSubmit=(event)=>{
    event.preventDefault();
    setHostel("");
    setProblem("");
    setRoomNo("");
    setWing("");
    setDescription("");
    fetch(`https://rgukt-problems-hub.onrender.com/problems/${name}`,{
      
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        problem,
        hostel,
        wing,
        roomNo,
        description
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      if(data==="success"){
        navigate("/problems");
      }
    });
  }
  const handleStatus=(row,index)=>{
    fetch(`https://rgukt-problems-hub.onrender.com/status/${name}/${index}`,{
      
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        problem:row.problem,
        hostel:row.hostel,
        wing:row.wing,
        roomNo:row.roomNo,
        description:row.description
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      if(data==="success"){
        navigate("/problems");
      }
    });
  }
    return(
        <div className="Problem">
            <h2>Mention Your Problem</h2>
            <form onSubmit={handleSubmit}>
                <FormControl required sx={{ m: 1, minWidth: 340 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Type of Problem</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={problem}
                    label="Type-of-problem *"
                    autoWidth
                    onChange={handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"electrical"}>electrical</MenuItem>
                    <MenuItem value={"Carpenter"}>Carpenter</MenuItem>
                    <MenuItem value={"Plumber"}>Plumber</MenuItem>
                    </Select>
                </FormControl>
                <br>
                </br><br></br>
                <FormControl required sx={{ m: 1, minWidth: 340 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Hostel</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={hostel}
                    label="Hostel *"
                    autoWidth
                    onChange={handleHostelChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"GBH"}>GBH</MenuItem>
                    <MenuItem value={"KBH"}>KBH</MenuItem>
                    <MenuItem value={"YGH"}>YGH</MenuItem>
                    <MenuItem value={"SGH"}>SGH</MenuItem>
                    <MenuItem value={"GGH"}>GGH</MenuItem>
                    </Select>
                </FormControl>
                <br></br><br></br>
                <FormControl required sx={{ m: 1, minWidth: 340 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Wing</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={wing}
                    label="Wing *"
                    autoWidth
                    onChange={handleWingChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"South"}>South</MenuItem>
                    <MenuItem value={"East"}>East</MenuItem>
                    <MenuItem value={"West"}>West</MenuItem>
                    </Select>
                </FormControl>
                <br></br><br></br>
                <FormControl sx={{ width: '40ch' }}>
                  <TextField
                      required
                      id="outlined-required"
                      label="Room No"
                      value={roomNo}
                      onChange={handleChange1}
                    />
                </FormControl> 
                <br></br><br></br>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField
                        id="outlined-multiline-static"
                        label="Describe your problem"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleDescription}
                        /> 
                </Box>
                <br></br>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </form>
            <br></br><br></br>
            <h2>Recent Cases</h2>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Problem</TableCell>
            <TableCell align="right">Hostel</TableCell>
            <TableCell align="right">Wing</TableCell>
            <TableCell align="right">roomNo</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeCases.map((row,index) => (
            <TableRow
              key={row.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.problem}
              </TableCell>
              <TableCell align="right">{row.hostel}</TableCell>
              <TableCell align="right">{row.wing}</TableCell>
              <TableCell align="right">{row.roomNo}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align='right'>
              <Button variant="contained" color="success" onClick={()=>handleStatus(row,index)}>
              {
                row.isSolved===true?(<span>Solved</span>):(<span>Unsolved</span>)
              }
            </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
}
