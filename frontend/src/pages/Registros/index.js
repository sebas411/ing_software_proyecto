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
  { id: "", Nombre: "", tipo: "", cantidad: "", Fecha: "" },
];

class Registros extends React.Component {
  state = {
    Registro: Registro,
    modalActualizar: false,
    modalInsertar: false,
    transactions: [],
    form: {
      id: "",
      Nombre: "",
      tipo: "",
      cantidad: "",
      Fecha: ""
    },
  };

  componentDidMount() {
    this.getAllTransactions()
  }

  getAllTransactions() {
    axios.get('localhost:8000/transactions').then(res => {
      this.setState({ ...this.state, transactions: res.data })
      console.log('res ===', res)
    }, (error) => {
      console.log('There was a mistake here', error)
    })
  }

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

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.Registro;
    arreglo.forEach((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].Nombre = dato.Nombre;
        arreglo[contador].tipo = dato.tipo;
        arreglo[contador].cantidad = dato.cantidad;
        arreglo[contador].Fecha = dato.Fecha;
      }
      contador++;
    });
    axios.put(`/transactions/update/${dato.id}`, this.state.form).then(res => {
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
      axios.delete(`/transactions/delete${dato.id}`).then(res => {
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
    axios.post("/transactions/create", this.state.form).then(res => {
      console.log('saved successfully')
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
              <br />
              <Button color="success" onClick={() => this.mostrarModalInsertar()}>Ingresar registro</Button>
              <br />
              <br />
              <Table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>tipo</th>
                    <th>cantidad</th>
                    <th>Fecha</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.transactions.map((dato) => (
                    <tr key={dato.id_cancion}>
                      <td>{dato.id}</td>
                      <td>{dato.Nombre}</td>
                      <td>{dato.tipo}</td>
                      <td>{dato.cantidad}</td>
                      <td>{dato.Fecha}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          Editar
                        </Button>{" "}
                        <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>

            <Modal isOpen={this.state.modalActualizar}>
              <ModalHeader>
                <div><h3>Editar Registro</h3></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label>
                    Id:
                  </label>

                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.form.id}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Nombre:
                  </label>
                  <input
                    className="form-control"
                    name="Nombre"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.Nombre}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    tipo:
                  </label>
                  <input
                    className="form-control"
                    name="tipo"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.tipo}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    cantidad:
                  </label>
                  <input
                    className="form-control"
                    name="cantidad"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.cantidad}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Fecha:
                  </label>
                  <input
                    className="form-control"
                    name="Fecha"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.Año}
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
                  <label>
                    Id:
                  </label>

                  <input
                    className="form-control"
                    //readOnly
                    name="id"
                    type="text"
                    //value={this.state.Registro.length+1}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Nombre:
                  </label>
                  <input
                    className="form-control"
                    name="Nombre"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    tipo:
                  </label>
                  <input
                    className="form-control"
                    name="tipo"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    cantidad:
                  </label>
                  <input
                    className="form-control"
                    name="cantidad"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Fecha:
                  </label>
                  <input
                    className="form-control"
                    name="Fecha"
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
                  onClick={() => this.cerrarModalInsertar()}
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
