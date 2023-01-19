-- Database para la App Completa --
create database lodelo;

-- Selecciono la Database -- 
use lodelo;

-- Creamos la tabla como comprar para la App Completa --
create table comocomprar(
idProducto int unsigned not null auto_increment,
articulo varchar(150) not null,
precio int not null,
comentarios varchar(200) not null,
primary key (idProducto)
);

-- Creamos la tabla Contacto para la App Completa --
create table contacto(
idContacto int unsigned not null auto_increment,
nombre varchar(150) not null,
email varchar(150) not null,
primary key (idContacto)
);
