import { DestinationPackage, Testimonial } from "./types";

export const PACKAGES: DestinationPackage[] = [
  // LOCALES (9 PAQUETES)
  {
    id: "city-tour",
    title: "City Tour Ayacucho Señorial",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 40",
    duration: "Medio Día (4 horas)",
    difficulty: "Fácil",
    description: "Ayacucho es famosa como la 'Ciudad de las 33 Iglesias' y la capital de la artesanía peruana. Recorre los templos históricos, arcos coloniales, casonas señoriales y visita los talleres de los maestros artesanos de retablos y filigrana.",
    highlights: [
      "Catedral de Ayacucho y Basílica de San Francisco de Asís",
      "Visita al histórico Mirador de Acuchimay",
      "Recorrido por las casonas coloniales Boza y Solís",
      "Taller interactivo de retablismo en el Barrio de Santa Ana"
    ],
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Quisiera realizar el City Tour Ayacucho Colonial de Sisari Travel. ¿Tienen salidas diarias?",
    inclusions: [
      "Vehículo de turismo climatizado",
      "Guía profesional de turismo en español",
      "Todas las entradas a los templos y miradores",
      "Visita guiada a talleres artísticos tradicionales"
    ],
    exclusions: [
      "Alimentación y souvenirs personales",
      "Gastos imprevistos extra"
    ],
    itinerary: [
      {
        day: 1,
        title: "Tesoros coloniales de Huamanga y magia artesana",
        description: "Iniciamos el tour a las 9:00 AM o a las 2:00 PM. Caminaremos por la majestuosa Plaza Mayor para conocer la Catedral del siglo XVII y el Templo de Santo Domingo. Abordaremos nuestro vehículo para ir al Mirador de Acuchimay, desde donde se tiene una vista de 360 grados de toda la ciudad colonial. Continuaremos hacia el místico Barrio de Santa Ana, famoso por albergar a renombrados maestros de la tejeduría de lana y de los icónicos Retablos Ayacuchanos de madera y masa de papa, donde conversaremos con ellos en sus propios talleres."
      }
    ],
    faqs: [
      {
        q: "¿Ayacucho tiene realmente 33 iglesias?",
        a: "Sí, la ciudad cuenta con 33 iglesias históricas activas desde la época de la colonia española, lo que la convierte en una de las ciudades con mayor concentración religiosa y misticismo del mundo."
      }
    ]
  },
  {
    id: "millpu",
    title: "Aguas Turquesas de Millpu",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 90",
    duration: "Full Day (12 horas)",
    difficulty: "Moderado",
    description: "Una de las maravillas naturales más impresionantes del Perú. Camina a través de un impresionante cañón de piedra blanca y admira las más de 20 pozas naturales de aguas de color turquesa y verde esmeralda alimentadas por cascadas cristalinas.",
    highlights: [
      "Visita a las pozas escalonadas de Millpu",
      "Senderismo corto por el cañón escénico",
      "Mirador elevado para las mejores fotos panorámicas",
      "Almuerzo tradicional con trucha local fresca"
    ],
    image: "/src/assets/images/sisari_millpu_hero_1779988973258.png",
    whatsAppText: "¡Hola! Estoy interesado en el paquete Aguas Turquesas de Millpu en Ayacucho. ¿Me podrían dar información de salidas?",
    inclusions: [
      "Transporte turístico privado (Ida y Vuelta)",
      "Guía oficial de Turismo bilingüe (Español/Quechua)",
      "Ticket de ingreso a Circamarca",
      "Almuerzo tradicional en recreo campestre",
      "Equipo de primeros auxilios y balón de oxígeno"
    ],
    exclusions: [
      "Bebidas y snacks adicionales",
      "Propina para el guía de turismo",
      "Servicios extras no detallados"
    ],
    itinerary: [
      {
        day: 1,
        title: "Viaje a Circamarca, caminata y visita al Cañón Turquesa",
        description: "Partiremos muy temprano a las 7:30 AM desde nuestra oficina céntrica en Ayacucho. Tras un viaje panorámico de aproximadamente 3.5 horas por paisajes altoandinos, llegaremos a Circamarca. Aquí iniciamos una caminata de 30 a 45 minutos por los márgenes de un asombroso río cristalino. Nos asomaremos a las más de 20 espectaculares piscinas naturales escalonadas de color verde turquesa talladas en piedra caliza blanca. Luego subiremos al Mirador del Ojo del Agua y contemplaremos la majestuosidad del cañón."
      }
    ],
    faqs: [
      {
        q: "¿Cuál es la mejor temporada para visitar Millpu?",
        a: "La temporada ideal es de Mayo a Diciembre (estación seca). Durante estos meses las pozas muestran su color turquesa más cristalino debido a la ausencia de lluvias que revuelven el sedimento."
      }
    ]
  },
  {
    id: "quinoa",
    title: "Santuario Histórico de Quinua y Alfarería",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 50",
    duration: "Full Day (6 horas)",
    difficulty: "Fácil",
    description: "Visita el pintoresco pueblo de artesanos alfareros de Quinua, cuyas casas de barro tienen techos adornados con encantadoras iglesitas de cerámica. Explora el histórico museo de sitio y la vasta Pampa de Ayacucho, escenario de la independencia de América.",
    highlights: [
      "Tours interactivos en talleres de maestros ceramistas",
      "Visita al Obelisco de 44 metros en la Pampa de Ayacucho",
      "Museo Histórico Capitulación de Quinua",
      "Almuerzo tradicional en recreo campestre andino"
    ],
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Me gustaría visitar el pueblo alfarero de Quinua y el Obelisco histórico. ¿Me das detalles?",
    inclusions: [
      "Transporte turístico oficial ida y vuelta",
      "Guía colegiado especialista en historia andina",
      "Tickets de entrada a museos de sitio",
      "Demostración interactiva de alfarería viva"
    ],
    exclusions: [
      "Alquiler de caballos en el Santuario",
      "Propinas individuales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Recorrido por Quinua y Santuario de la Independencia",
        description: "A las 9:00 AM partimos hacia el norte de Ayacucho. Visitaremos el pueblo de Quinua para ver las pintorescas viviendas autóctonas y los talleres artesanales. Luego entraremos a la Pampa de Ayacucho, un campo natural protegido donde se yergue el monumental Obelisco para conmemorar la histórica Batalla del 9 de diciembre de 1824."
      }
    ],
    faqs: [
      {
        q: "¿Se puede subir al obelisco?",
        a: "A veces el ingreso interno está regulado por mantenimiento, pero se puede caminar a su alrededor y gozar de una de las mejores panorámicas de la serranía ayacuchana."
      }
    ]
  },
  {
    id: "vilcashuaman",
    title: "Vilcashuamán: Ciudad Incaica y Templo del Sol",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 120",
    duration: "Full Day (14 horas)",
    difficulty: "Fácil",
    description: "Explora la colosal capital de la provincia incaica fundada por Pachacútec tras derrotar a los Chancas. Admira el Ushnu (trono sagrado) de cinco plataformas y contempla el impresionante Templo del Sol sobre el cual se edificó la actual iglesia colonial de San Juan Bautista.",
    highlights: [
      "Visita al Ushnu, el trono piramidal inca más grande",
      "Templo del Sol coronado por arquitectura colonial española",
      "Excursión hacia el Complejo Hidráulico de Intihuatana",
      "Paseo con vistas panorámicas al lago Pomacocha"
    ],
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Estoy interesado en el tour arqueológico histórico a Vilcashuamán. ¿Tienen salidas los fines de semana?",
    inclusions: [
      "Transporte turístico privado de alta ruta",
      "Guía arqueológico bilingüe especializado",
      "Entradas a la zona arqueológica de Vilcashuamán e Intihuatana",
      "Almuerzo típico andino reparador"
    ],
    exclusions: [
      "Alimentos no especificados",
      "Souvenirs y artesanías locales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Templo del Sol, Ushnu Sagrado de Vilcashuamán y Laguna de Pomacocha",
        description: "Partiremos a las 6:30 AM con rumbo sur. En el recorrido llegaremos primero a Pomacocha donde apreciaremos las edificaciones incas de piedra finamente pulida del palacio, el baño del inca y la laguna de color verde azulado. Luego llegaremos a Vilcashuamán para escalar el Ushnu imperial de cinco niveles con su imponente sillón incaico de doble asiento tallado en roca viva."
      }
    ],
    faqs: [
      {
        q: "¿A qué distancia está Vilcashuamán de Ayacucho?",
        a: "Se ubica a unos 118 km de la ciudad de Ayacucho, lo que representa aproximadamente un placentero viaje de 3 horas por carretera asfaltada interandina."
      }
    ]
  },
  {
    id: "rurujurujam",
    title: "Bosque de Piedras & Cataratas de Rurujurujam",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 95",
    duration: "Full Day (10 horas)",
    difficulty: "Moderado",
    description: "Descubre un paraje de ensueño oculto en la geografía alta de Ayacucho. Maravíllate ante el bosque de megalitos esculpidos por el viento rurujurujam y refréscate contemplando las imponentes caídas de agua cristalina rodeadas de flores andinas.",
    highlights: [
      "Senderismo por formaciones rocosas gigantes",
      "Caminata guiada hacia el velo de la Catarata Rurujurujam",
      "Fotografía de aves altoandinas y flora silvestre",
      "Refrigerio andino campestre incluido"
    ],
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Deseo sumergirme en la naturaleza de Rurujurujam en Ayacucho. ¿Tienen cupos?",
    inclusions: [
      "Movilidad turística rustica adecuada para trochas andinas",
      "Guía local certificado conocedor de leyendas locales",
      "Entradas y permisos ecológicos",
      "Almuerzo menú rústico andino"
    ],
    exclusions: [
      "Equipo de trekking personal (bastones, abrigos)",
      "Propinas para el conductor local"
    ],
    itinerary: [
      {
        day: 1,
        title: "Trekking ecológico, cañón de piedra y cascadas de ensueño",
        description: "Salimos de Ayacucho a las 7:30 AM rumbo al pintoresco distrito alto. Empezaremos una caminata moderada por campos de flores andinas y queñuales hasta acceder al anfiteatro de esculturas de sillar natural que forman el Bosque de Piedras de Rurujurujam. Proseguiremos hacia el mirador natural de la catarata de 40 metros para respirar aire puro."
      }
    ],
    faqs: [
      {
        q: "¿Se requiere gran condición física?",
        a: "La caminata es a 3,600 msnm de dificultad moderada. Se aconseja estar aclimatado en Ayacucho por lo menos un día antes para disfrutarlo plenamente."
      }
    ]
  },
  {
    id: "wari",
    title: "Capital del Primer Imperio Andino: Complejo Wari",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 50",
    duration: "Half Day (5 horas)",
    difficulty: "Fácil",
    description: "Explora la monumental ciudad de piedra de la cultura Wari, el primer gran imperio que dominó los andes centrales antes del surgimiento de los Incas. Recorre sus colosales murallas de más de 10 metros, cámaras funerarias subterráneas y museos de sitio.",
    highlights: [
      "Cámaras subterráneas de piedra tallada de Monqachayoc",
      "Sectores residenciales de Vegachayuq Moqo",
      "Museo Arqueológico de Sitio con reliquias de cerámica",
      "Guía y debate arqueológico de primera línea"
    ],
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Quiero hacer el tour histórico al Complejo Arqueológico Wari en Ayacucho. ¿Qué salidas tienen?",
    inclusions: [
      "Transporte turístico completo",
      "Guía especialista en arqueología pre-incaica",
      "Boleto oficial de ingreso al sitio arqueológico de Wari y museo",
      "Guía oficial calificado en español"
    ],
    exclusions: [
      "Alimentación y bebidas embotelladas",
      "Compromisos adicionales no señalados"
    ],
    itinerary: [
      {
        day: 1,
        title: "Descubrimiento de la capital administrativa Wari",
        description: "Iniciamos a las 9:00 AM rumbo a las ruinas imperiales de Wari. Recorreremos las gigantescas edificaciones de piedra caliza, plazas hundidas ceremoniales y adentraremos en el sector de Monqachayoc, donde realeza imperial Wari sepultaba a sus dignatarios en asombrosos mausoleos bajo el subsuelo."
      }
    ],
    faqs: [
      {
        q: "¿Quién descubrió el complejo Wari?",
        a: "Julio C. Tello aportó los primeros estudios científicos en la zona, y posteriormente el arqueólogo Luis Guillermo Lumbreras identificó la ciudad como la gran capital del imperio Wari."
      }
    ]
  },
  {
    id: "vilcashuaman-express",
    title: "Vilcashuamán Express & Baños del Inca",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 110",
    duration: "Full Day (11 horas)",
    difficulty: "Fácil",
    description: "Un recorrido enfocado en maximizar el tiempo para contemplar los asombrosos Baños Termales del Inca en Intihuatana, la andenería monumental de piedra pulida y las residencias coloniales erigidas sobre bases monolíticas de la dinastía incaica.",
    highlights: [
      "Baño ceremonial del Inca tallado en bloques monolíticos",
      "Caminata por las andenerías andinas de Pomacocha",
      "Paseo con guiado rápido y compacto en la Plaza Mayor de Vilcashuamán",
      "Almuerzo rústico frente a la hermosa laguna"
    ],
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Estoy muy interesado en el tour express de Vilcashuamán y los hermosos baños del inca. ¿Tiene salidas diarias?",
    inclusions: [
      "Movilidad turística premium",
      "Guía bilingüe experto",
      "Ingresos y tickets a todas las áreas arqueológicas",
      "Kit de primeros auxilios y mate de coca reconfortante"
    ],
    exclusions: [
      "Propinas y gastos opcionales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Baños rituales de Intihuatana de Pomacocha y andenería real",
        description: "Salida muy temprano desde nuestra central a las 7:00 AM. Viajaremos a la zona arqueológica de Pomacocha para contemplar la fineza de la arquitectura imperial incaica y el baño ritual del Inca de piedra pulida. Luego, visitaremos de forma ágil la asombrosa iglesia erigida sobre el templo del Sol de Vilcashuamán."
      }
    ],
    faqs: [
      {
        q: "¿Los baños son de agua termal natural?",
        a: "Eran baños rituales de élite alimentados por manantiales de montaña. Actualmente se admira el acabado arquitectónico pero no está permitido el baño público recreativo."
      }
    ]
  },
  {
    id: "pumas-raimondi",
    title: "Bosque de Puyas de Raimondi & Titankayocc",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 85",
    duration: "Full Day (8 horas)",
    difficulty: "Fácil",
    description: "Visita el impresionante Área de Conservación Regional de Titankayocc, el bosque de Puyas de Raimondi (Titankas) más grande y denso del mundo. Admira estas colosales plantas altoandinas que tardan hasta 100 años en florecer con miles de flores majestuosas.",
    highlights: [
      "Exploración guiada del bosque denso de Titankas de Raimondi",
      "Senderismo llano ecológico a más de 3,400 metros",
      "Hermosas fotos de la floración andina de plantas de 12 metros de alto",
      "Visita corta a las enigmáticas ruinas locales circundantes"
    ],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Deseo cotizar el tour al Bosque de Puyas de Raimondi de Titankayocc en Ayacucho. ¿Tienen cupos?",
    inclusions: [
      "Transporte turístico privado de alta montaña",
      "Guía oficial de turismo bilingüe andino",
      "Ticket de ingreso al Área de Conservación Protegida",
      "Almuerzo rústico de recreo campestre"
    ],
    exclusions: [
      "Bebidas alcohólicas y extras no estipulados"
    ],
    itinerary: [
      {
        day: 1,
        title: "Inmersión en las gigantescas e históricas Puyas de Raimondi",
        description: "Salimos de Huamanga a las 8:30 AM con dirección al sur de Ayacucho. Tras un viaje pintoresco, accederemos a Titankayocc, donde miles de majestuosas puyas apuntan al infinito cielo. Caminaremos por senderos señalizados gozando de este magnífico jardín botánico natural andino."
      }
    ],
    faqs: [
      {
        q: "¿Qué altura alcanzan estas plantas?",
        a: "La Puya de Raimondi puede alcanzar fácilmente entre 10 a 14 metros de altura sumando su enorme inflorescencia cónica que contiene más de 8,000 florecillas."
      }
    ]
  },
  {
    id: "pachapupum",
    title: "Volcanes de Pachapupum y Baños Termales",
    category: "local",
    location: "Ayacucho, Perú",
    price: "S/. 130",
    duration: "Full Day (15 horas)",
    difficulty: "Moderado",
    description: "Maravíllate ante la gigantesca columna de sillar cónica de Pachapupum, una imponente estructura volcánica que cobija un cráter con pozas hirvientes de aguas termales curativas ricas en minerales, en medio de un paisaje lunar asombroso.",
    highlights: [
      "Acceso y caminata por el imponente domo volcánico de Pachapupum",
      "Baño relajante en las curativas aguas termales de azufre medicinal",
      "Fotografía de flora andina y rebaños de vicuñas de altura",
      "Box lunch andino completo para alta montaña"
    ],
    image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola Sisari! Estoy muy interesado en la mística aventura a los Volcanes de Pachapupum. ¿Me brindan detalles?",
    inclusions: [
      "Transporte de turismo exclusivo 4x4 o similar de alta ruta",
      "Guía oficial y paramédico experto de montaña",
      "Boleto oficial de ingreso a los baños termales de la zona",
      "Almuerzo andino tradicional tipo Box Lunch"
    ],
    exclusions: [
      "Gastos de uso de toallas u otros lujos termales individuales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Escalada al Volcán y relajación en pozas místicas medicinales",
        description: "Salimos muy temprano a las 4:30 AM debido a la distancia por carreteras altoandinas. En el trayecto observaremos pampas andinas repletas de alpacas y vicuñas salvajes. Al arribar a Pachapupum, contemplaremos un domo rocoso de sal esculpido por geisers. Subiremos a su cráter circular y luego tomaremos un relajante baño termoconvector en las termas aledañas para vigorizar el cuerpo."
      }
    ],
    faqs: [
      {
        q: "¿A qué altura se ubica Pachapupum?",
        a: "Está ubicado en la provincia de Huanca Sancos a una altura considerable de aproximadamente 4,000 msnm. Se aconseja abrigarse bien debido a los vientos árticos de la meseta."
      }
    ]
  },

  // NACIONALES (6 PAQUETES)
  {
    id: "paracas",
    title: "Oasis de Huacachina & Desierto de Ica",
    category: "national",
    location: "Ica, Perú",
    price: "$ 195",
    duration: "3 Días / 2 Noches",
    difficulty: "Fácil",
    description: "Siente el misticismo del desierto del sur. Disfruta del legendario Oasis de América, la Huacachina (La Aguatachina), rodeada de dunas infinitas de arena dorada. Deslízate en buggies 4x4 de alta velocidad y experimenta inolvidables atardeceres andino-costeros.",
    highlights: [
      "Paseo con adrenalina en carros areneros tubulares por el desierto de Ica",
      "Práctica guiada de Sandboarding recreativo sobre dunas monumentales",
      "Paseo relajante por el icónico bulevar del Oasis de la Huacachina",
      "Cata guiada de piscos y vinos dulces artesanales en viñedos iqueños"
    ],
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Quisiera reservar el paquete del Oasis de Huacachina e Ica con Sisari Travel. ¿Qué fechas disponen?",
    inclusions: [
      "2 noches de hotel selecto con piscina y desayunos continentales",
      "Traslados turísticos locales coordinados con choferes profesionales",
      "Tour completo de buggys areneros areneros autorizados con tablas de arena",
      "Ticket de cata industrial y artesanal de licores bandera de Ica"
    ],
    exclusions: [
      "Tasa turística municipal canón desértico (S/. 4 approx)",
      "Vuelos o buses interprovinciales a Ica"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arribo a Ica, tarde de viñedos del pisco e historia colonial",
        description: "Recepción en la estación de bus de Ica y traslado a su hotel seleccionado. Por la tarde, visitaremos las bodegas vitivinícolas artesanales de mayor prestigio histórico de la región para aprender el fascinante proceso de añejamiento del Pisco, seguido de una espectacular degustación libre."
      },
      {
        day: 2,
        title: "Tubulares de vértigo en la arena y atardecer de ensueño en el Oasis",
        description: "Mañana libre de relax en la piscina del hotel. A las 4:00 PM nos trasladaremos al Oasis de Huacachina para abordar los imponentes carros areneros 4x4. Ascenderemos por cerros empinados de arena fina para realizar saltos controlados de alta adrenalina y deslizarnos sobre tablas de Sandboard, culminando contemplando una hermosa puesta de sol desértica."
      },
      {
        day: 3,
        title: "Despedida del sol iqueño",
        description: "Desayuno en el hotel. Mañana libre para comprar tejas y chocotejas tradicionales de Ica. A la hora coordinada se realizará el traslado seguro individual a la estación terrestre de destino."
      }
    ],
    faqs: [
      {
        q: "¿De qué trata la leyenda de la Huacachina?",
        a: "Cuenta la romántica leyenda que las aguas del oasis se tornaron verdes debido al llanto de una princesa andina que lloraba la pérdida de su amado guerrero inca, cuya figura aún puede verse bajo el reflejo del agua como sirena."
      }
    ]
  },
  {
    id: "galeras-reserva",
    title: "Islas Ballestas y Reserva Marina de Paracas",
    category: "national",
    location: "Paracas, Perú",
    price: "$ 180",
    duration: "2 Días / 1 Noche",
    difficulty: "Fácil",
    description: "Navega a motor por la fosa marina de las Islas Ballestas para contemplar pingüinos de Humboldt, alegres manadas de lobos marinos y aves guaneras en su hábitat. Cruza por el desierto amarillo costero hacia los miradores de la Reserva Nacional de Paracas.",
    highlights: [
      "Paseo náutico veloz hacia el geoglifo gigante de El Candelabro",
      "Avistamiento silvestre directo de lobos marinos en Islas Ballestas",
      "Visita terrestre a la espectacular Playa Roja y Playa Yumaque",
      "Excursión ecológica con historia biológica costeña"
    ],
    image: "https://images.unsplash.com/photo-1527112841300-300fc7db86f5?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola Sisari! Estoy muy interesado en el tour marino a la Reserva de Paracas e Islas Ballestas. ¿Info por favor?",
    inclusions: [
      "1 noche de hospedaje frente al puerto con desayuno incluido",
      "Tour guiado en deslizador marítimo seguro con chaleco salvavidas oficial",
      "Transporte turístico climatizado para el circuito terrestre de Paracas",
      "Guías certificados del SERNANP con explicaciones ecosostenibles"
    ],
    exclusions: [
      "Boletos e impuestos ecológicos delSERNANP (aprox S/. 22)",
      "Almuerzos y cenas litorales frente a la playa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arribo a la bahía de Paracas y Ruta de Espejos del Desierto",
        description: "Recepción en Paracas y asignación de hotel céntrico. A la 1:30 PM iniciamos la excursión guiada por la fabulosa Reserva de Paracas, transitando por acantilados inmensos labrados por la erosión de las olas y visitando las exóticas arenas volcánicas rojas de Playa Roja."
      },
      {
        day: 2,
        title: "Expedición Náutica Ballestas, lobos marinos y retorno",
        description: "A las 8:00 AM zarpamos desde el muelle del Chaco a bordo de un deslizador turistico bi-motor. Divisaremos el misterioso geoglifo marítimo de El Candelabro, y nos asombraremos rodeando los arcos pétreos naturales que acogen a lobos marinos machos que disputan territorio frente a sus crías."
      }
    ],
    faqs: [
      {
        q: "¿Se permite caminar o descender en las Islas?",
        a: "Las Islas son santuarios intangibles estrictamente protegidos por ley. Los deslizadores se aproximan muy cerca de manera mansa pero no está permitido desembarcar para resguardar la valiosa fauna silvestre."
      }
    ]
  },
  {
    id: "nazca",
    title: "Misteriosas Líneas de Nazca y Acueductos",
    category: "national",
    location: "Nazca, Perú",
    price: "$ 230",
    duration: "2 Días / 1 Noche",
    difficulty: "Fácil",
    description: "Sobrevuela los gigantescos y fascinantes enigmas matemáticos labrados en la pampa arenosa por la civilización pre-inca Nazca. Divisa colosales figuras como el mono, la araña, el colibrí y el astronauta desde una avioneta de turismo homologada de primer nivel.",
    highlights: [
      "Sobrevuelo en avioneta panorámica ligera por las Pampas de Jumana",
      "Visita guiada a los históricos Acueductos de Cantalloc",
      "Tour arqueológico por los talleres de cerámica y hornos de oro Nazca",
      "Excursión hacia los miradores terrestres de altura de María Reiche"
    ],
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Solicito reservar el inolvidable sobrevuelo a las soberbias Líneas de Nazca de Sisari Travel. ¿Tienen disponibilidad?",
    inclusions: [
      "1 noche de alojamiento turístico de calidad en Nazca",
      "Boleto oficial certificado de sobrevuelo (30-35 minutos de vuelo)",
      "Guía oficial de turismo para visitas arqueológicas en tierra",
      "Traslado privado local hotel - aeródromo con chofer asignado"
    ],
    exclusions: [
      "Impuesto aeroportuario del Aeródromo de Nazca (aproximadamente S/. 30)",
      "Alimentación libre diurna"
    ],
    itinerary: [
      {
        day: 1,
        title: "Acueductos milenarios de Cantalloc e ingeniería prehispánica Nazca",
        description: "Recepción en Nazca y check-in en el hotel. Por la tarde, visitaremos los sorprendentes Acueductos de Cantalloc, colosales pozos helicoidales hidráulicos de piedra pulida edificados hace más de 1,500 años por la civilización Nazca que captan agua pura del subsuelo para la agricultura."
      },
      {
        day: 2,
        title: "Gran Sobrevuelo a las Líneas de Nazca y retorno",
        description: "Traslado al aeródromo local muy temprano. Cumpliendo estrictos protocolos aeronáuticos, abordaremos una aeronave moderna con ventanas amplias e independientes. Gozaremos de un vuelo inolvidable trazando círculos perfectos para admirar los geoglifos de la araña, el cóndor, y el enigmático astronauta grabados en pleno desierto de siles."
      }
    ],
    faqs: [
      {
        q: "¿La avioneta genera mareo?",
        a: "Para fotografiar las figuras con total precisión, la aeronave realiza virajes cerrados de izquierda y derecha alternativamente. Se sugiere ayunar previamente o ingerir pastillas contra el cinetismo médico (Gravol) 45 minutos antes de abordar."
      }
    ]
  },
  {
    id: "oxapampa",
    title: "Bosques y Cascadas de Oxapampa",
    category: "national",
    location: "Pasco, Perú",
    price: "$ 240",
    duration: "4 Días / 3 Noches",
    difficulty: "Fácil",
    description: "Sumérgete en el paraíso bio-diverso del Parque Nacional Yanachaga Chemillén. Oxapampa fusiona la naturaleza exuberante de la ceja de selva con la singular arquitectura, bailes y gastronomía heredados de los colonos austro-alemanes.",
    highlights: [
      "Visita a la Catarata del Río Tigre y nado refrescante",
      "Recorrido por las casas coloniales tirolesas de Pozuzo",
      "Visita a fincas cafeteras y degustación de queso y miel de la zona",
      "Danzas folclóricas locales y caminatas en bosques de niebla"
    ],
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Deseo información sobre el viaje a la Selva de Oxapampa. ¿Tienen paquetes familiares?",
    inclusions: [
      "3 noches en cabaña rústica alpina con desayuno tradicional",
      "Guiado oficial durante todo el circuito de selva alta",
      "Movilidad turística privada para excursiones internas",
      "Visita completa a Pozuzo, Chontabamba y Oxapampa",
      "Ingreso a parques naturales e industrias artesanales"
    ],
    exclusions: [
      "Pasajes de buses interprovinciales desde Lima o Huancayo",
      "Cenas y comidas típicas adicionales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bienvenida a Oxapampa y ruta de Chontabamba",
        description: "Recepción en el terminal terrestre de Oxapampa y traslado al hotel. Comenzamos explorando el distrito de Chontabamba, cruzaremos el puente colgante sobre el Río Chontabamba y visitaremos el recreo turístico El Wharapo para aprender el proceso de la caña de azúcar y destilados. Entraremos a la mística Planta de Lácteos Floralp para catar riquísimos quesos maduros y mantequillas cremosas locales."
      },
      {
        day: 2,
        title: "Exploración de Pozuzo: La única colonia Austro-Alemana del mundo",
        description: "Salida a las 7:30 AM rumbo a Pozuzo. Pasaremos a través del fabuloso cañón de Huancabamba con vistas de cascadas mágicas como Rayantambo y Torrebamba. Al arribar a Pozuzo, visitaremos la hermosa Iglesia de San José, el Puente Guillermo II y deleitaremos la mirada con los bailes típicos vieneses y el tradicional almuerzo de salchichas y knödel bávaro con cerveza artesanal local."
      },
      {
        day: 3,
        title: "Bosques de niebla de Yanachaga y Catarata del Río Tigre",
        description: "Día dedicado al ecoturismo. Haremos trekking de baja dificultad en las faldas del Parque Nacional Yanachaga Chemillén, admirando gran cantidad de orquídeas y mariposas exóticas. Seguiremos el curso del Río Tigre para llegar a una hermosa catarata de más de 30 metros donde podremos tomar un hidromasaje natural."
      },
      {
        day: 4,
        title: "Cuna del Café y retorno",
        description: "Visita a una finca cafetera tradicional para catar los granos selectos de especialidad exportadora de la selva alta peruana. Mañana de compras de mermelada y artesanías austriacas en el centro cívico y posterior traslado al terminal para abordar el bus de regreso."
      }
    ],
    faqs: [
      {
        q: "¿De qué clima es Oxapampa?",
        a: "Tiene un clima templado cálido, húmedo y semicálido. Durante el día brilla un sol espléndido de selva alta (22-26°C) pero las noches pueden ser frescas. Se aconseja llevar rompeviento y repelente de mosquitos."
      }
    ]
  },
  {
    id: "machupicchu",
    title: "Santuario Histórico de Machu Picchu",
    category: "national",
    location: "Cusco, Perú",
    price: "$ 480",
    duration: "4 Días / 3 Noches",
    difficulty: "Moderado",
    description: "Siente la energía mística del imperio incaico. Recorre las imponentes murallas líticas del Cusco colonial, asómbrate en las terrazas agrícolas del majestuoso Valle Sagrado de los Incas y asciende hacia la indomable cumbre mundial de la Ciudadela de Machu Picchu.",
    highlights: [
      "Visita guiada oficial al majestuoso Santuario Inca de Machu Picchu",
      "Tren escénico y panorámico Expedition desde Ollantaytambo",
      "City Tour histórico por la imponente Catedral, Qorikancha y Sacsayhuamán",
      "Excursión completa de día entero por el Valle Sagrado de los Incas"
    ],
    image: "/src/assets/images/sisari_machupicchu_1779988993493.png",
    whatsAppText: "¡Hola! Quisiera coordinar el paquete de Machu Picchu con Sisari Travel. ¿Tienen tarifas especiales?",
    inclusions: [
      "3 noches en hoteles de 3 estrellas en Cusco y Aguas Calientes con desayunos festivos",
      "Boleto Turístico de Cusco (BTC) oficial para ruinas y palacios incas",
      "Ingreso prioritario con ticket y guía colegiado certificado a Machu Picchu",
      "Pasajes de tren de ida y vuelta coordinados en clase Expedition",
      "Buses ecológicos oficiales Consettur de subida y bajada al santuario"
    ],
    exclusions: [
      "Vuelos Lima - Cusco - Lima",
      "Almuerzos y cenas no listados explícitamente"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arribo imperial, aclimatación y City Tour Histórico",
        description: "Recepción en el aeropuerto de Cusco y traslado al hotel con mate de coca caliente. A las 1:30 PM iniciamos el City Tour visitando el glorioso Templo del Sol (Qorikancha), la imponente fortaleza ciclópea de Sacsayhuamán con bloques de hasta 120 toneladas, Q'enqo y Tambomachay."
      },
      {
        day: 2,
        title: "Maravillas del Valle Sagrado Inca e hilanderas tradicionales",
        description: "A las 8:00 AM partimos a Pisac para contemplar el mercado artesanal indio y andenerías imperiales. Seguiremos con almuerzo buffet buffet en Urubamba, visitando por la tarde a la fortaleza viviente de cantería de Ollantaytambo, para subir al tren con rumbo a Aguas Calientes."
      },
      {
        day: 3,
        title: "Amanecer trascendental en la Ciudadela Sagrada",
        description: "Abordamos el bus para subir las cerradas curvas de montaña. Recorreremos de la mano de un guía calificado los sectores del Templo del Cóndor, la Plaza Sagrada y el Reloj solar (Intihuatana). Por la tarde tomamos el tren de retorno a la mística ciudad del Cusco."
      },
      {
        day: 4,
        title: "Despedida del Imperio Incaico",
        description: "Desayuno buffet y traslado privado exclusivo al aeropuerto internacional Alejandro Velasco Astete."
      }
    ],
    faqs: [
      {
        q: "¿Exigen pasaporte para entrar a Cusco?",
        a: "Los peruanos o residentes de la Comunidad Andina solo requieren DNI vigente física. Los turistas internacionales sí deben portar obligatoriamente su Pasaporte vigente."
      }
    ]
  },
  {
    id: "iquitos",
    title: "Selva Exótica de Iquitos y Río Amazonas",
    category: "national",
    location: "Iquitos, Perú",
    price: "$ 320",
    duration: "3 Días / 2 Noches",
    difficulty: "Fácil",
    description: "Vive una experiencia selvática auténtica navegando por el río navegable más ancho del mundo, el Amazonas. Alójate en un eco-lodge místico rodeado de jungla lluviosa, avista delfines rosados y descubre el misticismo botánico medicinal de la selva virgen del Perú.",
    highlights: [
      "Navegación guiada en busca de delfines rosados del Amazonas",
      "Caminata diurna y nocturna por el bosque lluvioso primario",
      "Visita en canoa a la tribu nativa Yagua de rituales selváticos",
      "Paseo con canoas para pescar pirañas tradicionales del río"
    ],
    image: "https://images.unsplash.com/photo-1549692520-acc6622b22b1?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Estoy súper interesado en el increíble paquete de Selva de Iquitos con Sisari Travel. ¿Tienen alojamientos con piscina?",
    inclusions: [
      "2 noches en cabañas rústicas con baño privado integradas al bosque (Eco-Lodge)",
      "Traslados fluviales en botes rápidos y transfers terrestres directos",
      "Alimentación completa tipo bufet buffet amazónico (desayuno, almuerzo, cena)",
      "Paseos y guiados profesionales con equipo botánico de seguridad (botas)"
    ],
    exclusions: [
      "Pasaje aéreo Lima - Iquitos - Lima",
      "Bebidas y licores nativos en el bar del lodge"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arribo fluvial, almuerzo típico exótico y caminata nocturna de insectos",
        description: "Bienvenida en Iquitos, traslado al muelle fluvial de Bellavista Nanay para abordar botes típicos. Navegaremos por el fabuloso río Amazonas hacia el Lodge ecológico. Almorzaremos un buffet tradicional de juane, cecina y tacacho. Por la noche, caminaremos con linternas de montaña para registrar tarántulas gigantes y ranas exóticas cantoriles."
      },
      {
        day: 2,
        title: "Avistamiento místico de Delfines Rosados, y pesquería de pirañas",
        description: "Nos despertaremos temprano con cantos de aves salvajes. Saldremos en bote por afluentes en busca del fascinante Delfín Rosado y delfín gris del Amazonas. Almorzaremos y por la tarde realizaremos una demostración de arquería nativa silvestre con cerbatanas de la etnia nativa de los Yaguas."
      },
      {
        day: 3,
        title: "Retorno ecológico, Mercado de Belén de Iquitos y despedida",
        description: "Desayuno copioso, tiempo libre para canotaje o senderismo aéreo. Retornaremos en bote veloz a Iquitos para hacer una parada guiada en la célebre Casa del Hierro de Eiffel y el mercado de Belén antes del traslado oficial seguro al aeropuerto."
      }
    ],
    faqs: [
      {
        q: "¿Hay señal de telefonía o internet en el lodge?",
        a: "Es una aventura de inmersión para desintoxicarse del mundillo digital. Solo hay electricidad y Wi-Fi solar básico en la zona común de recepción por horas limitadas."
      }
    ]
  },

  // INTERNACIONALES (3 PAQUETES)
  {
    id: "buenos-aires",
    title: "Buenos Aires: Tango & Tradición Gaucha",
    category: "international",
    location: "Buenos Aires, Argentina",
    price: "$ 750",
    duration: "5 Días / 4 Noches",
    difficulty: "Fácil",
    description: "Experimenta la sofisticación de la hermosa 'París de América'. Disfruta de un auténtico show de tango profesional clásico de arrabal, degusta jugosos asados de carnes premium en Puerto Madero y camina por las coloridas calles del barrio de Caminito.",
    highlights: [
      "Cena Show de Tango espectacular de gala en San Telmo",
      "City Tour tradicional: Plaza de Mayo, Casa Rosada, Recoleta y La Boca",
      "Excursión con crucero en catamarán por el Delta del Tigre majestuoso",
      "Día de campo en una estancia gaucha tradicional con carnes libres asadas"
    ],
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Solicito cotización para el viaje a Buenos Aires de Sisari Travel. ¿Qué incluye el plan?",
    inclusions: [
      "4 noches de alojamiento en hotel 4 estrellas bien ubicado en Recoleta o Palermo",
      "Traslados privados aeropuerto internacional de Ezeiza (Ida y Vuelta)",
      "City Tour tradicional de contrastes con transporte y guía oficial",
      "Espectáculo artístico premium de tango en La Ventana con cena de carnes premium y bebidas",
      "Día completo Fiesta Gaucha en Estancia Santa Susana con asado criollo y show de caballería",
      "Navegación lacustre en barco turístico por el Delta del Tigre"
    ],
    exclusions: [
      "Vuelos internacionales Lima - Buenos Aires - Lima",
      "Impuesto de tasa ecotasa turística de hoteles",
      "Cenas adicionales libres"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arribo a Buenos Aires y check-in en Recoleta",
        description: "Recepción especial y traslado privado al hotel seleccionado. En la tarde daremos un paseo libre para visitar la bellísima librería El Ateneo Grand Splendid construida en un teatro de ópera."
      },
      {
        day: 2,
        title: "City Tour Histórico y Sensualidad de Gala de Tango",
        description: "Recorrido por la histórica Plaza de Mayo, Casa Rosada, el Cabildo y el pintoresco e histórico pasaje de Caminito en La Boca. Al caer la noche, disfrutaremos de una cena-show de tango en San Telmo con bailarines consagrados."
      },
      {
        day: 3,
        title: "Día completo: Fiesta Gaucha en las Pampas Argentinas",
        description: "Viajaremos al campo para vivir tradiciones gauchas. Nos recibirán con empanadas fritas criollas, asado de carnes premium ilimitado a las brasas y shows de destreza ecuestre tradicional en grandes estancias."
      },
      {
        day: 4,
        title: "Navegación majestuosa por el Delta del Tigre",
        description: "Abordaremos un catamarán turístico para navegar el laberinto de ríos e islas arboladas que forman el delta del río Paraná. Conoceremos las elegantes viejas mansiones construidas en el agua."
      },
      {
        day: 5,
        title: "Retorno a Lima",
        description: "Desayuno en el hotel y traslado privado seguro oficial al aeropuerto internacional Ezeiza de retorno."
      }
    ],
    faqs: [
      {
        q: "¿Los peruanos necesitamos pasaporte o visa para ir a Argentina?",
        a: "No requieres visa de turismo. Gracias a los convenios de la Comunidad Andina y del Mercosur, puedes ingresar a Argentina presentando únicamente tu DNI físico peruano o pasaporte."
      }
    ]
  },
  {
    id: "colombia-cali",
    title: "Cali Salsa & Selva del Pacífico",
    category: "international",
    location: "Cali y San Cipriano, Colombia",
    price: "$ 620",
    duration: "4 Días / 3 Noches",
    difficulty: "Moderado",
    description: "Déjate envolver por el calor y compás de la Capital Mundial de la Salsa, Cali. Sumérgete en senderos naturales de aventura de la selva virgen del Pacífico en San Cipriano, deslizándote por ríos de aguas mansas sobre neumáticos tradicionales gigantes.",
    highlights: [
      "Clase privada de Salsa Caleña con bailarines campeones mundiales",
      "Excursión hacia la Reserva Natural San Cipriano por las místicas 'Brujitas' de tren",
      "Nado natural recreativo y tubería fluvial en las cascadas de agua pura selvática",
      "Paseo urbano nocturno por el histórico Barrio de San Antonio y colinas de monumentos"
    ],
    image: "https://images.unsplash.com/photo-1583531172005-814191b8b6c0?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Estoy muy interesado en el paquete de Salsa y Selva de Cali de Sisari Travel. ¿Tienen salidas para grupos pequeños?",
    inclusions: [
      "3 noches de hotel boutique spa de primer nivel con desayunos locales colombianos",
      "Traslados privados aeropuerto internacional Alfonso Bonilla - hotel - aeropuerto",
      "Paseo con transporte rústico místico ferroviario 'brujitas' ida y vuelta a San Cipriano",
      "Almuerzo selvático tradicional cocinado con sazón pacífica de coco fresco",
      "Entradas, guías andinos ecológicos locales capacitados de selva",
      "Clase de baile rítmico caleño de una hora con instructor personalizado"
    ],
    exclusions: [
      "Vuelos Lima - Cali - Lima",
      "Bebidas espirituosas exóticas fuera de la alimentación estipulada"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arribo a Cali, paseo por el Barrio San Antonio colonial y clase de Salsa",
        description: "Recepción turística y traslado privado a su hotel. Por la tarde pasearemos por San Antonio rodeados de fachadas de tejas barrocas y miradores. En la noche, tendremos nuestra espectacular clase privada personalizada de Salsa para desatar las piernas con puro sabor caleño."
      },
      {
        day: 2,
        title: "Aventura Salvaje en San Cipriano: Viaje místico en 'Brujitas'",
        description: "A las 7:30 AM viajamos rumbo a la Reserva Forestal San Cipriano. Abordaremos las célebres 'Brujitas', carritos motorizados artesanales sobre rústicas rieles de tren que cruzan túneles e inmensos paisajes selváticos. Nos deslizaremos en boyas gigantes por el hermoso río transparente, visitando espectaculares caídas de agua."
      },
      {
        day: 3,
        title: "Estatua de Cristo Rey, gastronomía caleña y fiesta",
        description: "Recorrido urbano por el majestuoso cerro de las Tres Cruces, la gigantesca estatua de Cristo Rey que vigila el valle y degustación de sabajón o luladas cítricas. Noche libre opcional para disfrutar del místico ambiente bailable del club Juanchito."
      },
      {
        day: 4,
        title: "Despedida de la capital salsera",
        description: "Desayuno, mañana libre para recuerdos de artesanías y cafés selectos del Valle del Cauca, seguido de transfer coordinado al aeropuerto."
      }
    ],
    faqs: [
      {
        q: "¿Qué son las 'Brujitas' mecánicas?",
        a: "Son ingeniosos ingenios locales formados por tablones de madera con rodamientos sobre las vías férreas de la selva impulsados de forma segura por una motocicleta, constituyendo el único medio fascinante de ingreso a este santuario natural recóndito."
      }
    ]
  },
  {
    id: "mexico-ruinas",
    title: "Ruinas de México & Pirámides de Teotihuacán",
    category: "international",
    location: "CDMX, México",
    price: "$ 695",
    duration: "5 Días / 4 Noches",
    difficulty: "Fácil",
    description: "Explora las raíces divinas en el místico Teotihuacán, la monumental Ciudad de los Dioses azteca. Admira las colosales Pirámides del Sol y la Luna, y recorre los fascinantes pasajes del centro histórico de CDMX complementado con música tradicional viva.",
    highlights: [
      "Guiado turístico profesional en la Calzada de los Muertos y Pirámides",
      "Alegre paseo en Trajinera decorada por canales floridos de Xochimilco",
      "Visita mística al Templo de la Basílica de la Virgen de Guadalupe",
      "Caminata cultural por Coyoacán con acceso prioritario al Museo Frida Kahlo"
    ],
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&auto=format&fit=crop&q=80",
    whatsAppText: "¡Hola! Estoy muy interesado en el paquete de Ruinas de México con Sisari Travel. ¿Me envían itinerarios por favor?",
    inclusions: [
      "4 noches de hotel 4 estrellas céntrico en Ciudad de México",
      "Traslado privado Aeropuerto - hotel - aeropuerto",
      "Entradas guiadas arqueológicas a la Ciudad de los Dioses (Teotihuacán)",
      "Paseo privado en Trajinera en los canales de Xochimilco con comida incluida",
      "Acceso y boletos para la Casa Azul del Museo de Frida Kahlo en Coyoacán",
      "Guiado certificado multilingüe y seguro de tránsito turístico"
    ],
    exclusions: [
      "Boletos aéreos de Lima a CDMX",
      "Seguro médico internacional libre"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bienvenida a México y Centro del Zócalo",
        description: "Recepción en el aeropuerto y traslado exclusivo. En la tarde caminaremos por el imponente centro histórico azteca que abarca la Catedral Mayor, el Palacio de Bellas Artes y vestigios del místico Templo Mayor precolombino."
      },
      {
        day: 2,
        title: "Basílica de Guadalupe y Pirámides de Teotihuacán",
        description: "Día religioso e histórico. Conoceremos el sagrado lienzo milagrero de la Guadalupana en su moderna Basílica circular, continuando hacia Teotihuacán para andar por la calzada y conocer los secretos de la obsidiana y las pirámides."
      },
      {
        day: 3,
        title: "Canales de Xochimilco con Trajineras e intimidad en Coyoacán",
        description: "Subiremos a coloridas trajineras típicas para navegar los legendarios canales agrícolas flotantes mientras degustamos antojitos mexicanos. Al atardecer pasaremos por el barrio bohemio de Coyoacán para conocer la mística Casa Azul de Frida Kahlo."
      },
      {
        day: 4,
        title: "Bosque de Chapultepec y Polanco",
        description: "Mañana guiada por el majestuoso Museo de Antropología azteca, seguido de paseo recreativo a pie y tarde de compras de dulces tradicionales e iconografía de catrinas mexicanas."
      },
      {
        day: 5,
        title: "Despedida y retorno a Lima",
        description: "Desayuno en el hotel y posterior traslado en servicio privado al aeropuerto internacional para abordar el vuelo de retorno."
      }
    ],
    faqs: [
      {
        q: "¿Se exige visa especial para peruanos?",
        a: "Sí, el gobierno mexicano impuso visa de turismo para peruanos. En Sisari Travel te damos auxilio prioritario estructurando tus vouchers, reservas del plan de vuelo y cronogramas para tu cita consular exitosa."
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Vanessa Huamán",
    role: "Viajera Local (Lima)",
    comment: "Viajar a Millpu con Sisari Travel fue una experiencia fabulosa. Son súper organizados, se nota que conocen cada rincón de Ayacucho. El almuerzo de trucha fresca estuvo riquísimo y el guía nos ayudó muchísimo en las caminatas de altura. ¡100% recomendados!",
    rating: 5,
    date: "Hace 2 semanas",
    avatarSeed: "vanessa"
  },
  {
    name: "Carlos Palomino",
    role: "Turista de Aventura (Cusco)",
    comment: "Elegimos a Sisari para nuestro viaje familiar a Oxapampa. El chofer fue muy prudente, el guía hablaba perfectamente y el hospedaje excelente. Tienen más de 10 años en el mercado y esa experiencia transmite demasiada confianza.",
    rating: 5,
    date: "Hace 1 mes",
    avatarSeed: "carlos"
  },
  {
    name: "Mariana Restrepo",
    role: "Honeymooners (Colombia)",
    comment: "Hicimos con Sisari el paquete de Cusco y Machu Picchu. Todo estuvo coordinado al milímetro: los trenes, los traslados y el hotel. Una agencia de primera categoría instalada en Ayacucho que opera a nivel internacional. Excelente servicio.",
    rating: 5,
    date: "Hace 3 semanas",
    avatarSeed: "mariana"
  }
];

export const BRAND_COLORS = {
  primaryPink: "#e12d8a", // Fuchsia pink from the floral logo
  secondaryOrange: "#f58220", // Warm orange center of the logo
  neutralDark: "#2c2c2c", // Sophisticated charcoal gray for typography
  neutralLight: "#fcfbfb", // Off-white cream background
  pinkLight: "#fdf2f8", // Soft background pink tint
  orangeLight: "#fff7ed" // Soft background orange tint
};
