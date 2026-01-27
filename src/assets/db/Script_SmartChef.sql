CREATE DATABASE smartchef;
USE smartchef;

-- ============================
-- Tabla: Usuario
-- ============================
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    foto_url VARCHAR(255)
);

-- ============================
-- Tabla: Preferencia
-- ============================
CREATE TABLE Preferencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- ============================
-- Tabla: Lista_Compra
-- ============================
CREATE TABLE Lista_Compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_creacion DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Receta
-- ============================
CREATE TABLE Receta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tutorial VARCHAR(255),
    tiempo_preparacion INT,
    foto_url VARCHAR(255)
);

-- ============================
-- Tabla: Ingrediente
-- ============================
CREATE TABLE Ingrediente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    unidad_medida VARCHAR(50),
    imagen_url VARCHAR(255)
);

-- ============================
-- Tabla: Receta_Ingrediente (N:N)
-- ============================
CREATE TABLE Receta_Ingrediente (
    id_receta INT NOT NULL,
    id_ingrediente INT NOT NULL,
    cantidad DECIMAL(10,2),
    PRIMARY KEY (id_receta, id_ingrediente),
    FOREIGN KEY (id_receta) REFERENCES Receta(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ingrediente) REFERENCES Ingrediente(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Receta_Preferencia (N:N)
-- ============================
CREATE TABLE Receta_Preferencia (
    id_receta INT NOT NULL,
    id_preferencia INT NOT NULL,
    PRIMARY KEY (id_receta, id_preferencia),
    FOREIGN KEY (id_receta) REFERENCES Receta(id) ON DELETE CASCADE,
    FOREIGN KEY (id_preferencia) REFERENCES Preferencia(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Coleccion
-- ============================
CREATE TABLE Coleccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Coleccion_Receta (N:N)
-- ============================
CREATE TABLE Coleccion_Receta (
    id_receta INT NOT NULL,
    id_coleccion INT NOT NULL,
    PRIMARY KEY (id_receta, id_coleccion),
    FOREIGN KEY (id_receta) REFERENCES Receta(id) ON DELETE CASCADE,
    FOREIGN KEY (id_coleccion) REFERENCES Coleccion(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Historial_Cocinado
-- ============================
CREATE TABLE Historial_Cocinado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_receta INT NOT NULL,
    fecha_cocinado DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_receta) REFERENCES Receta(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Lista_Compra_Ingrediente (N:N)
-- ============================
CREATE TABLE Lista_Compra_Ingrediente (
    id_lista INT NOT NULL,
    id_ingrediente INT NOT NULL,
    cantidad DECIMAL(10,2),
    PRIMARY KEY (id_lista, id_ingrediente),
    FOREIGN KEY (id_lista) REFERENCES Lista_Compra(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ingrediente) REFERENCES Ingrediente(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Inventario
-- ============================
CREATE TABLE Inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Inventario_Ingrediente (N:N)
-- ============================

CREATE TABLE Inventario_Ingrediente (
    id_inventario INT NOT NULL,
    id_ingrediente INT NOT NULL,
    cantidad DECIMAL(10,2),
    PRIMARY KEY (id_inventario, id_ingrediente),
    FOREIGN KEY (id_inventario) REFERENCES Inventario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ingrediente) REFERENCES Ingrediente(id) ON DELETE CASCADE
);

-- ============================
-- Tabla: Receta_Guardada (N:N)
-- ============================
CREATE TABLE Receta_Guardada (
    id_usuario INT NOT NULL,
    id_receta INT NOT NULL,
    fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_receta),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_receta) REFERENCES Receta(id) ON DELETE CASCADE
);

-- ============================
-- Datos de Preferencia
-- ============================
INSERT INTO Preferencia (nombre) VALUES
('Vegana'),
('Vegetariana'),
('Sin Gluten'),
('Alta en Proteínas'),
('Baja en Carbohidratos'),
('Sin Lactosa'),
('Keto'),
('Mediterránea');

-- ============================
-- Datos de Receta
-- ============================
INSERT INTO Receta (titulo, descripcion, tutorial, tiempo_preparacion, foto_url) VALUES
('Pollo al Horno', 'Pollo marinado con especias al horno.', '1. Marina el pollo.\n2. Hornea 60 min.\n3. Sirve.', 60, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6CzntDM4VgZXDw0h4qRzjv_t3LjlekNf2Q&s'),
('Ensalada Vegana', 'Ensalada fresca con espinacas y aguacate.', '1. Lava y corta.\n2. Mezcla y aliña.', 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKByXwYqXnLxVAvz75hajP_ZgzQ6QOKtbOw&s'),
('Arroz con Verduras', 'Arroz salteado con vegetales.', '1. Cocina arroz.\n2. Sofríe verduras.\n3. Mezcla todo.', 30, 'https://img.freepik.com/foto-gratis/apetitoso-arroz-saludable-verduras-plato-blanco-sobre-mesa-madera_2829-19783.jpg'),
('Sopa de Tomate', 'Sopa casera de tomate y albahaca.', '1. Sofríe ajo.\n2. Añade tomate.\n3. Tritura y sirve.', 25, 'https://cdn0.uncomo.com/es/posts/3/0/9/como_hacer_sopa_de_tomate_casera_25903_orig.jpg'),
('Tacos de Pollo', 'Tacos con pollo, verduras y salsa.', '1. Cocina pollo.\n2. Prepara tacos.\n3. Añade salsa.', 20, 'https://i.ytimg.com/vi/QjNO3T9YgxA/maxresdefault.jpg'),
('Smoothie Verde', 'Bebida saludable con espinaca y plátano.', '1. Mezcla todo en licuadora.', 5, 'https://zagrossports.com/wps/wp-content/uploads/smoothie-verde-aleadiets.jpg'),
('Pasta Carbonara', 'Clásica pasta italiana con crema y bacon.', '1. Cocina pasta.\n2. Mezcla con salsa.', 25, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2024/09/espaguetis-a-la-carbonara-1024x683.jpg'),
('Gazpacho Andaluz', 'Sopa fría española de tomate y pepino.', '1. Tritura ingredientes.\n2. Sirve frío.', 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAlTKm7YqWQ_YBuZfacYueHkcT0y6o9rKs3g&s'),
('Panqueques de Avena', 'Panqueques saludables sin azúcar.', '1. Mezcla avena y huevo.\n2. Cocina en sartén.', 15, 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KHALIVHDV5GWTAU5P67DN66BMQ.JPG'),
('Curry de Garbanzos', 'Plato vegano con garbanzos y especias.', '1. Sofríe cebolla y ajo.\n2. Añade garbanzos.\n3. Cocina con curry.', 35, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2024/09/curry-de-garbanzos.jpg'),
('Pizza Margarita', 'Pizza italiana con tomate, queso y albahaca.', '1. Prepara masa.\n2. Hornea con ingredientes.', 40, 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/4F1526F0-0A46-4C87-A3D5-E80AD76C0D70/Derivates/df9a8be7-6ab2-4d5a-8c4d-6cbe8aceda72.jpg'),
('Lentejas Estofadas', 'Plato tradicional de lentejas con verduras.', '1. Sofríe ajo y cebolla.\n2. Cocina lentejas.\n3. Sirve caliente.', 50, 'https://content-cocina.lecturas.com/medio/2023/03/22/paso_a_paso_para_realizar_guiso_de_lentejas_con_arroz_y_verduras_resultado_final_957b3be1_1200x1200.jpg'),
('Batido de Fresas', 'Batido natural con fresas y yogur.', '1. Mezcla todo en licuadora.', 5, 'https://es-mycooktouch.group-taurus.com/image/recipe/545x395/batido-de-fresa-y-vainilla?rev=1763199310597'),
('Tortilla de Patatas', 'Clásica tortilla española con patata y cebolla.', '1. Fríe patatas.\n2. Añade huevo.\n3. Cocina en sartén.', 25, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2025/02/tortilla-de-patatas-1.jpg'),
('Quinoa con Verduras', 'Plato saludable de quinoa salteada.', '1. Cocina quinoa.\n2. Sofríe verduras.\n3. Mezcla.', 20, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2024/10/quinoa-con-verduras.jpg');

-- ============================
-- Datos de Ingrediente
-- ============================
INSERT INTO Ingrediente (nombre, unidad_medida, imagen_url) VALUES
('Pollo', 'gramos', 'https://www.gastronomiavasca.net/uploads/image/file/4317/muslo_de_pollo.jpg'),
('Arroz', 'gramos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRSzuv8LHUj_AAXmlHOslSdY-QpB3ETNwcTw&s'),
('Aceite de oliva', 'mililitros', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpT7cxWcdH9F-5FMHQ-L6QZs7TZsXEHmYmGA&s'),
('Sal', 'gramos', 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Table_salt_with_salt_shaker_V1.jpg'),
('Tomate', 'unidad', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/1200px-Bright_red_tomato_and_cross_section02.jpg'),
('Ajo', 'dientes', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHsx-RDtcLl1olkp75jSZzM4tT39tLMJXhA&s'),
('Cebolla', 'unidad', 'https://www.gastronomiavasca.net/uploads/image/file/3338/cebolla_roja.jpg'),
('Zanahoria', 'unidad', 'https://5aldia.cl/wp-content/uploads/2018/03/zanahoria.jpg'),
('Espinaca', 'gramos', 'https://www.gastronomiavasca.net/uploads/image/file/3368/espinacas.jpg'),
('Queso', 'gramos', 'https://www.cocinista.es/download/bancorecursos/recetas/receta-queso-gouda.jpg'),
('Pan', 'unidad', 'https://www.gastronomiavasca.net/uploads/image/file/4326/w700_pan.jpg'),
('Pasta', 'gramos', 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/658A0A74-039A-487C-A07A-CAAF61B4615D/Derivates/A230DF28-60DF-429D-ABDA-96ED64E9EE10.jpg'),
('Leche', 'mililitros', 'https://www.trainerclub.es/wp-content/uploads/12.jpg'),
('Huevo', 'unidad', 'https://www.cocinista.es/download/bancorecursos/ingredientes/huevo.jpg'),
('Avena', 'gramos', 'https://content21.sabervivirtv.com/medio/2024/02/28/avena_5963dcb7_886668116(1)_240228140755_1200x630.webp'),
('Plátano', 'unidad', 'https://cuidateplus.marca.com/sites/default/files/styles/natural/public/cms/platanos_0.jpg.webp?itok=HEwfKdcm'),
('Fresas', 'gramos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PqaHvjVQ2YO7aeqO1hgUwEEsAvsqbBqvIQ&s'),
('Garbanzos', 'gramos', 'https://saborgourmet.com/wp-content/uploads/garbanzos-cocidos.jpg'),
('Lentejas', 'gramos', 'https://www.gastronomiavasca.net/uploads/image/file/4295/lentejas.jpg'),
('Pimiento', 'unidad', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGSfmKo0NiaGzxnM3k_rpu2v_gpFhPNuP1w&s'),
('Pepino', 'unidad', 'https://www.gastronomiavasca.net/uploads/image/file/3406/w700_pepino.jpg'),
('Quinoa', 'gramos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg5cSs5F3LyiVhPY9mkbEc-_OYWQU8wXVKDw&s'),
('Albahaca', 'hojas', 'https://red-hill.es/wp-content/uploads/2024/06/7e2db098-albahaca-basil-adobestock_81129315-scaled-1.jpeg');

-- ============================
-- Datos de Receta_Ingrediente
-- ============================
INSERT INTO Receta_Ingrediente (id_receta, id_ingrediente, cantidad) VALUES
-- Pollo al Horno
(1, 1, 500), (1, 3, 20), (1, 4, 5), (1, 6, 2),
-- Ensalada Vegana
(2, 8, 1), (2, 9, 100), (2, 16, 1), (2, 3, 10),
-- Arroz con Verduras
(3, 2, 200), (3, 7, 1), (3, 8, 1), (3, 4, 5),
-- Sopa de Tomate
(4, 5, 3), (4, 6, 1), (4, 7, 1), (4, 23, 5),
-- Tacos de Pollo
(5, 1, 200), (5, 7, 1), (5, 20, 1), (5, 11, 2),
-- Smoothie Verde
(6, 9, 50), (6, 16, 1), (6, 13, 200),
-- Pasta Carbonara
(7, 12, 150), (7, 10, 50), (7, 14, 1), (7, 3, 10),
-- Gazpacho
(8, 5, 4), (8, 21, 1), (8, 20, 1), (8, 4, 3),
-- Panqueques de Avena
(9, 15, 80), (9, 14, 1), (9, 13, 100),
-- Curry de Garbanzos
(10, 18, 200), (10, 7, 1), (10, 6, 2), (10, 8, 1),
-- Pizza Margarita
(11, 11, 1), (11, 5, 2), (11, 10, 50), (11, 23, 3),
-- Lentejas Estofadas
(12, 19, 200), (12, 7, 1), (12, 8, 1), (12, 4, 3),
-- Batido de Fresas
(13, 17, 100), (13, 13, 150), (13, 16, 1),
-- Tortilla de Patatas
(14, 14, 2), (14, 7, 1), (14, 4, 3),
-- Quinoa con Verduras
(15, 22, 100), (15, 8, 1), (15, 7, 1), (15, 3, 10);

-- ============================
-- Datos de Receta_Preferencia
-- ============================
INSERT INTO Receta_Preferencia (id_receta, id_preferencia) VALUES
(1, 4),                -- Pollo al Horno - Alta en Proteínas
(2, 1), (2, 6),        -- Ensalada Vegana - Vegana, Sin Lactosa
(3, 3), (3, 6),        -- Arroz con Verduras - Sin Gluten, Sin Lactosa
(4, 1), (4, 2), (4, 6),-- Sopa de Tomate - Vegana, Vegetariana, Sin Lactosa
(5, 4),                -- Tacos de Pollo - Alta en Proteínas
(6, 1), (6, 6),        -- Smoothie Verde - Vegana, Sin Lactosa
(7, 8),                -- Pasta Carbonara - Mediterránea
(8, 1), (8, 8),        -- Gazpacho - Vegana, Mediterránea
(9, 2), (9, 6),        -- Panqueques de Avena - Vegetariana, Sin Lactosa
(10, 1), (10, 2), (10, 6), -- Curry de Garbanzos - Vegana, Vegetariana, Sin Lactosa
(11, 8), (11, 6),      -- Pizza Margarita - Mediterránea, Sin Lactosa
(12, 2),               -- Lentejas Estofadas - Vegetariana
(13, 6),               -- Batido de Fresas - Sin Lactosa
(14, 8),               -- Tortilla de Patatas - Mediterránea
(15, 1), (15, 6);      -- Quinoa con Verduras - Vegana, Sin Lactosa
