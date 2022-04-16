import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from"axios";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



 
export default function CustomizedTables({data,setData}) {

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:8080/add-city/${id}`).then((res)=>{
            getcitydata();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
        React.useEffect(()=>{
            getcitydata();
        },[]);
        const getcitydata=()=>{
            axios.get("http://localhost:8080/add-city").then((res)=>{
                console.log(res);
                setData([...res.data]);
            })
             .catch((err)=>{
                 console.log(err);
             })
        }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Country </StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Population</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.country}</StyledTableCell>
              <StyledTableCell align="right">{row.city}</StyledTableCell>
              <StyledTableCell align="right">{row.population}</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">{
     <Button variant="contained" onClick={()=>handleDelete(row.id)}>Delete</Button>}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}