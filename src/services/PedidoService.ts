import { Pedido } from '../types/Pedido';

const BASE_URL = 'http://localhost:8080/api/v1';

export const PedidoService = {
	//Aquí adentro vamos a declarar los métodos
    getPedidos: async (): Promise<Pedido[]> => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/pedidos/getAll`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    },

    getPedido: async (id: number): Promise<Pedido> => {

        const response = await fetch(`${BASE_URL}/pedidos/${id}`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
            },
        });
            const data = await response.json();
            return data;
    },
    createPedido: async (pedido: Pedido): Promise<Pedido> => {
        const response = await fetch(`${BASE_URL}/pedidos`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });
        const data = await response.json();
        return data;
    },

    updatePedido: async (id: number, pedido: Pedido): Promise<Pedido> => {
        const response = await fetch(`${BASE_URL}/pedidos/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });
        const data = await response.json();
        return data;
    },
    deletePedido: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/pedidos/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
    }
};
