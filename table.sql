CREATE DATABASE apousiologia;
USE apousiologia;

CREATE TABLE apousiologio1(
    id integer PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    tmima VARCHAR(10) NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT NOW()
    );

INSERT INTO apousiologio1 (firstName, lastName,tmima)
VALUES
('Elias','Mamalakis','g1'),
('Mpampis','Loulas','g2');
