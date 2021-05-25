import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Navbar from '../../components/Navbar';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1a237e',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, nombre, tipo, cantidad, fecha) {
  return { id, nombre, tipo, cantidad, fecha };
}

const rows = [
  createData(1, 'Venta de 10 metros cuadrados', 'Ingreso', '1200', '18-05-2021'),
  createData(2, 'Venta de 1.5 metros cuadrados', 'Ingreso', '200', '21-05-2021'),
  createData(3, 'Factura de luz', 'Gasto', '5030', '22-05-2021'),
  createData(4, 'Factura de agua', 'Gasto', '2300', '22-05-2021'),
  createData(5, 'Venta de 35 metros cuadrados', 'Ingreso', '3050', '23-05-2021'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function DataTable() {
  const classes = useStyles();

  return (<>
      <Navbar />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="right">Tipo</StyledTableCell>
            <StyledTableCell align="right">Cantidad</StyledTableCell>
            <StyledTableCell align="right">Fecha</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.nombre}</StyledTableCell>
              <StyledTableCell align="right">{row.tipo}</StyledTableCell>
              <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
              <StyledTableCell align="right">{row.fecha}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>);
}