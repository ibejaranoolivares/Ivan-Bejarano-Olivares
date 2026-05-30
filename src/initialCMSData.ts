import { BlogPost, CMSContent, BotConfig, CRMLead } from "./types";

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-millpu-secrets",
    titleEs: "Guía Secreta de Millpu: Cómo evitar multitudes y capturar la foto perfecta",
    titleEn: "Millpu's Secret Guide: How to Avoid Crowds and Capture the Perfect Shot",
    subtitleEs: "Planifica tu viaje de ensueño a las pozas de agua turquesa más asombrosas de Ayacucho.",
    subtitleEn: "Plan your dream trip to Ayacucho's most amazing turquoise natural ponds.",
    contentEs: "Las Aguas Turquesas de Millpu son consideradas una de las maravillas naturales más impresionantes de los andes peruanos. Sin embargo, para disfrutarlas plenamente y tomar fotos nítidas sin decenas de turistas de fondo, es fundamental planificar el horario correcto.\n\n### 1. El secreto de la luz solar\nPara que el agua luzca con un azul turquesa verdoso intenso, el sol debe dar directamente en el cañón de piedra caliza. Esto ocurre principalmente entre las 10:00 AM y la 1:30 PM. Antes o después, la sombra de los acantilados oscurece las aguas.\n\n### 2. La mejor temporada de viaje\nVisita Millpu estrictamente en la estación seca, de mayo a noviembre. En época de lluvias, el arrastre de lodo tiñe el río de color marrón de forma natural.\n\n### 3. Qué empacar obligatoriamente:\n- Zapatillas antideslizantes con buena cocada.\n- Cortavientos y gorro para el viento de la sierra alta.\n- Snacks, abundante agua y bloqueador ecológico.",
    contentEn: "Millpu's Turquoise Waters are widely considered one of the most stunning natural wonders of the Peruvian Andes. However, to truly enjoy them and capture pristine photos without crowds, timing is everything.\n\n### 1. The Sunlight Factor\nFor the water to exhibit its famous intense turquoise hue, the sun must shine directly into the white limestone canyon. This window occurs between 10:00 AM and 1:30 PM. Outside of these hours, mountain shadows obscure the ponds.\n\n### 2. Best Travel Season\nVisit Millpu strictly during the dry season, from May to November. During rainy months, heavy mountain runoff turns the river brownish.\n\n### 3. Crucial Packing Checklist:\n- Trekking shoes with strong grip.\n- Windbreakers and a warm wool beanie for the high altitude winds.\n- Eco-friendly sunscreen and light trail snacks.",
    image: "/src/assets/images/sisari_millpu_hero_1779988973258.png",
    category: "Destinos",
    date: "2026-05-15",
    readTimeEs: "5 min de lectura",
    readTimeEn: "5 min read",
    author: "Elena Sisari"
  },
  {
    id: "blog-ceramica-quinua",
    titleEs: "El origen sagrado de las iglesias de cerámica en los techos de Quinua",
    titleEn: "The Sacred Origin of Ceramic Churches on Quinua's Rooftops",
    subtitleEs: "Descubre la mística leyenda alfarera detrás de las icónicas casitas de barro en Ayacucho.",
    subtitleEn: "Discover the mystical pottery legend behind Ayacucho's iconic clay houses.",
    contentEs: "Al caminar por las resplandecientes callejuelas empedradas del pintoresco pueblo de Quinua, lo primero que atrapa la mirada son las pequeñas iglesias y toritos de arcilla colocados sobre las tejas de casi cada casa.\n\nEsta tradición ancestral no es puramente estética; está impregnada de un profundo misticismo andino. Los maestros artesanos alfareros explican que colocar una pequeña iglesia de arcilla bendecida protege el hogar de los malos espíritus, atrae la prosperidad económica familiar y mantiene la armonía con la Pachamama (Madre Tierra).\n\nCada elemento en la cerámica tiene un significado específico, desde la posición de la cruz hasta las figuras ornamentales de alforjas de flores. Es un testimonio vivo del sincretismo hispano-andino.",
    contentEn: "Walking through the cobblestone streets of the picturesque town of Quinua, the first detail that catches your eye is the miniature clay churches and little bulls set atop almost every rooftop.\n\nThis ancestral tradition is not merely decorative; it is steeped in deep Andean spirituality. Master ceramicists explain that placing a blessed clay church on the roof protects the home from negative spirits, safeguards family fortune, and preserves harmony with Pachamama (Mother Earth).\n\nEvery structural element in the pottery has a exact symbolic purpose. It is a living proof of Spanish-Andean cultural syncretism.",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=80",
    category: "Cultura",
    date: "2026-05-22",
    readTimeEs: "4 min de lectura",
    readTimeEn: "4 min read",
    author: "Mateo Quispe"
  },
  {
    id: "blog-soroche-tips",
    titleEs: "Cómo ganarle al soroche: Remedios tradicionales y científicos para la altura",
    titleEn: "Beating Altitude Sickness: Traditional and Scientific Remedies",
    subtitleEs: "Atraviesa los majestuosos andes peruanos sin dolores de cabeza ni fatiga innecesaria.",
    subtitleEn: "Travel through the majestic Peruvian Andes without headaches or unneeded fatigue.",
    contentEs: "El mal de altura -conocido localmente en Perú como 'soroche'- es una respuesta natural del cuerpo cuando se viaja sobre los 2,500 metros sobre el nivel del mar, donde la presión atmosférica disminuye.\n\n### 1. El Remedio Milenario: El mate de coca\nLas hojas de la sagrada planta de coca contienen alcaloides naturales que mejoran la absorción de oxígeno en los pulmones. Bebe dos tazas calientes de mate de coca nada más llegar a tu hotel.\n\n### 2. Alimentación muy ligera\nLa digestión a gran altura es sumamente lenta. Evita cenar carnes pesadas o frituras la primera noche en Ayacucho o Cusco.\n\n### 3. Hidratación y Descanso absoluto\nToma abundante agua mineral e hidrátate bien. Duerme al menos 3 horas de siesta al llegar antes de caminar o realizar esfuerzos físicos intensos.",
    contentEn: "Altitude sickness -locally known in Peru as 'soroche'- is a standard physical reaction when ascending above 2,500 meters (8,200 feet), where atmospheric oxygen density drops.\n\n### 1. The Heritage Remedy: Hot Coca Tea\nLeaves of the ancient coca plant contain organic keys that boost oxygen absorption inside your lungs. Sip a warm cup immediately upon arriving at your destination.\n\n### 2. Avoid Heavy Dinners\nDigestion in high environments is notoriously slow. Steer clear of rich meat or fried foods during your first night in Ayacucho or Cusco.\n\n### 3. Hydrate & Strictly Rest\nDrink lots of still mineral water. Take an absolute 3-hour resting nap right after check-in, avoiding early physical efforts.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    category: "Consejos",
    date: "2026-05-27",
    readTimeEs: "6 min de lectura",
    readTimeEn: "6 min read",
    author: "Dra. Sofía Vílchez"
  },
  {
    id: "blog-sarhua-tablas",
    titleEs: "El renacer de las Tablas de Sarhua: Arte que narra historias familiares de los Andes",
    titleEn: "The Rebirth of Sarhua's Painted Boards: Andean Heritage and Familial Art",
    subtitleEs: "Conoce el fascinante pueblo donde las vigas de madera se convierten en crónicas pintadas de amor y tradición.",
    subtitleEn: "Meet the charming town where wooden beams represent colored chronicles of custom and familial life.",
    contentEs: "Las Tablas de Sarhua constituyen una de las manifestaciones pictóricas más singulares de la cordillera andina. Tradicionalmente, cuando una familia construye una nueva casa en el distrito de Sarhua, sus compadres le regalan una viga de madera pintada con las historias y retratos de cada miembro de la familia, coronada por la Virgen del Asunción.\n\nEste arte declarada Patrimonio Cultural de la Nación, no solo es una pieza decorativa, sino un registro genealógico y social dinámico que sobrevive al tiempo. Hoy en día, los talleres locales de Sarhua y en Lima continúan preservando este conocimiento traspasado por generaciones de pintores tradicionales.",
    contentEn: "The Painted Boards of Sarhua represent one of the most unique folk art heritages across the Andean highlands. By custom, when a family completes a new house roof layout, close friends present a wooden plank painted with the stories, occupations, and custom portraits of each relative.\n\nThis artistic legacy, declared Peruvian National Cultural Heritage, acts as a warm genealogical archive. Now, local ateliers continue protecting the traditional pigments and ancestral stories.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    category: "Cultura",
    date: "2026-05-24",
    readTimeEs: "4 min de lectura",
    readTimeEn: "4 min read",
    author: "Raimundo Canales"
  },
  {
    id: "blog-vilcashuaman",
    titleEs: "Vilcashuamán: El glorioso centro administrativo Inca tallado sobre templos Chanca",
    titleEn: "Vilcashuamán: The Glorious Inca Administrative Hub over Chanca Lands",
    subtitleEs: "Una guía de viaje imprescindible para caminar por el imponente Ushnu piramidal y el místico Templo del Sol.",
    subtitleEn: "An essential travel log to climb the majestic pyramidal Ushnu and study the historical Temple of the Sun.",
    contentEs: "A solo unas horas por carretera pavimentada al sur de Ayacucho se localiza Vilcashuamán, uno de los centros administrativos imperiales incas más imponentes y mejor conservados del país. \n\n### El Ushnu Ceremonial\nEl Ushnu es una pirámide militar incaica de cinco plataformas superpuestas, donde el Inca dirigía rituales sagrados y desfiles. Es considerada la estructura de este tipo más grande de todo el Tahuantinsuyo.\n\n### Templo del Sol y la Luna\nSobre los muros pulidos de piedra caliza del suntuoso templo inca de adoración solar, los conquistadores españoles edificaron la Iglesia de San Juan Bautista, configurando uno de los ejemplos de sincretismo arquitectónico más impactantes del Perú.",
    contentEn: "Located just a couple of hours away from Ayacucho City is Vilcashuamán, one of the most prominent imperial administrative centers in Peru.\n\n### The Ceremonial Ushnu\nThe Ushnu is a five-tier limestone ceremonial pyramid where the sovereign ruled sacred military procedures. This stands as the largest intact structure of its category in South America.\n\n### Temple of the Sun\nDirectly over the masterfully polished blocks of the Inca worship center, Spanish conquistadors built San Juan Bautista church, completing an astonishing architectural clash.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&auto=format&fit=crop&q=80",
    category: "Destinos",
    date: "2026-05-18",
    readTimeEs: "5 min de lectura",
    readTimeEn: "5 min read",
    author: "Mateo Quispe"
  },
  {
    id: "blog-trekking-nevados",
    titleEs: "Trekking seguro por el Razuhuillca: Consejos para conquistar las alturas de Huanta",
    titleEn: "High-Altitude Trekking in Razuhuillca: Safety Guidelines for Huanta Peaks",
    subtitleEs: "Consejos prácticos de aclimatación, equipamiento técnico necesario y rutas de senderismo de lagunas.",
    subtitleEn: "Practical instructions for oxygen safety, insulation layers, and trekking among neon glacial lakes.",
    contentEs: "El imponente macizo glaciar del Razuhuillca domina el horizonte de la provincia de Huanta, con picos que rozan los 5,000 metros de altitud. Para los senderistas y amantes de la montaña, este paraje andino ofrece una de las caminatas de montaña más sobrecogedoras del altiplano.\n\n### 1. Las Lagunas de Colores\nA lo largo del recorrido, los glaciares en retroceso alimentan hermosas lagunas de tonos turquesa, esmeralda y plateado. Las más conocidas son Chinchaycocha y Yanacocha.\n\n### 2. Preparación Física y Aclimatación\nNo intentes esta ruta sin haber pasado un mínimo de 48 horas en Ayacucho caminando por zonas templadas. La aclimatación gradual es indispensable para evitar problemas de soroche agudo.\n\n### 3. Contrata Guías Oficiales\nPara caminatas que superen los 4,200 metros sobre el nivel del mar, contar con la pericia de un guía oficial de Sisari Travel provisto de botiquín completo y telecomunicaciones portátiles es de vital importancia.",
    contentEn: "The majestic glaciar peak of Razuhuillca commands the horizon above Huanta Province, standing near 5,000 meters above sea level (16,400 feet). For passionate backpackers, this represents a unique mountain trail.\n\n### 1. The High Neon Lakes\nAlong the trail, melting snow water fields fill deep turquoise and silver mineral ponds, including iconic Chinchaycocha and Yanacocha.\n\n### 2. High Altitude Safety\nDo not start this intensive hike without staying at least 48 hours for gradual acclimation in Ayacucho or Huanta.\n\n### 3. Seek Certified Outdoor Guides\nFor any hike passing 4,200 meters high, the presence of a certificated leader with medical equipment and satellite tools ensures a safe journey.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&auto=format&fit=crop&q=80",
    category: "Aventura",
    date: "2026-05-10",
    readTimeEs: "6 min de lectura",
    readTimeEn: "6 min read",
    author: "Russo Gálvez"
  }
];

export const DEFAULT_CMS_CONTENT: CMSContent = {
  officeHoursEs: "Lunes a Sábado: 8:00 AM - 8:30 PM | Domingos: 9:00 AM - 1:00 PM",
  officeHoursEn: "Monday to Saturday: 8:00 AM - 8:30 PM | Sundays: 9:00 AM - 1:00 PM",
  menuItems: [
    { id: "menu_1", labelEs: "Inicio", labelEn: "Home", type: "section", target: "inicio" },
    { id: "menu_2", labelEs: "Nosotros", labelEn: "About", type: "section", target: "nosotros" },
    { id: "menu_3", labelEs: "Paquetes", labelEn: "Packages", type: "section", target: "paquetes" },
    { id: "menu_4", labelEs: "Blog y Noticias", labelEn: "Blog & News", type: "section", target: "blog" },
    { id: "menu_5", labelEs: "Contacto", labelEn: "Contact", type: "section", target: "contacto" }
  ],
  heroSlides: [
    {
      id: "slide-millpu",
      titleEs: "Aguas Turquesas de Millpu",
      titleEn: "Turquoise Waters of Millpu",
      descEs: "La deslumbrante joya de Ayacucho. Camina entre cañones de piedra caliza blanca y descubre pozas de agua turquesa de ensueño.",
      descEn: "The dazzling jewel of Ayacucho. Walk among white limestone canyons and discover dreamy turquoise-green pools.",
      image: "/src/assets/images/sisari_millpu_hero_1779988973258.png",
      locationEs: "Ayacucho, Perú",
      locationEn: "Ayacucho, Peru",
      tagEs: "JOYA LOCAL",
      tagEn: "LOCAL GEM"
    },
    {
      id: "slide-machupicchu",
      titleEs: "Santuario de Machu Picchu",
      titleEn: "Machu Picchu Sanctuary",
      descEs: "Explora la mística ciudadela de Cusco, una de las maravillas del mundo moderno, rodeada de fascinantes nubes andinas.",
      descEn: "Explore the mystical Inca citadel of Cusco, one of the modern wonders of the world, surrounded by highland clouds.",
      image: "/src/assets/images/sisari_machupicchu_1779988993493.png",
      locationEs: "Cusco, Perú",
      locationEn: "Cusco, Peru",
      tagEs: "MARAVILLA MUNDIAL",
      tagEn: "WORLD WONDER"
    },
    {
      id: "slide-mexico",
      titleEs: "Pirámides de Teotihuacán",
      titleEn: "Teotihuacan Pyramids",
      descEs: "Conéctate con el esplendor azteca en la colosal Ciudad de los Dioses. Admira las colosales Pirámides del Sol y de la Luna.",
      descEn: "Tune in with the pre-Columbian grandeur of Mexico. Admire the colossal Pyramids of the Sun and the Moon.",
      image: "https://images.unsplash.com/photo-1518638150341-f81217277b0d?w=1200&auto=format&fit=crop&q=80",
      locationEs: "Teotihuacán, México",
      locationEn: "Teotihuacan, Mexico",
      tagEs: "HERENCIA HISTÓRICA",
      tagEn: "HISTORIC HERITAGE"
    }
  ],
  nosotrosHeadlineEs: "Diseñamos Viajes con Propósito, Soporte por IA y Autenticidad Humana",
  nosotrosHeadlineEn: "We Design Journeys with Purpose, AI Support & Human Authenticity",
  nosotrosSubtitleEs: "CONOCE EL CORAZÓN DE CECI TRAVEL",
  nosotrosSubtitleEn: "MEET THE HEART OF CECI TRAVEL",
  nosotrosDescEs: "Somos una operadora de turismo boutique nacida en la histórica ciudad de Ayacucho con más de 10 años de trayectoria diseñando experiencias excepcionales. Nos enorgullece entrelazar la planificación moderna con inteligencia artificial junto al calor humano de nuestros guías locales, promoviendo recorridos éticos y sostenibles.",
  nosotrosDescEn: "We are a boutique tour operator born in the historic city of Ayacucho with over 10 years of trajectory crafting exceptional travel plans. We take pride in merging modern AI planning features with the genuine warmth of certified local guides, promoting ethical and sustainable travels.",
  contactoHeadlineEs: "¿Listo para trazar tu próximo destino de ensueño?",
  contactoHeadlineEn: "Ready to Map Out Your Next Dream Destination?",
  contactoSubtitleEs: "CONÉCTATE CON NUESTROS ASESORES DE VIAJE",
  contactoSubtitleEn: "CONNECT WITH OUR TRUSTED TRAVEL ADVISORS",

  // Custom Editable Contacts
  phones: ["+51 987 654 321", "+51 981 112 233"],
  whatsappNumber: "+51980535383",
  whatsappText: "¡Hola! Quisiera personalizar un paquete turístico con Sisari Travel de forma directa.",
  emails: ["reservas@sisaritravel.pe", "operaciones@sisaritravel.pe"],
  addressEs: "Jirón Lima 140, 1ra Cuadra, Ayacucho, Perú",
  addressEn: "140 Jiron Lima, 1st Block, Ayacucho, Peru",
  addressMapUrl: "https://maps.google.com/?q=Jiron+Lima+140,+Ayacucho,+Peru",
  destinationFormEmail: "retabloweb@gmail.com",
  footerSloganEs: "Su operadora de turismo de confianza en la histórica Ayacucho con más de 10 años promoviendo la alfarería local, el senderismo ético y las memorias familiares por el mundo.",
  footerSloganEn: "Your trusted tour operator in historic Ayacucho with over 10 years promoting local pottery, ethical trekking, and family memories around the world.",
  footerCopyrightEs: "Sisari Travel Perú. Todos los derechos reservados.",
  footerCopyrightEn: "Sisari Travel Peru. All rights reserved.",
  logoImage: "",
  logoFooterImage: "",
  secondaryMenuItems: [
    { id: "sec_menu_1", labelEs: "🏝️ Paquetes Locales", labelEn: "🏝️ Local Tours", type: "section", target: "local" },
    { id: "sec_menu_2", labelEs: "⛰️ Paquetes Nacionales", labelEn: "⛰️ National Tours", type: "section", target: "national" },
    { id: "sec_menu_3", labelEs: "✈️ Paquetes Internacionales", labelEn: "✈️ International Tours", type: "section", target: "international" }
  ],
  
  socialLinks: {
    facebook: "https://facebook.com/cecitravelperu",
    instagram: "https://instagram.com/cecitravel.pe",
    tiktok: "https://tiktok.com/@sisaritravel",
    linkedin: "https://linkedin.com/company/ceci-travel",
    youtube: "https://youtube.com/c/cecitravelayacucho",
  },

  socialReviewsLinks: {
    google: "https://g.page/cecitravel-huamanga/review",
    facebook: "https://facebook.com/cecitravelperu/reviews",
    tripadvisor: "https://tripadvisor.com/Attraction_Review-Ayacucho",
  },

  // Certifications (8 square logo slots with links)
  certifications: [
    {
      name: "Marca Perú",
      logo: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=300&auto=format&fit=crop&q=80",
      url: "https://www.peru.info"
    },
    {
      name: "Marca Ayacucho",
      logo: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=300&auto=format&fit=crop&q=80",
      url: "https://www.gob.pe/regionayacucho"
    },
    {
      name: "CANATUR",
      logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80",
      url: "https://canaturperu.org"
    },
    {
      name: "MINCETUR",
      logo: "https://images.unsplash.com/photo-1551836021-d5d88e9218df?w=300&auto=format&fit=crop&q=80",
      url: "https://www.gob.pe/mincetur"
    },
    {
      name: "Muni. Huamanga",
      logo: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&auto=format&fit=crop&q=80",
      url: "https://www.munihuamanga.gob.pe"
    },
    {
      name: "DIRCETUR",
      logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80",
      url: "https://www.gob.pe/dirceturayacucho"
    },
    {
      name: "TripAdvisor",
      logo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
      url: "https://www.tripadvisor.com"
    },
    {
      name: "APAVIT PERÚ",
      logo: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&auto=format&fit=crop&q=80",
      url: "https://apavitperu.org"
    },
    {
      name: "PromPerú",
      logo: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=300&auto=format&fit=crop&q=80",
      url: "https://www.promperu.gob.pe"
    },
    {
      name: "IPERÚ",
      logo: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&auto=format&fit=crop&q=80",
      url: "https://www.promperu.gob.pe/iperu"
    },
    {
      name: "SERNANP",
      logo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&auto=format&fit=crop&q=80",
      url: "https://www.gob.pe/sernanp"
    },
    {
      name: "UNESCO",
      logo: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&auto=format&fit=crop&q=80",
      url: "https://unesco.org"
    }
  ],

  // Value prop, Mission, Vision
  valuePropTitleEs: "Nuestra Propuesta de Valor única",
  valuePropTitleEn: "Our Unique Value Proposition",
  valuePropDescEs: "Ofrecemos recorridos inmersivos diseñados a tu medida con el apoyo de nuestra avanzada IA planificadora, garantizando un servicio ético que remunera justamente a las comunidades locales, respeta el patrimonio cultural y ofrece asistencia humana garantizada las 24 horas del día.",
  valuePropDescEn: "We offer immersive tours customized to your style backed by our state-of-the-art AI planner, guaranteeing ethical travel that pays local communities fairly, respects cultural legacy, and provides guaranteed 24/7 direct human assistance.",
  
  misionEs: "Conectar a los exploradores del mundo con las tradiciones vivas, misterios andinos y maravillas de Ayacucho y del Perú, brindando un servicio de alta fiabilidad tecnológica pero con el compromiso y la calidez de nuestro equipo humano.",
  misionEn: "To connect global explorers with the living traditions, Andean mysteries, and wonders of Ayacucho and Peru, providing highly reliable technological service combined with the absolute commitment and warmth of our human team.",
  
  visionEs: "Liderar el sector como el operador turístico sostenible referente en Ayacucho, integrando herramientas digitales inteligentes y consolidando un turismo justo que proteja a las comunidades locales alfareras y arqueológicas.",
  visionEn: "To lead the travel sector as the benchmark sustainable tour operator in Ayacucho, merging smart digital tools and establishing direct fair trade tourism that protects local potter and archaeological communities.",

  // Representative Team (4 members)
  teamMembers: [
    {
      name: "Araceli Fernández",
      titleEs: "Gerente de Sisari Travel",
      titleEn: "Managing Director of Sisari Travel",
      descEs: "Líder apasionada con más de 12 años de liderazgo en proyectos turísticos que enlazan el patrimonio de los andes centrales con el desarrollo sostenible.",
      descEn: "Passionate leader with over 12 years of directive experience in tourism projects aligning central Andean landmarks with sustainability first.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Ruso Gonzales",
      titleEs: "Guía Oficial 1 / Guía de Turismo",
      titleEn: "Chief Certified Tour Guide",
      descEs: "Guía oficial de turismo de Sisari Travel con amplia experiencia en geografía andina e historia de Huamanga y Millpu. Su entusiasmo hace que de cada excursión una cátedra viva de cultura.",
      descEn: "Official tour guide of Sisari Travel with extensive experience in Andean geography and history of Huamanga and Millpu.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Juan Pérez",
      titleEs: "Responsable de Atención al Cliente",
      titleEn: "Customer Care & Booking Lead",
      descEs: "Encargado de canalizar tus consultas, coordinar las reservas y garantizar una atención transparente, rápida y de primer nivel las 24 horas del día.",
      descEn: "Responsible for managing traveler inquiries, coordinating schedules, and ensuring crystal-clear 24/7 dedicated customer care assistance.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Iván Bejarano Olivares",
      titleEs: "Director de Marketing de Sisari",
      titleEn: "Chief Marketing Officer",
      descEs: "Director de marketing a cargo de las estrategias de posicionamiento digital y promoción de turismo receptivo ético impulsadas por herramientas modernas.",
      descEn: "Chief of marketing responsible for our smart digital reach, and ethical tourism awareness programs.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
    }
  ],

  // Nosotros customizable cards values
  nosotrosValue1TitleEs: "Confiabilidad",
  nosotrosValue1TitleEn: "Reliability",
  nosotrosValue1DescEs: "Atención humana las 24 horas del día. Cada reserva cuenta con respaldo de pólizas de seguro de viaje de amplia cobertura andina.",
  nosotrosValue1DescEn: "Dedicated human support 24/7. Every single reservation is backed by leading corporate insurance and localized protocols.",
  nosotrosValue1Icon: "Shield",

  nosotrosValue2TitleEs: "Puntualidad",
  nosotrosValue2TitleEn: "Punctuality",
  nosotrosValue2DescEs: "Consideramos tu valioso tiempo sagrado. Manejamos un riguroso itinerario cronometrado con salidas coordinadas al minuto.",
  nosotrosValue2DescEn: "We respect your physical timeline immensely. We operate coordinated clockwork routes and professional pick-ups.",
  nosotrosValue2Icon: "Clock",

  nosotrosValue3TitleEs: "Responsabilidad",
  nosotrosValue3TitleEn: "Responsibility",
  nosotrosValue3DescEs: "Turismo ético acreditado. Trabajamos de la mano con cooperativas alfareras y artesanos andinos para redistribuir el ingreso local.",
  nosotrosValue3DescEn: "Accredited social and environmental programs. We work close with high-altitude local collectives and handcrafters.",
  nosotrosValue3Icon: "Award",

  // Legal Content (Fully editable rich paragraphs for Legalities page)
  legalPrivacyEs: "En Ceci Travel (Ceci Operadora de Turismo Turístico E.I.R.L.), valoramos profundamente tu confianza y privacidad. Nos comprometemos a proteger los datos personales que recopilas al usar nuestro Planificador de Itinerarios por IA o nuestro formulario de reserva. \n\nRecopilamos tu nombre, correo electrónico y número de contacto únicamente para gestionar las cotizaciones, procesar tus comprobantes y coordinar de forma directa las actividades de viaje en Ayacucho. Bajo ninguna circunstancia vendemos o compartimos tus registros con agencias ajenas sin tu consentimiento explícito. Tienes derecho a solicitar el acceso, modificación o retiro de tus datos enviando un email a gerencia@cecitravel.pe.",
  legalPrivacyEn: "At Ceci Travel (Ceci Operadora de Turismo Turístico E.I.R.L.), we deeply respect your trust and personal privacy. We commit to protecting the information you share when compiling our AI Itinerary Planner or booking forms. \n\nWe gather data like name, email, and phone exclusively to structure custom travel quotes, generate payment credentials, and directly direct the excursions. We never sell or exchange traveler databases. You have the right to claim access, edits, or deletion of your records by emailing gerencia@cecitravel.pe.",
  
  legalTermsEs: "Al contratar los servicios y paquetes de Ceci Travel, aceptas las siguientes cláusulas operativas: \n\n1. Las reservas de tours locales como Millpu se reconfirman abonando por lo menos el 50% de la tarifa oficial.\n2. Las ausencias injustificadas el día de salida (No Show) conllevan la pérdida total del depósito.\n3. Cancelaciones con más de 72 horas de anticipación dan derecho a cambio de fecha sin penalización alguna.\n4. La empresa no asume responsabilidad directa por demoras imprevistas del clima, bloqueos de carretera o interrupciones de fuerza mayor andina, pero se esforzará al máximo por reprogramar las actividades por seguridad de la delegación.",
  legalTermsEn: "By booking custom itineraries with Ceci Travel, you agree to the following guidelines: \n\n1. Standard tour packages (such as Millpu) are secured by wire-transferring at least 50% of the flat price.\n2. No-shows on the departure group hour will void all deposits.\n3. Cancellations submitted more than 72 hours beforehand qualify for fee-free rescheduling.\n4. While the operator is not directly liable for unforeseen severe climate anomalies or road blockades, we vow to reorganize transfers promptly to keep you extremely safe.",
  
  legalCookiesEs: "Utilizamos cookies estrictamente técnicas para guardar tus preferencias de idioma (Español o Inglés), almacenar de forma segura tus cotizaciones más recientes de manera local, y mejorar el rendimiento gráfico de nuestro asistente Sisari Bot.\n\nAl continuar navegando en nuestra operadora, consientes la instalación de estas cookies indispensables para el correcto funcionamiento tecnológico. No empleamos rastreadores invasivos de comportamiento publicitario de terceros.",
  legalCookiesEn: "We employ highly light cookies to persist your preferred language, cache recent AI itinerary results locally, and optimize the response speed of our smart bot advisor.\n\nBy continuing to browse our website, you agree to these technical files. We do not track cross-site marketing patterns.",
  
  legalNoticeEs: "La marca comercial 'Ceci Travel' y el sistema 'Sisari' son de propiedad exclusiva de Ceci Operadora de Turismo E.I.R.L., con RUC vigente en la provincia de Huamanga, Ayacucho, Perú.\n\nContamos con la licencia municipal oficial de funcionamiento de la Municipalidad Provincial de Huamanga, el registro sectorial obligatorio aprobado por la DIRCETUR, y la acreditación formal de sostenibilidad andina. Queda prohibida la reproducción de logotipos, textos de viaje o diseño sin autorización formal escrita de los administradores.",
  legalNoticeEn: "The commercial trademark 'Ceci Travel' and 'Sisari' software are proprietary assets of Ceci Operadora de Turismo E.I.R.L., registered in Huamanga, Ayacucho, Peru.\n\nWe hold active licenses validated by the Huamanga Municipality and sector registrations authorized by DIRCETUR. Any unauthorized copy of visual frames, itineraries, or text is prohibited.",
  
  legalComplaintsEs: "Conforme a lo dispuesto por el Código de Protección y Defensa del Consumidor de la República del Perú y las directivas de INDECOPI, ponemos a su disposición nuestro Libro de Reclamaciones Virtual.\n\nSi tiene un reclamo (disconformidad relacionada con la atención brindada) o una queja (malestar frente al servicio contratado), puede registrar el reclamo oficial de forma directa. Le asignaremos un número de ticket de seguimiento y daremos una respuesta fundamentada por escrito en un plazo no mayor a quince (15) días hábiles.",
  legalComplaintsEn: "Pursuant to the Consumer Protection Code of Peru and INDECOPI regulations, we host our formal Virtual Complaints Book database in this section.\n\nIf you have a claim (unhappiness with customer service) or a complaint (unhappiness with the contract itself), you can document your message here. We will assign a tracker key and supply a verified written response in less than fifteen (15) business days.",

  // Legal & Pages frontend style configurations defaults
  letterSpacing: "normal",
  lineHeight: "relaxed",
  fontSizeOffset: 0,
  legalFontFamily: "sans",
  themeBgColor: "#fbfaf8",
  themeTextColor: "#2c2c2c"
};

export const DEFAULT_BOT_CONFIG: BotConfig = {
  welcomeMessageEs: "¡Hola, viajero! Soy Sisari Bot 🌸 de Sisari Travel. ¿Deseas saber los horarios y precios de las Aguas Turquesas de Millpu, excursiones históricas de Ayacucho, o tours a Cusco y México? ¡Pregúntame con confianza!",
  welcomeMessageEn: "Hello, traveler! I am Sisari Bot 🌸 from Sisari Travel. Want to know details, prices, or itineraries for turquoise Millpu ponds, national tours to Cusco, or Mexican landmarks? Feel free to ask me!",
  botName: "Sisari Assistant Bot",
  agentRoleEs: "Asistente Virtual de Viajes",
  agentRoleEn: "Virtual Travel Assistant",
  presets: [
    {
      pattern: "millpu",
      responseEs: "¡El tour a las Aguas Turquesas de Millpu es maravilloso! Cuesta S/. 90 e incluye el transporte ida y vuelta, guía oficial, boleto de entrada a Circamarca, almuerzo de trucha fresca artesanal y balón de oxígeno de seguridad. ¿Qué fecha te gustaría reservar?",
      responseEn: "The turquoise pools of Millpu are spectacular! It is $35 (S/. 90) and features round-trip vehicle transfer, bilingual guide, entrance fee, trout lunch and high-altitude emergency kits. What date are we looking for?"
    },
    {
      pattern: "precio",
      responseEs: "Manejamos tours accesibles: City Tour Ayacucho a S/. 40, Quinua y Obelisco S/. 50, Millpu S/. 90, Cusco y Machu Picchu con hoteles y trenes desde $480. ¡Todos configurados de forma ética y con guías oficiales!",
      responseEn: "Our pricing structure is highly competitive: local Ayacucho tours start at $12 (S/. 40), full-day Millpu pools at $25 (S/. 90), national Cusco packages from $480."
    },
    {
      pattern: "horario",
      responseEs: "Nuestras salidas locales de full-day inician entre las 7:00 AM y las 8:30 AM desde nuestra oficina céntrica en Ayacucho. El City tour cuenta con turnos de mañana (9:00 AM) y tarde (2:00 PM).",
      responseEn: "Our full-day excursions start daily between 7:00 AM and 8:30 AM from our central Ayacucho headquarters. City Tours run at 9:00 AM and 2:00 PM."
    },
    {
      pattern: "cusco",
      responseEs: "Nuestro paquete a Cusco y Machu Picchu dura 4 Días / 3 Noches por $480 e incluye Cusco imperial, Sacsayhuamán, Ollantaytambo, tren escénico Expedition, entrada segura a la ciudadela y hotel boutique céntrico con desayuno.",
      responseEn: "Cusco & Machu Picchu features an elegant 4 Days / 3 Nights itinerary from $480 including trains, fast-track entrances, and boutique accommodation with rich breakfast buffet."
    }
  ]
};

export const DEFAULT_CRM_LEADS: CRMLead[] = [
  {
    id: "lead-1",
    source: "Formulario de Reserva",
    name: "Carlos Mendoza",
    phone: "+51 987 654 321",
    email: "carlos.mendoza@gmail.com",
    dateCreated: "2026-05-28",
    destination: "Aguas Turquesas de Millpu",
    travelDate: "2026-06-15",
    comments: "Deseo reservar para una familia de 4 personas. ¿Tienen descuento de niños?",
    status: "Nuevo",
    notes: "Cliente interesado en la tarifa grupal familiar.",
    assignedTo: "Representante Sisari 1"
  },
  {
    id: "lead-2",
    source: "Asistente Virtual Chatbot",
    name: "Sarah Jenkins (Bot Lead)",
    phone: "+1 415 555 2673",
    email: "sarah.j@outlook.com",
    dateCreated: "2026-05-27",
    destination: "Cusco y Machu Picchu imperial",
    comments: "Preguntó por trenes Expedition y hotel boutique de 3 estrellas.",
    status: "En Contacto",
    notes: "Enviado correo electrónico detallando el suplemento de tren Vistadome solicitado.",
    assignedTo: "Elena Sisari"
  },
  {
    id: "lead-3",
    source: "Planificador de Itinerario por IA",
    name: "Gabriela Torres",
    phone: "+51 912 345 678",
    email: "gaby.torres@yahoo.com",
    dateCreated: "2026-05-26",
    destination: "Ica, Paracas y Líneas de Nazca - 3 días",
    comments: "Generó planificador sobre desierto e Islas Ballestas con sandboarding.",
    status: "Vendido",
    notes: "¡Reserva cerrada con éxito! Adelanto del 50% recibido por Yape.",
    assignedTo: "Mateo Quispe"
  }
];
