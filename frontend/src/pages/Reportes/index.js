import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Navbar from '../../components/Navbar';
import axios from 'axios'
import "../Registros/Registros.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
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

/*
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
*/

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


const apiURL= 'https://textileslaroca.herokuapp.com/' ;

export default function Reportes() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const onRefresh = () => {
    axios.get(apiURL + `reports_by_range/${start}/${end}/`).then(res => {
      setRows(res.data)
      console.log('res ===', res)
    })
  }

  useEffect(() => {
    axios.get(apiURL+"reports/").then(res => {
      setRows(res.data)
      console.log('res ===', res)
    })
  }, [] )
  /*axios.get(apiURL).then(res => {
      setRows(res.data)
      console.log('res ===', res)
    })*/
  return (<>
    <Navbar />
    <div className="date-picker-container">
      <div className="refresh" onClick={onRefresh}>{"⟳"}</div>

      <div className="date-picker">    
      from :
      <div>
      <input type="date" id="start" name="date-start"
       min="2020-01-01" max="2021-12-31" onChange={event => setStart(event.target.value)}>

       </input>
       </div>

        to :  

        <div>
       <input type="date" id="end" name="date-start"
       min="2020-01-01" max="2021-12-31" onChange={event => setEnd(event.target.value)}>
       </input>
       </div>
       </div>

       

      </div>
    <div className="table-container">

    <TableContainer component={Paper}>
      


      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tipo</StyledTableCell>
            <StyledTableCell align="right">Categoría</StyledTableCell>
            <StyledTableCell align="right">Monto</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.subtitle}</StyledTableCell>
              <StyledTableCell  align="right" className={true? "Venta" : "Gasto"}>
              {row.title==="income"?row.amount : (-1*row.amount)}
              </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>



  </>);
}
