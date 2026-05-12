-- Criar o banco de dados apenas se não existir
CREATE DATABASE loja_virtual
GO
-- Selecionar o banco
USE loja_virtual
GO
-- Criação das tabelas
CREATE TABLE cliente (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(32),
)
GO
CREATE TABLE produto (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(150),
    descricao TEXT,
    preco NUMERIC(6,2)
)
GO
CREATE TABLE imagem (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    link VARCHAR(3000) NOT NULL,
    id_produto INT NULL,
    CONSTRAINT fk_imagem_pedido FOREIGN KEY (id_produto) REFERENCES produto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
GO
CREATE TABLE pedido (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente INT,
    data_pedido DATETIME,
    total NUMERIC(6,2),
    forma_pagamento VARCHAR(7) CHECK( forma_pagamento IN ('pix','debito','credito','especie')) NOT NULL,
    status_pagamento VARCHAR(10) CHECK(status_pagamento IN ('pago','aguardando')) NOT NULL,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
GO
CREATE TABLE item_pedido (
    id_pedido INT,
    id_produto INT,
    preco_unitario NUMERIC(6,2),
    quantidade INT,
    preco_total NUMERIC(6,2),
    avaliacao TINYINT NULL CHECK(avaliacao>=1 and avaliacao<=5),
    PRIMARY KEY (id_pedido, id_produto),
    CONSTRAINT fk_item_pedido_produto FOREIGN KEY (id_produto) REFERENCES produto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_item_pedido_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) 
GO
-- Inserção de clientes
INSERT INTO cliente (nome, email, senha) VALUES
('Maria Oliveira', 'maria.oliveira@example.com', 'senha123'),
('João Silva', 'joao.silva@example.com', 'minhasenha'),
('Ana Souza', 'ana.souza@example.com', 'abc123'),
('Carlos Mendes', 'carlos.mendes@example.com', 'pass2025'),
('Fernanda Costa', 'fernanda.costa@example.com', 'minha123');

-- Inserção de produtos
INSERT INTO produto (titulo, descricao, preco) VALUES
('Notebook Dell Inspiron', 'Notebook com processador i7 e 16GB RAM', 4500.00),
('Smartphone Samsung Galaxy S21', 'Celular Samsung Galaxy S21 com 128GB', 3500.00),
('Mouse Gamer Logitech', 'Mouse com 6 botões e iluminação RGB', 250.00),
('Teclado Mecânico Redragon', 'Teclado com switches vermelhos e iluminação RGB', 320.00),
('Monitor LG UltraWide', 'Monitor 29" UltraWide Full HD', 1250.00);
GO
-- Inserção de imagens (associadas a produtos)
INSERT INTO imagem (titulo, descricao, link, id_produto) VALUES
('Imagem Notebook', 'Foto do Notebook Dell Inspiron', 'https://imgs.casasbahia.com.br/55066981/1g.jpg', 1),
('Imagem Smartphone', 'Foto do Samsung Galaxy S21', 'https://samsungbrshop.vtexassets.com/arquivos/ids/222466/image-147812a827ce414cbeecb5bb91eecb25-1-.jpg', 2),
('Imagem Mouse', 'Foto do Mouse Gamer Logitech', 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/ejiiumos/file.png', 3),
('Imagem Teclado', 'Foto do Teclado Mecânico Redragon', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXX5WhB0_dFzLYwbEQsMORDUdD8bV2WxXkkg&s', 4),
('Imagem Monitor', 'Foto do Monitor LG UltraWide', 'https://www.lg.com/content/dam/channel/wcms/br/images/monitores/25um58g-p_awz_essp_br_c/gallery/Z04_DZ_04.jpg', 5);
GO
-- Inserção de pedidos
INSERT INTO pedido (id_cliente, data_pedido, total, forma_pagamento, status_pagamento) VALUES
(1, '10-10-2025 14:30:00', 4750.00, 'credito', 'pago') 
GO
INSERT INTO pedido (id_cliente, data_pedido, total, forma_pagamento, status_pagamento) VALUES
(2, '11-08-2015 09:15:00', 3500.00, 'pix', 'aguardando')  
GO
INSERT INTO pedido (id_cliente, data_pedido, total, forma_pagamento, status_pagamento) VALUES
(3, '12-08-2025 18:45:00', 1570.00, 'debito', 'pago')  
GO
INSERT INTO pedido (id_cliente, data_pedido, total, forma_pagamento, status_pagamento) VALUES
(1, '13-08-2025 11:20:00', 250.00, 'especie', 'pago')  
GO
-- Inserção de itens dos pedidos
INSERT INTO item_pedido (id_pedido, id_produto, preco_unitario, quantidade, preco_total, avaliacao) VALUES
(1, 1, 4500.00, 1, 4500.00, 5),
(1, 3, 250.00, 1, 250.00, 4),
(2, 2, 3500.00, 1, 3500.00, NULL),
(3, 4, 320.00, 2, 640.00, 5),
(3, 5, 1250.00, 1, 1250.00, 4),
(4, 3, 250.00, 1, 250.00, NULL);
GO