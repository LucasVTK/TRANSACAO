use loja_virtual

select * from pedido;
select * from imagem;
select * from cliente;

select * from pedido where nome = 'maria'

-- Links das fotos dos produtos 'notebook'
select i.link from imagem as i join produto as p
on i.id_produto = p.id
where p.titulo like 'Notebook%';
-- Clientes copm seus pedidos
select c.id as id_cliente, c.nome, c.email,p.id as id_pedido, data_pedido, total,forma_pagamento, status_pagamento from cliente as c inner join pedido as p on c.id = p.id_cliente where c.id=1

-- PAGINAÇÃO
SELECT * 
FROM cliente
ORDER BY id
OFFSET 1 ROWS
FETCH NEXT 2 ROWS ONLY;
