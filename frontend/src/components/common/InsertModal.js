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

const InsertModal = ({showModal, handleChange}) => {
    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                <div><h3>Insertar Registro</h3></div>
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                    <label className="bold">
                        Tipo:
                    </label>
                    <div>
                        <input type="radio" id="Venta" value="Venta" name="title" onChange={handleChange} />
                        Venta <br />
                        <input type="radio" id="Gasto" value="Gasto" name="title" onChange={handleChange} />
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
    )
}
export default InsertModal