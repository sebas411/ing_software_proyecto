import React from "react";
import axios from 'axios'
import "./Registros.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../../components/Navbar'
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const Registro = [
  { id: "", creation_date: "", confirmed: "", amount: "", title: "", details: "" },
];

const apiURL = 'http://127.0.0.1:8000/transactions/';

class Registros extends React.Component {
  state = {
    Registro: Registro,
    modalActualizar: false,
    modalInsertar: false,
    modalInsertars: false,
    transactions: [],
    form: {
      id: "",
      creation_date: "",
      confirmed: "false",
      amount: "",
      title: "",
      details: "",
      subtitle : ""
    },
  };

  componentDidMount() {
    this.getAllTransactions()
  }

  getAllTransactions() {
    //console.log('Im trying to fetch');
    axios.get(apiURL).then(res => {
      this.setState({ ...this.state, transactions: res.data })
      //console.log('response :', res)
    }, (error) => {
      console.log('There was a mistake here', error)
    })
  }
  /*getAllTransactions() {
    fetch('localhost:8000/transactions')
    .then(response =>  response.json())
    .then (data => console.log( 'Data' ,data)
      )
    this.setState({ ...this.state, transactions: response.data });
      
  }*/

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  mostrarModalInsertars = () => {
    this.setState({
      modalInsertars: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  cerrarModalInsertars = () => {
    this.setState({ modalInsertars: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.Registro;
    console.log('trying to update');
    console.log(dato);
    arreglo.forEach((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].title = dato.title;
        arreglo[contador].subtitle = dato.subtitle;
        arreglo[contador].details = dato.details;
        arreglo[contador].amount = dato.amount;
        arreglo[contador].creation_date = dato.creation_date;

      }

      contador++;
    });
    axios.post(apiURL + `update/${dato.id}`, this.state.form).then(res => {
      console.log('update succesfully')
      this.getAllTransactions();
    })
    this.setState({ Registro: arreglo, modalActualizar: false });

  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion) {
      var contador = 0;
      var arreglo = this.state.Registro;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      axios.delete(apiURL + `delete/${dato.id}`).then(res => {
        console.log('item deleted')
        this.getAllTransactions()
      })
      this.setState({ Registro: arreglo, modalActualizar: false });
    }
  };



  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.Registro.length + 1;
    var lista = this.state.Registro;
    axios.post(apiURL + "create/", this.state.form).then(res => {
      console.log('INSERT : ')
      console.log(valorNuevo)
      // after creating a transaction, we also need to fetch all transactions, so that our new transaction
      // would be visible in the front-end
      this.getAllTransactions(); // this will re-fetch tall the transactions
    })
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, Registro: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

    return (
      <div className="Registros">
        <Navbar />

        <div className="table-responsive">
          <>
            <Container>

              <div className="date-picker-container">
                <div className="refresh">{"⟳"}</div>

                <div className="date-picker">
                  FROM :
                  <div>
                    <input type="date" id="start" name="date-start"
                      min="2020-01-01" max="2021-12-31">

                    </input>
                  </div>

                  TO :

                  <div>
                    <input type="date" id="end" name="date-start"
                      min="2020-01-01" max="2021-12-31">
                    </input>
                  </div>
                </div>

                <div style={{ display: "flex", "flex-direction": "row", width: "55%" }}>

                  <Button color="success" onClick={() => this.mostrarModalInsertar()}>Ingresar registro</Button>
                </div>


              </div>
              <Table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Subtitulo</th>
                    <th>Detalles</th>
                    <th>Cantidad</th>
                    <th>Revisado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.transactions.map((dato) => (
                    <tr key={dato.id}>
                      <td>{dato.id}</td>
                      <td>{dato.title}</td>
                      <td> {dato.subtitle}</td>
                      <td>{dato.details}</td>
                      <td className={dato.title === "Venta" ? "income" : "expense"}>
                        {dato.title === "Venta" ? dato.amount : (-1 * dato.amount)}
                      </td>
                      <td className="check"> {dato.confirmed ? "✓" : ""}</td>

                      <td>{dato.creation_date}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          ✎
                        </Button>{" "}
                        <Button color="danger" onClick={() => this.eliminar(dato)}> X </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>

            <Modal isOpen={this.state.modalActualizar}>
              <ModalHeader>
                <div><h3>Editar Registro   {this.state.form.id} </h3></div>
              </ModalHeader>

              <ModalBody>


                <FormGroup>
                  <label className="bold">
                    Tipo:
                  </label>
                  <div>
                    <input type="radio" id="Venta" value="Venta" name="title" onChange={this.handleChange} />
                    Venta <br />
                    <input type="radio" id="Gasto" value="Gasto" name="title" onChange={this.handleChange} />
                    Gasto
                  </div>
                </FormGroup>

                <FormGroup>
                  <label className="bold">
                    Subtitulo:
                  </label>
                  <input
                    className="form-control"
                    name="subtitle"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.subtitle}
                  />
                </FormGroup>


                <FormGroup>
                  <label className="bold">
                    Detalles:
                  </label>
                  <input
                    className="form-control"
                    name="details"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.details}
                  />
                </FormGroup>

                <FormGroup>
                  <label className="bold">
                    Cantidad:
                  </label>
                  <input
                    className="form-control"
                    name="amount"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.amount}
                  />
                </FormGroup>

                <FormGroup>
                  <label className="bold">
                    Fecha:
                  </label>
                  <input
                    className="form-control"
                    type="date" id="start" name="creation_date"
                    min="2020-01-01" max="2021-12-31"
                    onChange={this.handleChange}
                    value={this.state.form.creation_date}
                  />


                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.editar(this.state.form)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.cerrarModalActualizar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>



            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader>
                <div><h3>Insertar Registro</h3></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label className="bold">
                    Tipo:
                  </label>


                  <div>
                    <input type="radio" id="Venta" value="Venta" name="title" onChange={this.handleChange} />
                    Venta <br />
                    <input type="radio" id="Gasto" value="Gasto" name="title" onChange={this.handleChange} />
                    Gasto
                  </div>
                  <br />

                </FormGroup>

                
                <FormGroup>
                  <label className="bold">
                    Subtitulo:
                  </label>
                  <input
                    className="form-control"
                    name="subtitle"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>


                <FormGroup>
                  <label className="bold">
                    Detalles:
                  </label>
                  <input
                    className="form-control"
                    name="details"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                



                <FormGroup>
                  <label className="bold">
                    Cantidad:
                  </label>
                  <input
                    className="form-control"
                    name="amount"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label className="bold">
                    Fecha:
                  </label>
                  <input
                    className="form-control"
                    type="date" id="start" name="creation_date"
                    min="2020-01-01" max="2021-12-31"
                    onChange={this.handleChange}
                  >
                  </input>

                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.insertar()}
                >
                  Insertar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => this.cerrarModalInsertar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </>
        </div>

        

        <div className="table-responsive">
          <>
            <Container>

              <div className="date-picker-container">

                <div style={{ display: "flex", "flex-direction": "row", width: "55%" }}>

                  <Button color="success" onClick={() => this.mostrarModalInsertars()}>Ingresar saldo conciliado</Button>
                </div>


              </div>
              <Table>

                <thead>
                  <tr>
                    <th>Saldo total</th>
                    <th>Saldo conciliado</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.transactions.map((dato) => (
                    <tr key={dato.id}>
                      <td>{dato.title}</td>
                      <td>{dato.details}</td>
                      <td className={dato.title === "Venta" ? "income" : "expense"}>
                        {dato.title === "Venta" ? dato.amount : (-1 * dato.amount)}
                      </td>
                      <td className="check"> {dato.confirmed ? "✓" : ""}</td>

                      <td>{dato.creation_date}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          ✎
                        </Button>{" "}
                        <Button color="danger" onClick={() => this.eliminar(dato)}> X </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>


            
            
           

            <Modal isOpen={this.state.modalInsertars}>
              <ModalHeader>
                <div><h3>Insertar saldo conciliado</h3></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label className="bold">
                    Saldo conciliado:
                  </label>
                  <input
                    className="form-control"
                    name="details"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.insertar()}
                >
                  Insertar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => this.cerrarModalInsertars()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </>
        </div>
      </div>



    );
  }
}
export default Registros;
