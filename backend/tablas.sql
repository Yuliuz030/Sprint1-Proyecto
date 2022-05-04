DROP TABLE IF EXISTS marca; 
DROP TABLE IF EXISTS linea_vehiculos; 
DROP TABLE IF EXISTS vehiculos; 

CREATE TABLE marcas(
    id INT UNSIGNED AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    CONSTRAINT `pk_id_marcas` PRIMARY KEY(id)
);

CREATE TABLE lineas_vehiculo(
    id INT UNSIGNED AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    id_marca2 INT UNSIGNED NOT NULL,
    CONSTRAINT `pk_id_lineas_vehiculos` PRIMARY KEY(id),
    CONSTRAINT `fk_id_marca2_lineas_vehiculos` FOREIGN KEY (id_marca2) REFERENCES marcas(id)
);
    ALTER TABLE lineas_vehiculo ADD CONSTRAINT `fk_id_vehiculo2_lineas_vehiculos` FOREIGN KEY (id_vehiculo2) REFERENCES vehiculo(id)

    CREATE TABLE vehiculo(
    id INT UNSIGNED AUTO_INCREMENT,
    placa VARCHAR(12) NOT NULL,
    modelo INT NOT NULL,
    color VARCHAR(30) NOT NULL,
    fv_seguro DATE NOT NULL,
    fv_tecnomecanica DATE NOT NULL,
    id_marca1 INT UNSIGNED NOT NULL,
    CONSTRAINT `pk_id_vehiculo` PRIMARY KEY(id),
    CONSTRAINT `fk_id_marca1_vehiculo` FOREIGN KEY (id_marca1) REFERENCES marcas(id)
    CONSTRAINT `fk_id_linea1_vehiculo` FOREIGN KEY (id_linea1) REFERENCES lineas_vehiculo(id)
);
    INSERT INTO `marcas` (id, nombre, descripcion, estado) VALUES
    (1, "Mercedes", 
    "Gran estandar de Calidad, avanzada tecnologia aplicada",
    "Activa");


