CREATE DATABASE {{ DATABASE }};

USE {{ DATABASE }}

CREATE TABLE rivalidades
(
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Categoria VARCHAR(50),
    Opcao VARCHAR(50),
    NCategoria INT NOT NULL,
    NOpcao INT NOT NULL,
    Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Votos INT NOT NULL
);

INSERT INTO rivalidades
(Categoria, Opcao)
VALUES
("Heróis", "DC Comics");

INSERT INTO rivalidades
(Categoria, Opcao)
VALUES
("Heróis", "Marvel Comics");

INSERT INTO rivalidades
(Categoria, Opcao)
VALUES
("Pets", "Cachorro");

INSERT INTO rivalidades
(Categoria, Opcao)
VALUES
("Pets", "Gato");

INSERT INTO rivalidades
(Categoria, Opcao)
VALUES
("Achocolatados", "Nescau");

INSERT INTO rivalidades
(Categoria, Opcao)
VALUES
("Achocolatados", "Tody");

CREATE TABLE usuarios
(
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(80),
    Telefone VARCHAR(50),
    Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Atualizacao DATETIME,
    etapa INT NOT NULL
);

CREATE TABLE registro
(
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    IdUsuario INT NOT NULL,
    IdVoto INT NOT NULL,
    Criacao DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE espera
(
    IdUsuario INT NOT NULL,
    IdVoto INT NOT NULL
);

CREATE USER {{ USER }}@{{ HOST }} IDENTIFIED WITH mysql_native_password BY {{ PASSWORD }};

GRANT ALL PRIVILEGES ON mydatabase.* TO {{ USER }}@{{ HOST }};