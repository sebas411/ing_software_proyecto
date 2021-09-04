import React, { useState, useEffect } from 'react';
import './App.css';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'

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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
  baseURL: `http://127.0.0.1:8000/transactions/`
})



const apiURL = 'http://127.0.0.1:8000/transactions/';
function Registros2() {
  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Tipo", field: "title"},
    { title: "Categoría", field: "subtitle" },
    { title: "Detalles", field: "details" },
    { title: "Monto", field: "amount"},
    {
      title: "Conciliado", field: "confirmed",
      render: rowData => rowData.confirmed === "true" || rowData.confirmed === true ? <Check /> : <Clear />,
      lookup: { 'true': <Check />, 'false': <Clear /> }
    },
    { title: "Fecha", field: "creation_date"}
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const fetchDetails = async () => {
    try {
      const res = await axios.get(apiURL)
      setData(res.data)
    } catch (e) {
      console.log("Error --- ", e)
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [])

  console.log('the dat ais ====', data)

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
        const res = await axios.post(apiURL + `update/${oldData.id}`, newData);
        const index = data.findIndex(item => item.id === oldData.id)
        const updatedData = [...data]
        updatedData[index] = res.data
        setData(updatedData)

        resolve()
        setIserror(false)
        setErrorMessages([])
      } catch (e) {
        setErrorMessages(["La carga falló, error del servidor"])
        setIserror(true)
        resolve()
      }

      /* api.patch("url" + newData.id, newData)
         .then(res => {
           const dataUpdate = [...data];
           const index = oldData.tableData.id;
           dataUpdate[index] = newData;
           setData([...dataUpdate]);
           resolve()
           setIserror(false)
           setErrorMessages([])
         })
         .catch(error => {
           setErrorMessages(["La carga falló, error del servidor"])
           setIserror(true)
           resolve()
 
         })*/
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

        const res = await api.post(apiURL + "create/", newData)
        setData(data.concat(res.data));
        setErrorMessages([])
        resolve()
      } catch (e) {
        setErrorMessages(["No se pueden agregar datos, error del servidor"])
        console.log('eerr ---', e)
        resolve()
      }

      /*api.post("url", newData)
        .then(res => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setErrorMessages(["No se pueden agregar datos, error del servidor"])
          setIserror(true)
          resolve()
        })*/
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }


  }

  const handleRowDelete = async (oldData, resolve) => {
    try {
      await axios.delete(apiURL + `delete/${oldData.id}`);

      const dataDelete = [...data];
      const index = dataDelete.findIndex(item => item.id === oldData.id)
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
      setErrorMessages([])
      setIserror(false)
      resolve()
    } catch (e) {
      setErrorMessages(["La eliminación falló, error del servvidor"])
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
         setErrorMessages(["La eliminación falló, error del servvidor"])
         setIserror(true)
         resolve()
       })*/
  }


  return (<>
    <Navbar />
    <div className="Registros2">

      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  </>);
}

export default Registros2;