create database germina_db;
use germina_db;

CREATE TABLE respostas (
    idResposta INT AUTO_INCREMENT PRIMARY KEY,
    pergunta INT,
    resposta INT
);

SELECT * FROM germina_db.respostas;