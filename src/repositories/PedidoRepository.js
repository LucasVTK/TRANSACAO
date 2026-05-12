import { getConn, getPool } from "../database/connection.js";
import sqltype from "mssql";

const PedidoRepository = {
  async getAll() {
    try {
      const conn = await getConn();
      const sql = `select * from pedido`;
      const { recordset } = await conn.request().query(sql);
      conn.close();
      return recordset;
    } catch (e) {
      return e;
    }
  },

  async update(id, m) {
    const conn = await getConn();
    const trans = new sqltype.Transaction(conn);

    try {
      await trans.begin();
      const request = new sqltype.Request(trans);
      const request1 = new sqltype.Request(trans);

      const sql = `UPDATE PEDIDO SET id_cliente = @pidc,
      forma_pagamento = @pforma,
      status_pagamento = @pstatus
      where id = @idp`;

      const respostaPedido = await request
        .input('pidc', sqltype.Int, m.id_cliente)
        .input('pforma', sqltype.VarChar(7), m.forma_pagamento)
        .input('pstatus', sqltype.VarChar(10), m.status_pagamento)
        .input('idp', sqltype.Int, m.id)
        .query(sql);

      const sql2 = `delete from ITEM_PEDIDO where id_pedido = @idp`;
      const dels = await request1
        .input('idp', sqltype.Int, m.id)
        .query(sql2);

      const values = m.itens_pedido.map((it, i) =>
        `(@id_ped, @id_prod${i}, @punit${i}, @quant${i}, @ava${i})`
      );

      const sql3 = `INSERT INTO ITEM_PEDIDO
      (ID_PEDIDO, ID_PRODUTO, preco_unitario, quantidade, avaliacao) VALUES ` + values.join(',');

      request.input('id_ped', sqltype.Int, m.id);

      m.itens_pedido.forEach((it, i) => {
        request
          .input(`id_prod${i}`, sqltype.Int, it.id_produto)
          .input(`punit${i}`, sqltype.Numeric(6, 2), it.preco_unitario)
          .input(`quant${i}`, sqltype.Int, it.quantidade)
          .input(`ava${i}`, sqltype.Int, it.avaliacao);
      });

      const itens = await request.query(sql3);

      await trans.commit();

      return {
        ok: true,
        id_pedido: m.id,
        qtd_itens: m.itens_pedido.length,
        data: m
      };

    } catch (e) {
      await trans.rollback();
      return e;
    }
  },

  async create(m) {
    const conn = await getConn();
    const trans = new sqltype.Transaction(conn);

    try {
      await trans.begin();
      const request = new sqltype.Request(trans);

      const sql = `INSERT INTO PEDIDO 
        (id_cliente, data_pedido, forma_pagamento, status_pagamento)
        VALUES (@pidc, @pdata, @pforma, @pstatus)`;

      const resped = await request
        .input('pidc', sqltype.Int, m.id_cliente)
        .input('pdata', sqltype.DateTime, m.data_pedido)
        .input('pforma', sqltype.VarChar(7), m.forma_pagamento)
        .input('pstatus', sqltype.VarChar(10), m.status_pagamento)
        .query(sql);

      const sql2 = `select IDENT_CURRENT('PEDIDO') as newid`;
      const newid = (await request.query(sql2)).recordset[0].newid;

      const values = m.itens_pedido.map((it, i) =>
        `(@id_ped, @id_prod${i}, @punit${i}, @quant${i}, @ava${i})`
      );

      const sql3 = `INSERT INTO ITEM_PEDIDO
      (ID_PEDIDO, ID_PRODUTO, preco_unitario, quantidade, avaliacao)
        VALUES ` + values.join(',');

      request.input('id_ped', sqltype.Int, newid);

      m.itens_pedido.forEach((it, i) => {
        request
          .input(`id_prod${i}`, sqltype.Int, it.id_produto)
          .input(`punit${i}`, sqltype.Numeric(6, 2), it.preco_unitario)
          .input(`quant${i}`, sqltype.Int, it.quantidade)
          .input(`ava${i}`, sqltype.TinyInt, it.avaliacao);
      });

      const itens = await request.query(sql3);

      await trans.commit();

      return { ok: true, id_pedido: newid, qtd_itens: m.itens_pedido.length };

    } catch (e) {
      await trans.rollback();
      return e;
    }
  }
};

export default PedidoRepository;