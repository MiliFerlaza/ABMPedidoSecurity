import { DetalleFactura } from "./DetalleFactura";

export interface Factura{
    id: number;
    fechaFacturacion: String;
    mpPaymentId: number;
    mpPaymentType: String;
    totalVenta: BigInt;
    detalleFactura: Array<DetalleFactura>;
}