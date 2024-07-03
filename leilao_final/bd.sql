CREATE TABLE Usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Itens
CREATE TABLE Itens (
    item_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    lance_inicial DECIMAL(10, 2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabela de Leilões
CREATE TABLE Leiloes (
    leilao_id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    inicio_em TIMESTAMP NOT NULL,
    fim_em TIMESTAMP NOT NULL,
    lance_atual DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (item_id) REFERENCES Itens(item_id)
);

-- Tabela de Lances
CREATE TABLE Lances (
    lance_id SERIAL PRIMARY KEY,
    leilao_id INT NOT NULL,
    usuario_id INT NOT NULL,
    valor_lance DECIMAL(10, 2) NOT NULL,
    momento_lance TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (leilao_id) REFERENCES Leiloes(leilao_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Adicionar índices
CREATE INDEX idx_usuario_id ON Itens(usuario_id);
CREATE INDEX idx_item_id ON Leiloes(item_id);
CREATE INDEX idx_leilao_id ON Lances(leilao_id);
CREATE INDEX idx_usuario_id_lance ON Lances(usuario_id);