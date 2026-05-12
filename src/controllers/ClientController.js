import { getAll,getById,allClientsWithOrder } from "../repositories/ClientRepository.js";

export async function allClients(req,res){
    const clientes = await getAll()
    res.json(clientes)
}
export async function allClientsWithOrders(req,res){
    const clientes = await allClientsWithOrder()
    res.json(clientes)
}
export async function getClientById(req,res){
    const id = req.params.id
    const clientes = await getById(id)
    res.json(clientes)
}

