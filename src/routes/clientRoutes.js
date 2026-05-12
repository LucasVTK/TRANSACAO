import { Router } from "express";
import { allClients, allClientsWithOrders, getClientById} from "../controllers/ClientController.js";


const clientRoutes = Router()
clientRoutes.get('/clientes',allClients)
clientRoutes.get('/clientesComPedidos',allClientsWithOrders)
clientRoutes.get('/clientes/:id',getClientById)




export default clientRoutes