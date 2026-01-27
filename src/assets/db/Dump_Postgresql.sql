CREATE TABLE public.coleccion (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 16482)
-- Name: coleccion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.coleccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5148 (class 0 OID 0)
-- Dependencies: 231
-- Name: coleccion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.coleccion_id_seq OWNED BY public.coleccion.id;


--
-- TOC entry 233 (class 1259 OID 16497)
-- Name: coleccion_receta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coleccion_receta (
    id_receta integer NOT NULL,
    id_coleccion integer NOT NULL
);


--
-- TOC entry 235 (class 1259 OID 16515)
-- Name: historial_cocinado; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historial_cocinado (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    id_receta integer NOT NULL,
    fecha_cocinado date NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 16514)
-- Name: historial_cocinado_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historial_cocinado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5149 (class 0 OID 0)
-- Dependencies: 234
-- Name: historial_cocinado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historial_cocinado_id_seq OWNED BY public.historial_cocinado.id;


--
-- TOC entry 228 (class 1259 OID 16440)
-- Name: ingrediente; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingrediente (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    unidad_medida character varying(50),
    imagen_url character varying(255)
);


--
-- TOC entry 227 (class 1259 OID 16439)
-- Name: ingrediente_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ingrediente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5150 (class 0 OID 0)
-- Dependencies: 227
-- Name: ingrediente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ingrediente_id_seq OWNED BY public.ingrediente.id;


--
-- TOC entry 238 (class 1259 OID 16553)
-- Name: inventario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventario (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 237 (class 1259 OID 16552)
-- Name: inventario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inventario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5151 (class 0 OID 0)
-- Dependencies: 237
-- Name: inventario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inventario_id_seq OWNED BY public.inventario.id;


--
-- TOC entry 239 (class 1259 OID 16567)
-- Name: inventario_ingrediente; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventario_ingrediente (
    id_inventario integer NOT NULL,
    id_ingrediente integer NOT NULL,
    cantidad numeric(10,2)
);


--
-- TOC entry 224 (class 1259 OID 16414)
-- Name: lista_compra; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lista_compra (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha_creacion date NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 16413)
-- Name: lista_compra_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lista_compra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5152 (class 0 OID 0)
-- Dependencies: 223
-- Name: lista_compra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lista_compra_id_seq OWNED BY public.lista_compra.id;


--
-- TOC entry 236 (class 1259 OID 16535)
-- Name: lista_compra_ingrediente; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lista_compra_ingrediente (
    id_lista integer NOT NULL,
    id_ingrediente integer NOT NULL,
    cantidad numeric(10,2)
);


--
-- TOC entry 222 (class 1259 OID 16405)
-- Name: preferencia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.preferencia (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: preferencia_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.preferencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5153 (class 0 OID 0)
-- Dependencies: 221
-- Name: preferencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.preferencia_id_seq OWNED BY public.preferencia.id;


--
-- TOC entry 226 (class 1259 OID 16429)
-- Name: receta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.receta (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    descripcion text,
    tutorial text,
    tiempo_preparacion integer,
    foto_url character varying(255)
);


--
-- TOC entry 240 (class 1259 OID 16584)
-- Name: receta_guardada; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.receta_guardada (
    id_usuario integer NOT NULL,
    id_receta integer NOT NULL,
    fecha_guardado timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 225 (class 1259 OID 16428)
-- Name: receta_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.receta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5154 (class 0 OID 0)
-- Dependencies: 225
-- Name: receta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.receta_id_seq OWNED BY public.receta.id;


--
-- TOC entry 229 (class 1259 OID 16448)
-- Name: receta_ingrediente; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.receta_ingrediente (
    id_receta integer NOT NULL,
    id_ingrediente integer NOT NULL,
    cantidad numeric(10,2)
);


--
-- TOC entry 230 (class 1259 OID 16465)
-- Name: receta_preferencia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.receta_preferencia (
    id_receta integer NOT NULL,
    id_preferencia integer NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo_electronico character varying(150) NOT NULL,
    contrasena character varying(255) NOT NULL,
    fecha_nacimiento date,
    foto_url character varying(255)
);


--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 4920 (class 2604 OID 16486)
-- Name: coleccion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coleccion ALTER COLUMN id SET DEFAULT nextval('public.coleccion_id_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 16518)
-- Name: historial_cocinado id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_cocinado ALTER COLUMN id SET DEFAULT nextval('public.historial_cocinado_id_seq'::regclass);


--
-- TOC entry 4919 (class 2604 OID 16443)
-- Name: ingrediente id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingrediente ALTER COLUMN id SET DEFAULT nextval('public.ingrediente_id_seq'::regclass);


--
-- TOC entry 4922 (class 2604 OID 16556)
-- Name: inventario id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventario ALTER COLUMN id SET DEFAULT nextval('public.inventario_id_seq'::regclass);


--
-- TOC entry 4917 (class 2604 OID 16417)
-- Name: lista_compra id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lista_compra ALTER COLUMN id SET DEFAULT nextval('public.lista_compra_id_seq'::regclass);


--
-- TOC entry 4916 (class 2604 OID 16408)
-- Name: preferencia id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preferencia ALTER COLUMN id SET DEFAULT nextval('public.preferencia_id_seq'::regclass);


--
-- TOC entry 4918 (class 2604 OID 16432)
-- Name: receta id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta ALTER COLUMN id SET DEFAULT nextval('public.receta_id_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 16393)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 5132 (class 0 OID 16483)
-- Dependencies: 232
-- Data for Name: coleccion; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5133 (class 0 OID 16497)
-- Dependencies: 233
-- Data for Name: coleccion_receta; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5135 (class 0 OID 16515)
-- Dependencies: 235
-- Data for Name: historial_cocinado; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5128 (class 0 OID 16440)
-- Dependencies: 228
-- Data for Name: ingrediente; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ingrediente VALUES (1, 'Pollo', 'gramos', 'https://www.gastronomiavasca.net/uploads/image/file/4317/muslo_de_pollo.jpg');
INSERT INTO public.ingrediente VALUES (2, 'Arroz', 'gramos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRSzuv8LHUj_AAXmlHOslSdY-QpB3ETNwcTw&s');
INSERT INTO public.ingrediente VALUES (3, 'Aceite de oliva', 'mililitros', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpT7cxWcdH9F-5FMHQ-L6QZs7TZsXEHmYmGA&s');
INSERT INTO public.ingrediente VALUES (4, 'Sal', 'gramos', 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Table_salt_with_salt_shaker_V1.jpg');
INSERT INTO public.ingrediente VALUES (5, 'Tomate', 'unidad', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/1200px-Bright_red_tomato_and_cross_section02.jpg');
INSERT INTO public.ingrediente VALUES (6, 'Ajo', 'dientes', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHsx-RDtcLl1olkp75jSZzM4tT39tLMJXhA&s');
INSERT INTO public.ingrediente VALUES (7, 'Cebolla', 'unidad', 'https://www.gastronomiavasca.net/uploads/image/file/3338/cebolla_roja.jpg');
INSERT INTO public.ingrediente VALUES (8, 'Zanahoria', 'unidad', 'https://5aldia.cl/wp-content/uploads/2018/03/zanahoria.jpg');
INSERT INTO public.ingrediente VALUES (9, 'Espinaca', 'gramos', 'https://www.gastronomiavasca.net/uploads/image/file/3368/espinacas.jpg');
INSERT INTO public.ingrediente VALUES (10, 'Queso', 'gramos', 'https://www.cocinista.es/download/bancorecursos/recetas/receta-queso-gouda.jpg');
INSERT INTO public.ingrediente VALUES (11, 'Pan', 'unidad', 'https://www.gastronomiavasca.net/uploads/image/file/4326/w700_pan.jpg');
INSERT INTO public.ingrediente VALUES (12, 'Pasta', 'gramos', 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/658A0A74-039A-487C-A07A-CAAF61B4615D/Derivates/A230DF28-60DF-429D-ABDA-96ED64E9EE10.jpg');
INSERT INTO public.ingrediente VALUES (13, 'Leche', 'mililitros', 'https://www.trainerclub.es/wp-content/uploads/12.jpg');
INSERT INTO public.ingrediente VALUES (14, 'Huevo', 'unidad', 'https://www.cocinista.es/download/bancorecursos/ingredientes/huevo.jpg');
INSERT INTO public.ingrediente VALUES (15, 'Avena', 'gramos', 'https://content21.sabervivirtv.com/medio/2024/02/28/avena_5963dcb7_886668116(1)_240228140755_1200x630.webp');
INSERT INTO public.ingrediente VALUES (16, 'Plátano', 'unidad', 'https://cuidateplus.marca.com/sites/default/files/styles/natural/public/cms/platanos_0.jpg.webp?itok=HEwfKdcm');
INSERT INTO public.ingrediente VALUES (17, 'Fresas', 'gramos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PqaHvjVQ2YO7aeqO1hgUwEEsAvsqbBqvIQ&s');
INSERT INTO public.ingrediente VALUES (18, 'Garbanzos', 'gramos', 'https://saborgourmet.com/wp-content/uploads/garbanzos-cocidos.jpg');
INSERT INTO public.ingrediente VALUES (19, 'Lentejas', 'gramos', 'https://www.gastronomiavasca.net/uploads/image/file/4295/lentejas.jpg');
INSERT INTO public.ingrediente VALUES (20, 'Pimiento', 'unidad', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGSfmKo0NiaGzxnM3k_rpu2v_gpFhPNuP1w&s');
INSERT INTO public.ingrediente VALUES (21, 'Pepino', 'unidad', 'https://www.gastronomiavasca.net/uploads/image/file/3406/w700_pepino.jpg');
INSERT INTO public.ingrediente VALUES (22, 'Quinoa', 'gramos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg5cSs5F3LyiVhPY9mkbEc-_OYWQU8wXVKDw&s');
INSERT INTO public.ingrediente VALUES (23, 'Albahaca', 'hojas', 'https://red-hill.es/wp-content/uploads/2024/06/7e2db098-albahaca-basil-adobestock_81129315-scaled-1.jpeg');


--
-- TOC entry 5138 (class 0 OID 16553)
-- Dependencies: 238
-- Data for Name: inventario; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5139 (class 0 OID 16567)
-- Dependencies: 239
-- Data for Name: inventario_ingrediente; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5124 (class 0 OID 16414)
-- Dependencies: 224
-- Data for Name: lista_compra; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5136 (class 0 OID 16535)
-- Dependencies: 236
-- Data for Name: lista_compra_ingrediente; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5122 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: preferencia; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.preferencia VALUES (1, 'Vegana');
INSERT INTO public.preferencia VALUES (2, 'Vegetariana');
INSERT INTO public.preferencia VALUES (3, 'Sin Gluten');
INSERT INTO public.preferencia VALUES (4, 'Alta en Proteínas');
INSERT INTO public.preferencia VALUES (5, 'Baja en Carbohidratos');
INSERT INTO public.preferencia VALUES (6, 'Sin Lactosa');
INSERT INTO public.preferencia VALUES (7, 'Keto');
INSERT INTO public.preferencia VALUES (8, 'Mediterránea');


--
-- TOC entry 5126 (class 0 OID 16429)
-- Dependencies: 226
-- Data for Name: receta; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.receta VALUES (1, 'Pollo al Horno', 'Pollo marinado con especias al horno.', '1. Marina el pollo. 2. Hornea 60 min. 3. Sirve.', 60, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6CzntDM4VgZXDw0h4qRzjv_t3LjlekNf2Q&s');
INSERT INTO public.receta VALUES (2, 'Ensalada Vegana', 'Ensalada fresca con espinacas y aguacate.', '1. Lava y corta. 2. Mezcla y aliña.', 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKByXwYqXnLxVAvz75hajP_ZgzQ6QOKtbOw&s');
INSERT INTO public.receta VALUES (3, 'Arroz con Verduras', 'Arroz salteado con vegetales.', '1. Cocina arroz. 2. Sofríe verduras. 3. Mezcla todo.', 30, 'https://img.freepik.com/foto-gratis/apetitoso-arroz-saludable-verduras-plato-blanco-sobre-mesa-madera_2829-19783.jpg');
INSERT INTO public.receta VALUES (4, 'Sopa de Tomate', 'Sopa casera de tomate y albahaca.', '1. Sofríe ajo. 2. Añade tomate. 3. Tritura y sirve.', 25, 'https://cdn0.uncomo.com/es/posts/3/0/9/como_hacer_sopa_de_tomate_casera_25903_orig.jpg');
INSERT INTO public.receta VALUES (5, 'Tacos de Pollo', 'Tacos con pollo, verduras y salsa.', '1. Cocina pollo. 2. Prepara tacos. 3. Añade salsa.', 20, 'https://i.ytimg.com/vi/QjNO3T9YgxA/maxresdefault.jpg');
INSERT INTO public.receta VALUES (6, 'Smoothie Verde', 'Bebida saludable con espinaca y plátano.', '1. Mezcla todo en licuadora.', 5, 'https://zagrossports.com/wps/wp-content/uploads/smoothie-verde-aleadiets.jpg');
INSERT INTO public.receta VALUES (7, 'Pasta Carbonara', 'Clásica pasta italiana con crema y bacon.', '1. Cocina pasta. 2. Mezcla con salsa.', 25, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2024/09/espaguetis-a-la-carbonara-1024x683.jpg');
INSERT INTO public.receta VALUES (8, 'Gazpacho Andaluz', 'Sopa fría española de tomate y pepino.', '1. Tritura ingredientes. 2. Sirve frío.', 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAlTKm7YqWQ_YBuZfacYueHkcT0y6o9rKs3g&s');
INSERT INTO public.receta VALUES (9, 'Panqueques de Avena', 'Panqueques saludables sin azúcar.', '1. Mezcla avena y huevo. 2. Cocina en sartén.', 15, 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KHALIVHDV5GWTAU5P67DN66BMQ.JPG');
INSERT INTO public.receta VALUES (10, 'Curry de Garbanzos', 'Plato vegano con garbanzos y especias.', '1. Sofríe cebolla y ajo. 2. Añade garbanzos. 3. Cocina con curry.', 35, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2024/09/curry-de-garbanzos.jpg');
INSERT INTO public.receta VALUES (11, 'Pizza Margarita', 'Pizza italiana con tomate, queso y albahaca.', '1. Prepara masa. 2. Hornea con ingredientes.', 40, 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/4F1526F0-0A46-4C87-A3D5-E80AD76C0D70/Derivates/df9a8be7-6ab2-4d5a-8c4d-6cbe8aceda72.jpg');
INSERT INTO public.receta VALUES (12, 'Lentejas Estofadas', 'Plato tradicional de lentejas con verduras.', '1. Sofríe ajo y cebolla. 2. Cocina lentejas. 3. Sirve caliente.', 50, 'https://content-cocina.lecturas.com/media/2023/03/22/paso_a_paso_para_realizar_guiso_de_lentejas_con_arroz_y_verduras_resultado_final_957b3be1_1200x1200.jpg');
INSERT INTO public.receta VALUES (13, 'Batido de Fresas', 'Batido natural con fresas y yogur.', '1. Mezcla todo en licuadora.', 5, 'https://es-mycooktouch.group-taurus.com/image/recipe/545x395/batido-de-fresa-y-vainilla?rev=1763199310597');
INSERT INTO public.receta VALUES (14, 'Tortilla de Patatas', 'Clásica tortilla española con patata y cebolla.', '1. Fríe patatas. 2. Añade huevo. 3. Cocina en sartén.', 25, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2025/02/tortilla-de-patatas-1.jpg');
INSERT INTO public.receta VALUES (15, 'Quinoa con Verduras', 'Plato saludable de quinoa salteada.', '1. Cocina quinoa. 2. Sofríe verduras. 3. Mezcla.', 20, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2024/10/quinoa-con-verduras.jpg');


--
-- TOC entry 5140 (class 0 OID 16584)
-- Dependencies: 240
-- Data for Name: receta_guardada; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5129 (class 0 OID 16448)
-- Dependencies: 229
-- Data for Name: receta_ingrediente; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.receta_ingrediente VALUES (1, 1, 500.00);
INSERT INTO public.receta_ingrediente VALUES (1, 3, 20.00);
INSERT INTO public.receta_ingrediente VALUES (1, 4, 5.00);
INSERT INTO public.receta_ingrediente VALUES (1, 6, 2.00);
INSERT INTO public.receta_ingrediente VALUES (2, 8, 1.00);
INSERT INTO public.receta_ingrediente VALUES (2, 9, 100.00);
INSERT INTO public.receta_ingrediente VALUES (2, 16, 1.00);
INSERT INTO public.receta_ingrediente VALUES (2, 3, 10.00);
INSERT INTO public.receta_ingrediente VALUES (3, 2, 200.00);
INSERT INTO public.receta_ingrediente VALUES (3, 7, 1.00);
INSERT INTO public.receta_ingrediente VALUES (3, 8, 1.00);
INSERT INTO public.receta_ingrediente VALUES (3, 4, 5.00);
INSERT INTO public.receta_ingrediente VALUES (4, 5, 3.00);
INSERT INTO public.receta_ingrediente VALUES (4, 6, 1.00);
INSERT INTO public.receta_ingrediente VALUES (4, 7, 1.00);
INSERT INTO public.receta_ingrediente VALUES (4, 23, 5.00);
INSERT INTO public.receta_ingrediente VALUES (5, 1, 200.00);
INSERT INTO public.receta_ingrediente VALUES (5, 7, 1.00);
INSERT INTO public.receta_ingrediente VALUES (5, 20, 1.00);
INSERT INTO public.receta_ingrediente VALUES (5, 11, 2.00);
INSERT INTO public.receta_ingrediente VALUES (6, 9, 50.00);
INSERT INTO public.receta_ingrediente VALUES (6, 16, 1.00);
INSERT INTO public.receta_ingrediente VALUES (6, 13, 200.00);
INSERT INTO public.receta_ingrediente VALUES (7, 12, 150.00);
INSERT INTO public.receta_ingrediente VALUES (7, 10, 50.00);
INSERT INTO public.receta_ingrediente VALUES (7, 14, 1.00);
INSERT INTO public.receta_ingrediente VALUES (7, 3, 10.00);
INSERT INTO public.receta_ingrediente VALUES (8, 5, 4.00);
INSERT INTO public.receta_ingrediente VALUES (8, 21, 1.00);
INSERT INTO public.receta_ingrediente VALUES (8, 20, 1.00);
INSERT INTO public.receta_ingrediente VALUES (8, 4, 3.00);
INSERT INTO public.receta_ingrediente VALUES (9, 15, 80.00);
INSERT INTO public.receta_ingrediente VALUES (9, 14, 1.00);
INSERT INTO public.receta_ingrediente VALUES (9, 13, 100.00);
INSERT INTO public.receta_ingrediente VALUES (10, 18, 200.00);
INSERT INTO public.receta_ingrediente VALUES (10, 7, 1.00);
INSERT INTO public.receta_ingrediente VALUES (10, 6, 2.00);
INSERT INTO public.receta_ingrediente VALUES (10, 8, 1.00);
INSERT INTO public.receta_ingrediente VALUES (11, 11, 1.00);
INSERT INTO public.receta_ingrediente VALUES (11, 5, 2.00);
INSERT INTO public.receta_ingrediente VALUES (11, 10, 50.00);
INSERT INTO public.receta_ingrediente VALUES (11, 23, 3.00);
INSERT INTO public.receta_ingrediente VALUES (12, 19, 200.00);
INSERT INTO public.receta_ingrediente VALUES (12, 7, 1.00);
INSERT INTO public.receta_ingrediente VALUES (12, 8, 1.00);
INSERT INTO public.receta_ingrediente VALUES (12, 4, 3.00);
INSERT INTO public.receta_ingrediente VALUES (13, 17, 100.00);
INSERT INTO public.receta_ingrediente VALUES (13, 13, 150.00);
INSERT INTO public.receta_ingrediente VALUES (13, 16, 1.00);
INSERT INTO public.receta_ingrediente VALUES (14, 14, 2.00);
INSERT INTO public.receta_ingrediente VALUES (14, 7, 1.00);
INSERT INTO public.receta_ingrediente VALUES (14, 4, 3.00);
INSERT INTO public.receta_ingrediente VALUES (15, 22, 100.00);
INSERT INTO public.receta_ingrediente VALUES (15, 8, 1.00);
INSERT INTO public.receta_ingrediente VALUES (15, 7, 1.00);
INSERT INTO public.receta_ingrediente VALUES (15, 3, 10.00);


--
-- TOC entry 5130 (class 0 OID 16465)
-- Dependencies: 230
-- Data for Name: receta_preferencia; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.receta_preferencia VALUES (1, 4);
INSERT INTO public.receta_preferencia VALUES (2, 1);
INSERT INTO public.receta_preferencia VALUES (2, 6);
INSERT INTO public.receta_preferencia VALUES (3, 3);
INSERT INTO public.receta_preferencia VALUES (3, 6);
INSERT INTO public.receta_preferencia VALUES (4, 1);
INSERT INTO public.receta_preferencia VALUES (4, 2);
INSERT INTO public.receta_preferencia VALUES (4, 6);
INSERT INTO public.receta_preferencia VALUES (5, 4);
INSERT INTO public.receta_preferencia VALUES (6, 1);
INSERT INTO public.receta_preferencia VALUES (6, 6);
INSERT INTO public.receta_preferencia VALUES (7, 8);
INSERT INTO public.receta_preferencia VALUES (8, 1);
INSERT INTO public.receta_preferencia VALUES (8, 8);
INSERT INTO public.receta_preferencia VALUES (9, 2);
INSERT INTO public.receta_preferencia VALUES (9, 6);
INSERT INTO public.receta_preferencia VALUES (10, 1);
INSERT INTO public.receta_preferencia VALUES (10, 2);
INSERT INTO public.receta_preferencia VALUES (10, 6);
INSERT INTO public.receta_preferencia VALUES (11, 8);
INSERT INTO public.receta_preferencia VALUES (11, 6);
INSERT INTO public.receta_preferencia VALUES (12, 2);
INSERT INTO public.receta_preferencia VALUES (13, 6);
INSERT INTO public.receta_preferencia VALUES (14, 8);
INSERT INTO public.receta_preferencia VALUES (15, 1);
INSERT INTO public.receta_preferencia VALUES (15, 6);


--
-- TOC entry 5120 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 231
-- Name: coleccion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coleccion_id_seq', 1, false);


--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 234
-- Name: historial_cocinado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.historial_cocinado_id_seq', 1, false);


--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 227
-- Name: ingrediente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ingrediente_id_seq', 23, true);


--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 237
-- Name: inventario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inventario_id_seq', 1, false);


--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 223
-- Name: lista_compra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lista_compra_id_seq', 1, false);


--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 221
-- Name: preferencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.preferencia_id_seq', 8, true);


--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 225
-- Name: receta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.receta_id_seq', 15, true);


--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuario_id_seq', 1, false);


--
-- TOC entry 4942 (class 2606 OID 16491)
-- Name: coleccion coleccion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coleccion
    ADD CONSTRAINT coleccion_pkey PRIMARY KEY (id);


--
-- TOC entry 4944 (class 2606 OID 16503)
-- Name: coleccion_receta coleccion_receta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coleccion_receta
    ADD CONSTRAINT coleccion_receta_pkey PRIMARY KEY (id_receta, id_coleccion);


--
-- TOC entry 4946 (class 2606 OID 16524)
-- Name: historial_cocinado historial_cocinado_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_cocinado
    ADD CONSTRAINT historial_cocinado_pkey PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 16447)
-- Name: ingrediente ingrediente_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingrediente
    ADD CONSTRAINT ingrediente_pkey PRIMARY KEY (id);


--
-- TOC entry 4952 (class 2606 OID 16573)
-- Name: inventario_ingrediente inventario_ingrediente_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventario_ingrediente
    ADD CONSTRAINT inventario_ingrediente_pkey PRIMARY KEY (id_inventario, id_ingrediente);


--
-- TOC entry 4950 (class 2606 OID 16561)
-- Name: inventario inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (id);


--
-- TOC entry 4948 (class 2606 OID 16541)
-- Name: lista_compra_ingrediente lista_compra_ingrediente_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lista_compra_ingrediente
    ADD CONSTRAINT lista_compra_ingrediente_pkey PRIMARY KEY (id_lista, id_ingrediente);


--
-- TOC entry 4932 (class 2606 OID 16422)
-- Name: lista_compra lista_compra_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lista_compra
    ADD CONSTRAINT lista_compra_pkey PRIMARY KEY (id);


--
-- TOC entry 4930 (class 2606 OID 16412)
-- Name: preferencia preferencia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preferencia
    ADD CONSTRAINT preferencia_pkey PRIMARY KEY (id);


--
-- TOC entry 4954 (class 2606 OID 16591)
-- Name: receta_guardada receta_guardada_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_guardada
    ADD CONSTRAINT receta_guardada_pkey PRIMARY KEY (id_usuario, id_receta);


--
-- TOC entry 4938 (class 2606 OID 16454)
-- Name: receta_ingrediente receta_ingrediente_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_ingrediente
    ADD CONSTRAINT receta_ingrediente_pkey PRIMARY KEY (id_receta, id_ingrediente);


--
-- TOC entry 4934 (class 2606 OID 16438)
-- Name: receta receta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta
    ADD CONSTRAINT receta_pkey PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 16471)
-- Name: receta_preferencia receta_preferencia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_preferencia
    ADD CONSTRAINT receta_preferencia_pkey PRIMARY KEY (id_receta, id_preferencia);


--
-- TOC entry 4926 (class 2606 OID 16403)
-- Name: usuario usuario_correo_electronico_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_electronico_key UNIQUE (correo_electronico);


--
-- TOC entry 4928 (class 2606 OID 16401)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 4961 (class 2606 OID 16509)
-- Name: coleccion_receta fk_coleccion_rec; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coleccion_receta
    ADD CONSTRAINT fk_coleccion_rec FOREIGN KEY (id_coleccion) REFERENCES public.coleccion(id) ON DELETE CASCADE;


--
-- TOC entry 4968 (class 2606 OID 16579)
-- Name: inventario_ingrediente fk_ingrediente_inv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventario_ingrediente
    ADD CONSTRAINT fk_ingrediente_inv FOREIGN KEY (id_ingrediente) REFERENCES public.ingrediente(id) ON DELETE CASCADE;


--
-- TOC entry 4965 (class 2606 OID 16547)
-- Name: lista_compra_ingrediente fk_ingrediente_lista; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lista_compra_ingrediente
    ADD CONSTRAINT fk_ingrediente_lista FOREIGN KEY (id_ingrediente) REFERENCES public.ingrediente(id) ON DELETE CASCADE;


--
-- TOC entry 4956 (class 2606 OID 16460)
-- Name: receta_ingrediente fk_ingrediente_rec; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_ingrediente
    ADD CONSTRAINT fk_ingrediente_rec FOREIGN KEY (id_ingrediente) REFERENCES public.ingrediente(id) ON DELETE CASCADE;


--
-- TOC entry 4969 (class 2606 OID 16574)
-- Name: inventario_ingrediente fk_inventario_ing; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventario_ingrediente
    ADD CONSTRAINT fk_inventario_ing FOREIGN KEY (id_inventario) REFERENCES public.inventario(id) ON DELETE CASCADE;


--
-- TOC entry 4966 (class 2606 OID 16542)
-- Name: lista_compra_ingrediente fk_lista_ing; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lista_compra_ingrediente
    ADD CONSTRAINT fk_lista_ing FOREIGN KEY (id_lista) REFERENCES public.lista_compra(id) ON DELETE CASCADE;


--
-- TOC entry 4958 (class 2606 OID 16477)
-- Name: receta_preferencia fk_preferencia_rec; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_preferencia
    ADD CONSTRAINT fk_preferencia_rec FOREIGN KEY (id_preferencia) REFERENCES public.preferencia(id) ON DELETE CASCADE;


--
-- TOC entry 4962 (class 2606 OID 16504)
-- Name: coleccion_receta fk_receta_col; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coleccion_receta
    ADD CONSTRAINT fk_receta_col FOREIGN KEY (id_receta) REFERENCES public.receta(id) ON DELETE CASCADE;


--
-- TOC entry 4970 (class 2606 OID 16597)
-- Name: receta_guardada fk_receta_guard; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_guardada
    ADD CONSTRAINT fk_receta_guard FOREIGN KEY (id_receta) REFERENCES public.receta(id) ON DELETE CASCADE;


--
-- TOC entry 4963 (class 2606 OID 16530)
-- Name: historial_cocinado fk_receta_hist; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_cocinado
    ADD CONSTRAINT fk_receta_hist FOREIGN KEY (id_receta) REFERENCES public.receta(id) ON DELETE CASCADE;


--
-- TOC entry 4957 (class 2606 OID 16455)
-- Name: receta_ingrediente fk_receta_ing; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_ingrediente
    ADD CONSTRAINT fk_receta_ing FOREIGN KEY (id_receta) REFERENCES public.receta(id) ON DELETE CASCADE;


--
-- TOC entry 4959 (class 2606 OID 16472)
-- Name: receta_preferencia fk_receta_pref; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_preferencia
    ADD CONSTRAINT fk_receta_pref FOREIGN KEY (id_receta) REFERENCES public.receta(id) ON DELETE CASCADE;


--
-- TOC entry 4960 (class 2606 OID 16492)
-- Name: coleccion fk_usuario_col; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coleccion
    ADD CONSTRAINT fk_usuario_col FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- TOC entry 4971 (class 2606 OID 16592)
-- Name: receta_guardada fk_usuario_guard; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receta_guardada
    ADD CONSTRAINT fk_usuario_guard FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- TOC entry 4964 (class 2606 OID 16525)
-- Name: historial_cocinado fk_usuario_hist; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_cocinado
    ADD CONSTRAINT fk_usuario_hist FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- TOC entry 4967 (class 2606 OID 16562)
-- Name: inventario fk_usuario_inv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT fk_usuario_inv FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- TOC entry 4955 (class 2606 OID 16423)
-- Name: lista_compra fk_usuario_lista; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lista_compra
    ADD CONSTRAINT fk_usuario_lista FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


-- Completed on 2026-01-26 14:12:21

--
-- PostgreSQL database dump complete
--

\unrestrict 0ddGjfd8tsQBOe8zqDlN6pG0kM0M2cEPcbvK4kpdQu0bqRg1WWYGmPnncbigHDW

