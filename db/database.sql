create database portfolio;
use portfolio;

create table opinions(
idOpinion int primary key auto_increment,
name varchar(40),
location varchar(40),
opinion varchar(211),
calificacion int
);
