import { useContext } from 'react';
import { UsernameContext } from './App.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  {useState}  from 'react';
export default function WorkerPostLogin(){

    const {name}=useContext(UsernameContext);

    fetch(`https://rgukt-problems-hub.onrender.com/worker-post-login/${name}`,{
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

    return (
        <div>
            <h2>Recent Cases</h2>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Student Id</TableCell>
                    <TableCell align="right">Room No</TableCell>
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
                        {row.stuUsername}
                    </TableCell>
                    <TableCell align="right">{row.roomNo}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align='right'>
                      {row.isSolved===true?(<span>Solved</span>):(<span>Unsolved</span>)}
                   
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}
