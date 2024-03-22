create database ids_db;
use ids_db;

CREATE TABLE respostas (
    idResposta INT AUTO_INCREMENT PRIMARY KEY,
    pergunta INT,
    resposta INT
);

SELECT * FROM ids_db.respostas;