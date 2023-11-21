import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PedidoService } from "../../services/PedidoService";
//notif al usuario
import { toast } from 'react-toastify';
import { Pedido } from "../../types/Pedido";




type PedidoModalProps = {
    show: boolean;
    onHide: () => void;
    title: string
    modalType: ModalType;
    ped: Pedido;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const PedidoModal = ({ show, onHide, title, modalType, ped, refreshData }: PedidoModalProps) => {

    
    //CREATE - UPDATE
    const handleSaveUpdate = async (ped: Pedido) => {
        try {
            const isNew = ped.id === 0;
            if (isNew) {
                await PedidoService.createPedido(ped);
            } else {
                await PedidoService.updatePedido(ped.id, ped);
            }
            toast.success(isNew ? "Pedido Creado" : "Pedido Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    };
    //DELETE
    const handleDelete = async () => {
        try {
            await PedidoService.deletePedido(ped.id);
            toast.success("Pedido Borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    }


    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            fechaPedido: Yup.string().required('La fecha del pedido es requerida'),
            horaEstimadaFinalizacion: Yup.string().required('La hora estimada de finalizacion es requerida'),
            total: Yup.string().required('El total es requerido'),
            estado: Yup.string().oneOf(['PENDIENTE_PAGO','PAGADO','PREPARACION','PENDIENTE_ENTREGA','EN_CAMINO','CANCELADO','NOTA_CREDITO','COMPLETADO'],'Estado no válido').required('El estado es requerido'),
            formaPago: Yup.string().oneOf(['EFECTIVO', 'MERCADO_PAGO'], 'Forma de pago no válida').required('La forma de pago es requerida'),
            tipoEnvio: Yup.string().oneOf(['DELIVERY', 'TAKE_AWAY'],'Tipo de envío no válido').required('El tipo de envio es requerido'),
        });
    };
    const formik = useFormik({
        initialValues: ped,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Pedido) => handleSaveUpdate(obj),
    });




    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Está seguro que desea eliminar el Pedido?<br /> <strong>{ped.id}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Borrar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </>
            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                            <Form onSubmit={formik.handleSubmit}>
                                
                                <Form.Group controlId="formFechaPedido">
                                    <Form.Label>Fecha de Pedido</Form.Label>
                                    <Form.Control
                                        name="fechaPedido"
                                        type="text"
                                        value={formik.values.fechaPedido || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.fechaPedido && formik.touched.fechaPedido)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.fechaPedido} 
                                    </Form.Control.Feedback>
                                </Form.Group>

                                
                                <Form.Group controlId="formHoraEstimadaFinalizacion">
                                    <Form.Label>Hora de Finalizacion</Form.Label>
                                    <Form.Control
                                        name="horaEstimadaFinalizacion"
                                        type="text"
                                        value={formik.values.horaEstimadaFinalizacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.horaEstimadaFinalizacion && formik.touched.horaEstimadaFinalizacion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.horaEstimadaFinalizacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                
                                <Form.Group controlId="formTotal">
                                    <Form.Label>Total</Form.Label>
                                    <Form.Control
                                        name="total"
                                        type="text"
                                        value={formik.values.total || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.total && formik.touched.total)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.total}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                
                                <Form.Group controlId="formEstado">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select                                        
                                        name="estado"                                  
                                        onChange={formik.handleChange}
                                        id="estado"
                                        value={formik.values.estado || ''}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.estado && formik.touched.estado)}                                       
                                    >               
                                        <option></option>                    
                                        <option>
                                            PENDIENTE_PAGO
                                        </option>   
                                        <option>
                                            PAGADO
                                        </option>
                                        <option>
                                            PREPARACION
                                        </option>
                                        <option>
                                            PENDIENTE_ENTREGA
                                        </option>
                                        <option>
                                            EN_CAMINO
                                        </option>
                                        <option>
                                            CANCELADO
                                        </option>
                                        <option>
                                            NOTA_CREDITO
                                        </option>  
                                        <option>
                                            COMPLETADO
                                        </option>            
                                         
                                    </Form.Select>
                                                                           
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.estado}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formFormaPago">
                                    <Form.Label>Forma de pago</Form.Label>
                                    <Form.Select                                        
                                        name="formaPago"                                  
                                        onChange={formik.handleChange}
                                        id="formaPago"
                                        isInvalid={Boolean(formik.errors.formaPago && formik.touched.formaPago)}  
                                        onBlur={formik.handleBlur}
                                        value={formik.values.formaPago || ''}
                                                                         
                                    >               
                                        <option></option>                    
                                        <option>
                                            EFECTIVO
                                        </option>   
                                        <option>
                                            MERCADO_PAGO
                                        </option>       
                                         
                                    </Form.Select>
                                                                           
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.formaPago}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formTipoEnvios">
                                    <Form.Label>Tipo de Envio</Form.Label>
                                    <Form.Select                                        
                                        name="tipoEnvio"                                  
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        id="tipoEnvio"
                                        value={formik.values.tipoEnvio || ''}
                                        isInvalid={Boolean(formik.errors.tipoEnvio && formik.touched.tipoEnvio)}                                       
                                    >               
                                        <option></option>                    
                                        <option>
                                            DELIVERI
                                        </option>   
                                        <option>
                                            TAKE_AWAY
                                        </option>
                                                
                                         
                                    </Form.Select>
                                                                           
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.tipoEnvio}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}>
                                        Cancelar
                                    </Button>

                                    <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                        Guardar
                                    </Button>

                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    )
}

export default PedidoModal;