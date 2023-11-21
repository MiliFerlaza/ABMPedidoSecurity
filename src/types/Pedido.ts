type EstadoPedido = ''|'PENDIENTE_PAGO'|'PAGADO'|'PREPARACION'|'PENDIENTE_ENTREGA'|'EN_CAMINO'|'CANCELADO'|'NOTA_CREDITO'|'COMPLETADO';
type FormaPago = '' | 'EFECTIVO'|'MERCADO_PAGO';
type TipoEnvio =''|'TAKE_AWAY'|'DELIVERY';

export interface Pedido{
    id: number;
    fechaPedido: string;
    horaEstimadaFinalizacion: string;
    total: number;
    estado: EstadoPedido;
    formaPago: FormaPago;
    tipoEnvio: TipoEnvio;
   
}