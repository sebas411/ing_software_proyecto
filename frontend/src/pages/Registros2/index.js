import React, { useState, useEffect } from 'react';
import './App.css';
import './Registros.css'
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "../../components/material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Navbar from '../../components/Navbar';
import SpaceBox from '../../components/SpaceBox';
import TableFooter from "@material-ui/core/TableFooter"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `https://textileslaroca.herokuapp.com/`
})

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.primary.dark,
    padding: '100px',
    margin: '0px',
    display: 'flex'
  },
  cells: {
    backgroundColor: 'white'
  }
}))

const apiURL = 'https://textileslaroca.herokuapp.com/';
function Registros2() {

  const classes = useStyles()

  var columns = [
    { title: "id", field: "id", hidden: true },
    {
      title: "Tipo", field: "title",
      lookup: { 'income': 'Venta', 'expense': 'Gasto' }
    },
    { title: "Categor??a", field: "subtitle" },
    { title: "Detalles", field: "details" },
    {
      title: "Monto", field: "amount",
      render: rowData => rowData.title === "income" ? rowData.amount : (-1 * rowData.amount)
    },
    {
      title: "Conciliado", field: "confirmed",
      render: rowData => rowData.confirmed === "true" || rowData.confirmed === true ? <Check /> : <Clear />,
      lookup: { 'true': <Check />, 'false': <Clear /> }
    },
    {
      title: "Fecha", field: "creation_date"
    }
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])


  const fetchDetails = async () => {
    try {
      const res = await axios.get(apiURL + "transactions/")
      setData(res.data)
    } catch (e) {
      console.log("Error --- ", e)
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [])


  const handleRowUpdate = async (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.tipo === "") {
      errorList.push("Por favor, ingrese un dato valido")
    }
    if (newData.subtitulo === "") {
      errorList.push("Por favor, ingrese un dato valido")
    }
    if (newData.detalles === "") {
      errorList.push("Por favor, ingrese un dato valido")
    }
    if (newData.cantidad === "") {
      errorList.push("Por favor, ingrese un dato valido")
    }
    if (newData.revisado === "") {
      errorList.push("Por favor, ingrese un dato valido")
    }
    if (newData.fecha === "") {
      errorList.push("Por favor, ingrese un dato valido")
    }

    if (errorList.length < 1) {
      try {
        const res = await axios.post(apiURL + `transactions/update/${oldData.id}`, newData);
        const index = data.findIndex(item => item.id === oldData.id)
        const updatedData = [...data]
        updatedData[index] = res.data
        setData(updatedData)

        resolve()
        setIserror(false)
        setErrorMessages([])
      } catch (e) {
        setErrorMessages(["La carga fall??, error del servidor"])
        setIserror(true)
        resolve()
      }

    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }

  }


  const handleRowAdd = async (newData, resolve) => {
    //validation
    let errorList = []
    if (newData.title === undefined) {
      errorList.push("Ingrese datos")
    }
    if (newData.subtitle === undefined) {
      errorList.push("Ingrese  subtitulo")
    }
    if (newData.details === undefined) {
      errorList.push("Ingrese detalles")
    }
    if (newData.amount === undefined) {
      errorList.push("Ingrese cantidad")
    }
    if (newData.confirmed === undefined) {
      errorList.push("Ingrese si se ha revisado")
    }
    if (newData.creation_date === undefined) {
      errorList.push("Ingrese fecha")
    }

    if (errorList.length < 1) { //no error
      try {

        const res = await api.post(apiURL + "transactions/create/", newData)
        setData(data.concat(res.data));
        setErrorMessages([])
        resolve()
      } catch (e) {
        setErrorMessages(["No se pueden agregar datos, error del servidor"])
        console.log('eerr ---', e)
        resolve()
      }

    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }


  }

  const sumdata = data.map(data => data.amount).reduce((acc, data) => data.tipo==="Venta"?data + acc :data-acc, 0);


  const truedata = Object.values(data).filter(data => data.confirmed === true)
  
  const sumtruedata = truedata.map(truedata => truedata.amount).reduce((acc, truedata) => truedata.tipo==="Venta"?truedata + acc :truedata-acc, 0)

 



  const handleRowDelete = async (oldData, resolve) => {
    try {
      await axios.delete(apiURL + `transactions/delete/${oldData.id}`);

      const dataDelete = [...data];
      const index = dataDelete.findIndex(item => item.id === oldData.id)
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
      setErrorMessages([])
      setIserror(false)
      resolve()
    } catch (e) {
      setErrorMessages(["La eliminaci??n fall??, error del servvidor"])
      setIserror(true)
      resolve()
    }

    /* api.delete("url" + oldData.id)
       .then(res => {
         const dataDelete = [...data];
         const index = oldData.tableData.id;
         dataDelete.splice(index, 1);
         setData([...dataDelete]);
         resolve()
       })
       .catch(error => {
         setErrorMessages(["La eliminaci??n fall??, error del servvidor"])
         setIserror(true)
         resolve()
       })*/
  }

  /*const handleRowReverse = async (valueData, resolve) => {
    //validation
      try {

        const res = await api.post(apiURL + "transactions/create/", valueData)
        const inversa = Math.abs(res.data.amount) * -1
        setData(data.concat(inversa));
        setErrorMessages([])
        resolve()
      } catch (e) {
        setErrorMessages(["No se pueden agregar datos, error del servidor"])
        console.log('err ---', e)
        resolve()
      }

  }*/


  return (<>
    <Navbar />
    <Grid container direction='column' className={classes.root}>
      <SpaceBox top={3}>
        <div className="Registros2">
          <Grid container spacing={1}>
            <Grid item xs={6} sm={12}>
              <div>
                {iserror &&
                  <Alert severity="error">
                    {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                    })}
                  </Alert>
                }
              </div>
              <MaterialTable
                title="Registros"
                columns={columns}
                data={data}
                icons={tableIcons}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);

                    }),
                  onRowAdd: (newData) => {
                    console.log('the new data is ======', newData)
                    return new Promise((resolve) => {
                      handleRowAdd(newData, resolve)
                    })
                  },
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      handleRowDelete(oldData, resolve)
                    }),
                }}
              />
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className={classes.cells}/>
                  <TableCell colSpan={2} className={classes.cells}>Total: {'Q'+sumdata}</TableCell>
                  <TableCell colSpan={2} className={classes.cells}/>
                  <TableCell colSpan={2} className={classes.cells}>Total Conciliado: {'Q'+sumtruedata}</TableCell>
                </TableRow>
              </TableFooter>
            </Grid>
          </Grid>
        </div>
      </SpaceBox>
    </Grid>
  </>);
}

export default Registros2;