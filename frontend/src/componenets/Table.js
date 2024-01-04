import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({rows}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell style={{color: row.type === 'credit' ? 'green' : 'red'}} component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell style={{color: row.type === 'credit' ? 'green' : 'red'}} align="right">{row.amount}</TableCell>
              <TableCell style={{color: row.type === 'credit' ? 'green' : 'red'}} align="right">{row.currency}</TableCell>
              <TableCell style={{color: row.type === 'credit' ? 'green' : 'red'}} align="right">{row.description}</TableCell>
              <TableCell style={{color: row.type === 'credit' ? 'green' : 'red'}} align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
