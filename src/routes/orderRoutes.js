import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const orderRoutes = Router()

orderRoutes.get('/pedidos',OrderController.todos)
orderRoutes.post('/pedidos/create',OrderController.insert)
orderRoutes.put('/pedidos/edit',OrderController.update )



export default orderRoutes