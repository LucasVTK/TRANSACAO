import sql from 'mssql' 
const strConnSQLServer = process.env.CONNECTION_STRING

const configSQLServer = {
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    server:process.env.DB_SERVER,
    database:process.env.DB_BASE,
    port:parseInt(process.env.DB_PORT),
    options:{
        trustServerCertificate:true,
        trustedConnection: false,
        enableArithAbort:true,
        encrypt:false,
    }
}

export async function getConn(){
   const conn = await sql.connect(configSQLServer)
   return conn
}

export async function getPool(){
   const conn = new sql.ConnectionPool(configSQLServer)
   return conn
}