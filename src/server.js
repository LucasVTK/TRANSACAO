

import express from 'express'
import sql from 'mssql'
import clientRoutes from './routes/clientRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const port = process.env.PORT
const strConn = process.env.CONNECTION_STRING

const app = express()
app.use(express.json())


app.use('/admin',clientRoutes)
app.use('/admin',orderRoutes)


app.get('/',(req,res)=>{
    res.status(200).json({server:'ok',port:port})
})

app.listen(port,()=>{
    console.log("Servidor rodando")
})