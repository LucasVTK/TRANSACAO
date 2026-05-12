import sql from 'mssql'
import { getConn } from "../database/connection.js";


export async function getAll(){
    try{
        const conn = await getConn()
        const sql = `select * from cliente`
        const {recordset} = await conn.request().query(sql)
        conn.close()
        return recordset
    }catch(e){
        console.log(e)
        return e
    }
}

//CONSULTAS QUE EVITAM N+1 COM DBSERVER E COM BACKEND (CUSTO: PROCESSAMENTO SERVIDOR NODE)

//Cliente com pedidos por id
export async function getById(id){

    const conn = await getConn()
    const {recordset} = await conn.request()
    .input('xjj',sql.Int,id)
    .query('select c.id as id_cliente, c.nome, c.email,p.id as id_pedido, data_pedido, total,forma_pagamento, status_pagamento from cliente as c inner join pedido as p on c.id = p.id_cliente where c.id=@xjj')
    const cliente = {
        id_cliente: recordset[0].id_cliente,
        nome: recordset[0].nome,
        email: recordset[0].email,
        pedidos: recordset.map(ped=>{
            return {
                id_pedido: ped.id_pedido,
                data_pedido: ped.data_pedido,
                total:ped.total,
                forma_pagamento:ped.forma_pagamento, 
                status_pagamento:ped.status_pagamento
                }
        })
    }
   return cliente

}
//clientes com pedidos
export async function allClientsWithOrder(){
    const conn = await getConn()
    const {recordset} = await conn.request()
    .query('select c.id as id_cliente, c.nome, c.email,p.id as id_pedido, data_pedido, total,forma_pagamento, status_pagamento from cliente as c inner join pedido as p on c.id = p.id_cliente')
    const unicos = new Map()
    recordset.forEach((d)=>{
        if(!unicos.has(d.id_cliente)){
            unicos.set(d.id_cliente,
                {
                    id_cliente: d.id_cliente,
                    nome: d.nome,
                    email: d.email
                }
            )
        }
    })
    const clientes = [...unicos.values()]
    const clientesComPedidos = clientes.map(d=>{
        const pedidos = recordset.filter(p=>p.id_cliente == d.id_cliente)
        const pedFormat = pedidos.map(ped=>{
            return {
                 id_pedido: ped.id_pedido,
                 data_pedido: ped.data_pedido,
                 total:ped.total,
                 forma_pagamento:ped.forma_pagamento, 
                 status_pagamento:ped.status_pagamento
                }
        })
        return {...d,pedidos:pedFormat}
    })
   return clientesComPedidos
}



