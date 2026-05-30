import { DestinationPackage } from "../types";

// Translation dictionary for all packages
const PACKAGE_TRANSLATIONS_EN: Record<string, Partial<DestinationPackage>> = {
  "city-tour": {
    title: "City Tour Majestic Ayacucho",
    location: "Ayacucho, Peru",
    duration: "Half Day (4 hours)",
    difficulty: "Fácil" as any, // "Easy" in display
    description: "Ayacucho is world-famous as the 'City of 33 Churches' and the capital of Peruvian popular crafts. Visit historical temples, colonial arches, historic mansions, and master craft workshops showcasing wood retablos and gold filigree.",
    highlights: [
      "Ayacucho Cathedral & San Francisco de Asis Basilica",
      "Panoramic field trip to Acuchimay Scenic Overlook",
      "Colonial master house walkthrough inside Boza & Solis mansions",
      "Interactive retablo art session in the historic Barrio de Santa Ana"
    ],
    inclusions: [
      "Air-conditioned tour transport",
      "Certified local tour guide (Spanish/English available)",
      "All entry tickets to temples and overlooks",
      "Guided local visits to traditional craft workshops"
    ],
    exclusions: [
      "Personal food, beverages and souvenirs",
      "Extra personal items"
    ],
    itinerary: [
      {
        day: 1,
        title: "Colonial treasures of Huamanga & handcraft magic",
        description: "Depart at 9:00 AM or 2:00 PM. Walk through the main square to explore the 17th-century Cathedral and Santo Domingo temple. Board our tour vehicle to Acuchimay Overlook for a 360-degree panoramic view of the colonial city. Continue to Santa Ana neighborhood, famous for weaving masters and handcrafted retablos, speaking with them in their own workshops."
      }
    ],
    faqs: [
      {
        q: "Does Ayacucho really have 33 active churches?",
        a: "Yes, the city features 33 historic churches built during the Spanish colonial period, which makes it one of the largest centers of active religious art and mountain devotion in the world."
      }
    ]
  },
  "millpu": {
    title: "Turquoise Waters of Millpu",
    location: "Ayacucho, Peru",
    duration: "Full Day (12 hours)",
    difficulty: "Moderado" as any, // "Moderate"
    description: "One of Peru's most stunning natural hidden gems. Hike through a white limestone canyon to admire over 20 natural step-pools of turquoise and emerald waters fed by scenic waterfalls.",
    highlights: [
      "Guided hike around Millpu limestone step-pools",
      "Short scenic trail walkthrough the canyon",
      "High elevation lookouts for panoramic photos",
      "Traditional mountain lunch featuring fresh local trout"
    ],
    inclusions: [
      "Private roundtrip tour transport",
      "Official certified tour guide (Spanish/English/Quechua)",
      "Circamarca park entrance tickets",
      "Traditional hot lunch in a countryside restaurant",
      "First aid kit and safety oxygen cylinder"
    ],
    exclusions: [
      "Additional snacks and personal beverages",
      "Tips for the local guide",
      "Any extra unmentioned services"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journey to Circamarca, canyon trek & turquoise pools",
        description: "Depart early at 7:30 AM from our office in Ayacucho. After a scenic 3.5-hour drive through high-altitude Andean highlands, arrive at Circamarca. Begin a 30-to-45-minute trek along a crystalline river, reaching the spectacular white limestone pools. Climb up to the Ojo del Agua lookout for an unforgettable view."
      }
    ],
    faqs: [
      {
        q: "What is the best season to explore Millpu?",
        a: "The ideal dry season runs from May to December. During these months, skies are clear and the pools display their signature bright turquoise color because there is no rain to stir up silt."
      }
    ]
  },
  "quinoa": {
    title: "Historic Sanctuary of Quinua & Clay Art",
    location: "Ayacucho, Peru",
    duration: "Full Day (6 hours)",
    difficulty: "Fácil" as any,
    description: "Explore the picturesque artisan pottery village of Quinua, where clay houses feature roofs decorated with miniature ceramic churches. Walk around the Battle of Ayacucho historic 44m obelisk.",
    highlights: [
      "Clay workshop with local master ceramicists",
      "Walk around the 44-meter high obelisk at Pampa de Ayacucho",
      "Traditional Andean lunch sample",
      "Visits to the museum of site and national landmarks"
    ],
    inclusions: [
      "Comfortable tourist transport",
      "Accredited bilingual tour guide",
      "Quinua artisan master session fee",
      "All necessary tickets and credentials"
    ],
    exclusions: [
      "Artisan souvenirs purchases",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Quinua pottery immersion & Battle of Ayacucho Obelisk",
        description: "Leave Ayacucho and visit Quinua village. Watch local master craftsmen shape clay into figures. Afterward, head to the vast Pampa de Ayacucho historic meadow, the battle site that sealed Latin America's independence."
      }
    ],
    faqs: [
      {
        q: "Is Quinua situated at high altitude?",
        a: "Quinua is located at 3,390 meters above sea level. It is very close to Ayacucho, and the walk is easy, so no heavy physical acclimatization is required."
      }
    ]
  },
  "vilcashuaman": {
    title: "Vilcashuaman Inca Capital & Puya Raimondi",
    location: "Ayacucho, Peru",
    duration: "Full Day (13 hours)",
    difficulty: "Moderado" as any,
    description: "Explore a majestic archaeological citadel where Inca architecture sits directly beneath colonial Spanish structures. Marvel at the only active Inca temple pyramids and see the giant Puya Raimondi.",
    highlights: [
      "Uncover the unique Inca Temple of the Sun and Ushnu Pyramid",
      "Guided walk inside the pristine Puya Raimondi Forest",
      "Panoramic stop at the sacred lake of Pumacocha and Inca baths",
      "Traditional high-altitude lunch"
    ],
    inclusions: [
      "Full tour transport (pickup & dropoff)",
      "Official certified tour guide",
      "All archaeological park tickets and permits",
      "Traditional lunch and oxygen kit"
    ],
    exclusions: [
      "Gifts and craft purchases",
      "Tips for the driver and guide"
    ],
    itinerary: [
      {
        day: 1,
        title: "Intihuatana temple, sacred lakes & the Inca Temple of the Sun",
        description: "Depart at 6:00 AM heading south. Stop at the Intihuatana complex to view high-status Inca pools, a sacrificial stone, and a ceremonial palace. Continue to Vilcashuaman to climb the legendary Ushnu pyramid, experiencing the fusion of Inca and colonial Spanish design."
      }
    ],
    faqs: [
      {
        q: "Is Vilcashuaman far from Huamanga?",
        a: "It is about 115 kilometers south of Ayacucho. The trip takes about 3 hours each way on scenic paved roads."
      }
    ]
  },
  "rurujurujam": {
    title: "Hondores Canyon & Pikimachay Cave",
    location: "Ayacucho, Peru",
    duration: "Full Day (8 hours)",
    difficulty: "Moderado" as any,
    description: "Trek to the famous prehistoric cave of Pikimachay, where ancient stone tools dating back 14,000 years were discovered. Afterwards, marvel at the scenic cliffs and stone arches of Hondores Canyon.",
    highlights: [
      "Prehistoric walk inside Pikimachay cave",
      "Spectacular geologic arches and rock formations in Hondores",
      "Wildlife sightings including mountain eagles",
      "Traditional countryside picnic lunch"
    ],
    inclusions: [
      "Full roundtrip transport",
      "Certified archaeological and geologic guide",
      "Entrance permits",
      "Safety gear and refreshments"
    ],
    exclusions: [
      "Extra personal items"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pikimachay prehistoric walk & spectacular rock arches",
        description: "We pick you up at 8:00 AM. Explore the historic cave of Pikimachay. Afterwards, head to the Hondores valley for a beautiful 2-hour walk surrounded by scenic stone bridges, cliffs, and native plant life."
      }
    ],
    faqs: [
      {
        q: "How challenging is the walk to Pikimachay?",
        a: "The trail uphill is relatively steep but short, taking about 30 minutes. We pace ourselves with breaks, making it suitable for all adventurers."
      }
    ]
  },
  "wari": {
    title: "Wari Empire Ruins & Artisan Settlement",
    location: "Ayacucho, Peru",
    duration: "Half Day (5 hours)",
    difficulty: "Fácil" as any,
    description: "Discover the underground stone vaults of the Wari Empire, the first major Andean civilization preceding the Incas. Visit the site museum and the dynamic community artisan shops.",
    highlights: [
      "Walk through the underground stone tombs of the Wari elite",
      "Examine ancient obsidian and ceramic artifacts in the site museum",
      "Explore the historic Wari city walls",
      "Artisan demonstration in Santa Ana"
    ],
    inclusions: [
      "Bilingual tour transport",
      "Specialist archaeological guide",
      "All entrance permits",
      "Water bottle and snacks"
    ],
    exclusions: [
      "Lunch meals"
    ],
    itinerary: [
      {
        day: 1,
        title: "Lost tomb structures of the Wari Empire and site findings",
        description: "Depart Ayacucho for a 40-minute drive. Walk along the ancient cobblestone passages of the Wari citadel, stopping at the subterranean royal tombs. Visit the local site museum before returning."
      }
    ],
    faqs: [
      {
        q: "Who were the Wari builders?",
        a: "The Wari were a powerful pre-Inca expansionist empire that thrived from 600 to 1000 AD across most of the Peruvian Andes, pioneering advanced road systems and massive stone architecture."
      }
    ]
  },
  "vilcashuaman-express": {
    title: "Vilcashuaman & Intihuatana Express",
    location: "Ayacucho, Peru",
    duration: "Full Day (10 hours)",
    difficulty: "Moderado" as any,
    description: "An express version of the Inca capital tour, focusing on key historic highlights: the Sun Temple, the Ushnu pyramid, and the peaceful scenic lakeside of Intihuatana.",
    highlights: [
      "Fast-track tour of the Sun Temple and colonial cathedral",
      "Walk to the top of the 5-tiered Inca pyramid",
      "Scenic stop at the Intihuatana archaeological site"
    ],
    inclusions: [
      "Tour transport and local guide",
      "All entry tickets",
      "Oxygen support and first-aid kits"
    ],
    exclusions: [
      "Personal meals"
    ],
    itinerary: [
      {
        day: 1,
        title: "Fast-track Inca archaeological exploration and ruins",
        description: "Depart early at 6:30 AM. Arrive at the scenic Intihuatana lake to explore the royal stone baths and palaces. Afterwards, visit Vilcashuaman's main temple complex and return directly to your hotel."
      }
    ],
    faqs: [
      {
        q: "What is the difference versus the regular tour?",
        a: "This package skips the Puya Raimondi hiking forest to maximize time exploring the sacred Inca archaeological structures and imperial stone carvings."
      }
    ]
  },
  "pumas-raimondi": {
    title: "Puya Raimondi Forest & Pumacocha Lagoon",
    location: "Ayacucho, Peru",
    duration: "Full Day (11 hours)",
    difficulty: "Moderado" as any,
    description: "An incredible nature tour through high-altitude moorlands. Stand beneath the giant Puya Raimondi plants (which can grow up to 12 meters tall) and discover the peaceful shores of Pumacocha Lake.",
    highlights: [
      "Stand beside the magnificent giant Puyas in full bloom",
      "Explore the stone pools and elite terraces of Pumacocha Lake",
      "Unique birdwatching in remote Andean ecosystems"
    ],
    inclusions: [
      "Full tour transport",
      "Environmental specialist guide",
      "Snacks and safety oxygen kits"
    ],
    exclusions: [
      "Tips and dinner"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pumacocha lakeside ruins and the giant Puya Raimondi walk",
        description: "Depart Ayacucho at 7:00 AM. Travel up into the high-altitude valley to walk among the towering Puya Raimondi plants. Stop at Pumacocha Lake to explore the stone towers and bath terraces of the Inca elites."
      }
    ],
    faqs: [
      {
        q: "What is special about the Puya Raimondi?",
        a: "It is a rare giant bromeliad native to the high Andes, taking 80 to 100 years to bloom with thousands of flowers before dropping its seeds and finishing its life cycle."
      }
    ]
  },
  "pachapupum": {
    title: "Pachapupum Volcanic Hot Springs",
    location: "Ayacucho, Peru",
    duration: "Full Day (14 hours)",
    difficulty: "Exigente" as any,
    description: "Venture deep into the high Andes to discover a unique dome-shaped volcanic geyser. Climb its natural steps and bathe in healing thermo-mineral pools rich in sulfur and iron.",
    highlights: [
      "Stand on top of the majestic, naturally carved volcanic stone dome",
      "Bathe in natural warm mineral pools",
      "Trek through high-altitude volcanic plains"
    ],
    inclusions: [
      "4x4 direct tour transport",
      "Highly experienced local mountain guide",
      "Entrance tickets to hot springs",
      "Breakfast and traditional lunch options"
    ],
    exclusions: [
      "Personal warm clothing rentals"
    ],
    itinerary: [
      {
        day: 1,
        title: "Scenic drive across high plains, hot springs and volcano climb",
        description: "Depart early at 5:00 AM. Drive through stunning high-altitude plains, spotting herds of llamas. Arrive at Pachapupum to witness the mineral springs and enjoy a relaxing, therapeutic soak."
      }
    ],
    faqs: [
      {
        q: "Should I pack warm clothes for this trip?",
        a: "Yes, Pachapupum is located above 4,000 meters, where mountain temperatures can drop quickly. Bring layers, windproof clothes, and a swimsuit."
      }
    ]
  },
  "ayacucho-mystic-4d3n": {
    title: "Mystic Ayacucho: Discovery & Traditions (4D/3N)",
    location: "Ayacucho, Peru",
    duration: "4 Days / 3 Nights",
    difficulty: "Moderado" as any,
    description: "An immersive 4-day travel package designed to show you the best of Ayacucho. Discover the scenic colonial streets of Huamanga, the turquoise waters of Millpu, and the historic Quinua sanctuary.",
    highlights: [
      "Complete guided city tour of historic temples and artisan workshops",
      "Full day tour to the breathtaking Turquoise Waters of Millpu",
      "Excursion to the pottery village of Quinua and scenic battlefield",
      "Comfortable 3-star central hotel with daily breakfast"
    ],
    inclusions: [
      "Airport or bus station arrival transfers",
      "3 nights at a selected central hotel",
      "All scheduled daily tours with professional guides",
      "Coconuts and refreshing drinks on path"
    ],
    exclusions: [
      "Interprovincial plane or bus tickets",
      "Unscheduled meals"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Ayacucho and Majestic City Tour", description: "Receive a warm welcome at the airport or station and transfer to your hotel. In the afternoon, explore Huamanga’s colonial churches, visit a master artisan workshop in Santa Ana, and enjoy city views from Acuchimay Overlook." },
      { day: 2, title: "Full-Day Exploration of Millpu's Turquoise Waters", description: "Set off early to the incredible natural pools of Millpu. Enjoy a short scenic hike, capture stunning photos from the overlooks, and savor a fresh local trout lunch." },
      { day: 3, title: "Quinua Pottery Village and historic battlefield", description: "Travel to the peaceful village of Quinua. Paint your own ceramic piece in a workshop and visit the Pampa de Ayacucho obelisk." },
      { day: 4, title: "Traditional Breakfast and Departure Transfer", description: "Enjoy fresh artisan bread for breakfast at your hotel. Take some free time to shop for souvenirs before your transfer to the airport or station." }
    ],
    faqs: [
      { q: "Is this tour package suitable for young families?", a: "Yes, it is designed with a comfortable pace, making it perfect for families, couples, and friends looking to experience both nature and culture." }
    ]
  },
  "ayacucho-completo-5d4n": {
    title: "Complete Authentic Ayacucho Route (5D/4N)",
    location: "Ayacucho, Peru",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderado" as any,
    description: "The ultimate 5-day itinerary in Ayacucho. Explore historic ruins, colonial streets, turquoise waters, the Inca capital of Vilcashuaman, and traditional artisanal workshops.",
    highlights: [
      "Panoramic city tour of colonial temples and artisan workshops",
      "Full day excursion to the incredible turquoise pools of Millpu",
      "Journey to the majestic Inca ruins of Vilcashuaman and Ushnu pyramid",
      "Visit to the Wari archaeological ruins and Quinua pottery village"
    ],
    inclusions: [
      "All arrival and departure transfers (airport/station)",
      "4 nights at a high-quality central hotel",
      "All scheduled daily tours with transportation and entry tickets",
      "Oxygen equipment and first-aid kits"
    ],
    itinerary: [
      { day: 1, title: "Arrival Transfer & Colonial City Tour", description: "Enjoy a transfer to your hotel in Ayacucho. Discover the stone vaults and colonial streets of historic Huamanga in the afternoon." },
      { day: 2, title: "Expedition to Millpu's Stunning Turquoise Pools", description: "Trek through the white canyon of Circamarca to witness the breathtaking turquoise water pools and waterfalls." },
      { day: 3, title: "Historical Journey to Vilcashuaman and Sun Temple", description: "Explore the sacred Inca Temple of the Sun, climb the Ushnu pyramid, and view the sacred Pumacocha ruins." },
      { day: 4, title: "Wari Ruins Citadel and Quinua Pottery Village", description: "Discover the ancient stone tombs of the pre-Inca Wari Empire, then visit Quinua's clay workshops." },
      { day: 5, title: "Local Breakfast & Airport Departure Transfer", description: "Enjoy a traditional breakfast before checking out and taking your private transfer back to the airport." }
    ],
    faqs: [
      { q: "When are hotel breakfasts served?", a: "Daily buffet or continental breakfast is served at the hotel from 6:30 AM to 9:00 AM, ahead of morning tour departures." }
    ]
  },
  "paracas": {
    title: "Huacachina Oasis & Ica Desert Adventure",
    location: "Ica, Peru",
    duration: "3 Days / 2 Nights",
    difficulty: "Fácil" as any,
    description: "Experience the magic of the southern desert. Visit the legendary Huacachina Oasis, go sandboarding, ride 4x4 dune buggies, and watch unforgettable desert sunsets.",
    highlights: [
      "Ride 4x4 dune buggies across the giant Ica dunes",
      "Go sandboarding down massive desert sand dunes",
      "Stroll along the beautiful Huacachina Oasis boulevard",
      "Taste traditional Peruvian Pisco and wines at local vineyards"
    ],
    inclusions: [
      "2 nights at a selected hotel with a pool and breakfast",
      "All local transfers with professional drivers",
      "Guided buggy ride and sandboarding session with gear",
      "Wine and Pisco tasting session"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Ica and Pisco Tasting Tour", description: "Meet your guide at the bus station and transfer to your hotel. Visit historic wine cellars to discover the Pisco-making process." },
      { day: 2, title: "Adrenaline Buggy Ride & Sunset at the Oasis", description: "Enjoy a relaxing morning. In the afternoon, head into the desert for a dune buggy ride and watch the sunset over the dunes." },
      { day: 3, title: "Traditional Sweet Treats & Departure", description: "Enjoy breakfast at the hotel, take some free time to shop for traditional sweets, and transfer to the bus station." }
    ]
  },
  "galeras-reserva": {
    title: "Ballestas Islands & Paracas Marine Reserve",
    location: "Paracas, Peru",
    duration: "2 Days / 1 Night",
    difficulty: "Fácil" as any,
    description: "Take a boat tour to the Ballestas Islands to spot penguins, sea lions, and sea birds in their natural habitat. Explore the Paracas National Reserve's scenic desert beaches.",
    highlights: [
      "Boat ride around the Ballestas Islands and El Candelabro geoglyph",
      "Spot penguins and sea lions close-up",
      "Visit the dramatic Playa Roja (Red Beach) and Yumaque beaches"
    ],
    inclusions: [
      "1 night at a beachfront hotel with breakfast",
      "Boat tour to the Ballestas Islands with safety equipment",
      "Guided land tour of the Paracas National Reserve",
      "All park entry fees and professional guides"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Paracas National Reserve Tour", description: "Arrive in Paracas. Take a guided land tour of the dramatic coastal cliffs, stopping to see the natural rock formations and beaches." },
      { day: 2, title: "Ballestas Islands Boat Expedition & Wildlife Watching", description: "Board a safe twin-motor speedboat to view the giant El Candelabro geoglyph and observe families of sea lions in the islands." }
    ]
  },
  "nazca": {
    title: "Mysterious Nazca Lines & Aqueducts Tour",
    location: "Nazca, Peru",
    duration: "2 Days / 1 Night",
    difficulty: "Fácil" as any,
    description: "Fly over the world-famous Nazca Lines to see giant desert geoglyphs created by the ancient Nazca civilization. See figures like the monkey, spider, and hummingbird from above.",
    highlights: [
      "35-minute scenic flight over the colossal Nazca Lines",
      "Visit the remarkable Cantalloc subterranean aqueducts",
      "Accredited local guides and safe, certified aircraft"
    ],
    inclusions: [
      "1 night at a boutique hotel with pool and breakfast",
      "Scenic flight ticket and professional pilot-guide checks",
      "Guided land tour of Cantalloc aqueducts and gold workshops"
    ],
    itinerary: [
      { day: 1, title: "Cantalloc Aqueducts Walk & Gold Workshops", description: "Arrive in Nazca. Tour the incredible stone-lined underground aqueducts built by the Nazca culture 1,500 years ago." },
      { day: 2, title: "Nazca Lines Flight and Departure Search", description: "Transfer to the airfield for your scenic flight. View the mysterious drawings across the desert floor before preparing to depart." }
    ]
  },
  "oxapampa": {
    title: "Oxapampa Austro-German Valley & Jungle Wonders",
    location: "Oxapampa, Peru",
    duration: "3 Days / 2 Nights",
    difficulty: "Fácil" as any,
    description: "Discover a unique blend of Austro-German heritage and Peruvian high-jungle culture. Hike to beautiful waterfalls and taste delicious local coffee, honey, and cheeses.",
    highlights: [
      "Hike to the beautiful El Tigre waterfall",
      "Taste organic high-altitude coffee and local cheeses",
      "Admire the unique Tyrolean wooden architecture in Pozuzo"
    ],
    inclusions: [
      "2 nights at a traditional wooden cabin hotel with pool and breakfast",
      "Guided excursions with local environmental guides",
      "Waterfalls entrance tickets and honey farm tastings"
    ],
    itinerary: [
      { day: 1, title: "Arrival in the Alpine Valley of Oxapampa", description: "Welcome transfer to your cabin-hotel. Explore the town's unique wooden square, church, and taste local dairy products." },
      { day: 2, title: "Day Tour to Pozuzo: Tyrol Colony and Suspension Bridges", description: "Travel to Pozuzo. Walk across suspension bridges, see the Tyrolean buildings, and enjoy traditional dances." },
      { day: 3, title: "Tigre Waterfall & Return Trip", description: "Take a scenic walk to El Tigre Waterfall, swim in its natural pools, and return to the station for departure." }
    ]
  },
  "machupicchu": {
    title: "Majestic Machu Picchu & Sacred Valley Express",
    location: "Cusco, Peru",
    duration: "3 Days / 2 Nights",
    difficulty: "Fácil" as any,
    description: "Uncover the magic of the Inca Empire. Explore the historic streets of Cusco, tour the beautiful Sacred Valley, and ride the scenic train to climb to the citadel of Machu Picchu.",
    highlights: [
      "Complete guided exploration of the world wonder Machu Picchu",
      "Ride the beautiful Expedition/Vistadome train along the Urubamba river",
      "Tour the Sacred Valley including Ollantaytambo and Pisac ruins"
    ],
    inclusions: [
      "2 nights of selected hotel stays with breakfasts",
      "All train, bus, and entrance tickets to Machu Picchu",
      "Private transfers and official archaeological guides"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cusco and Sacred Valley Tour", description: "Arrive in Cusco. Journey down into the Sacred Valley to explore Pisac’s craft market and Ollantaytambo’s stone terraces." },
      { day: 2, title: "Machu Picchu Inca Citadel Guided Exploration", description: "Board the train to Aguas Calientes and take the bus to Machu Picchu. Enjoy a fully guided tour of terraces, temples, and palaces." },
      { day: 3, title: "Cusco City Tour and Departure", description: "Explore Cusco’s stone streets, see the Temple of the Sun (Qorikancha), and take your transfer to the airport." }
    ]
  },
  "iquitos": {
    title: "Exotic Amazon Jungle of Iquitos (3D/2N)",
    location: "Iquitos, Peru",
    duration: "3 Days / 2 Nights",
    difficulty: "Moderado" as any,
    description: "Venture deep into the legendary Amazon rainforest. Stay in an eco-lodge surrounded by nature, take boat trips down the Amazon River, and join nocturnal jungle walks.",
    highlights: [
      "Stay in an eco-friendly jungle lodge with all meals included",
      "Spot pink river dolphins on the Amazon River",
      "Join guided day and night wildlife walks in the jungle"
    ],
    inclusions: [
      "Boat transfers from Iquitos port to the lodge",
      "2 nights of cabin lodging with three daily meals included",
      "Guided boat excursions, jungle walks, and search for river dolphins"
    ],
    itinerary: [
      { day: 1, title: "Amazon Boat Cruise & Night Jungle Hike", description: "Board a boat down the Amazon River to reach the lodge. Join an exciting night walk to spot caimans, tarantulas, and night birds." },
      { day: 2, title: "Wildlife Exploration, Canopy Walk & Dolphin Watching", description: "Trek through the jungle to learn about medicinal plants, ride a canopy walk, and take a sunset boat trip to spot pink dolphins." },
      { day: 3, title: "Indigenous Community Visit & Return", description: "Visit a native community to learn about ancestral customs, join a blowgun demonstration, and return to Iquitos airport." }
    ]
  },
  "buenos-aires": {
    title: "Tango & Culture Buenos Aires (Argentina)",
    location: "Buenos Aires, Argentina",
    duration: "4 Days / 3 Nights",
    difficulty: "Fácil" as any,
    description: "Enjoy a memorable getaway in the 'Paris of South America'. Discover beautiful boulevards, colorful neighborhoods like La Boca, and enjoy a professional Tango dinner-show.",
    highlights: [
      "Attend a spectacular historical Tango Dinner & Show with live orchestra",
      "Fully guided tour of La Boca, Caminito, San Telmo, and Recoleta",
      "Comfortable central hotel stay in Buenos Aires"
    ],
    inclusions: [
      "3 nights of boutique hotel lodging with breakfasts",
      "Premium Tango Dinner & Show including gourmet meals and drinks",
      "All private airport transfers and guided city tours"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Buenos Aires & Historical Evening Walk", description: "Meet your driver at the airport and transfer to your hotel. Take a relaxing evening walk down Avenida 9 de Julio." },
      { day: 2, title: "Colorful Caminito, San Telmo Antiques & Recoleta", description: "Take a city tour of San Telmo’s square, look around Caminito’s colorful homes, and visit Recoleta’s grand cemetery." },
      { day: 3, title: "Free Shopping Day & Premium Tango Dinner-Show", description: "Enjoy a free day to explore Palermo. In the evening, enjoy a spectacular, professional live Tango show and dinner." },
      { day: 4, title: "Local Breakfast & Airport Departure Transfer", description: "Savor a traditional breakfast with pastries before checking out and transferring back to Ezeiza International Airport." }
    ]
  },
  "colombia-cali": {
    title: "Salsa, Coffee & Culture Cali (Colombia)",
    location: "Cali, Colombia",
    duration: "4 Days / 3 Nights",
    difficulty: "Fácil" as any,
    description: "Experience the lively heart of Colombia's World Capital of Salsa. Learn to dance from world champions and visit local coffee farms.",
    highlights: [
      "Private Salsa class with World Salsa Champions",
      "Guided tour of a colonial coffee farm with private tastings",
      "Tour San Antonio neighborhood and historic downtown plazas"
    ],
    inclusions: [
      "3 nights of central hotel lodging with breakfasts",
      "All private transfers, private dance workshops, and farm entries",
      "Local bilingual guides for all tours"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Cali & San Antonio Sunset Walk", description: "Transfer from the airport to your hotel. Take a walk through hilly, historic San Antonio and enjoy a cup of fresh Colombian coffee." },
      { day: 2, title: "Private Salsa Master Class & Night Dancing Experience", description: "Take a private salsa class to learn basic steps or refine your moves. In the evening, visit a local salsa club." },
      { day: 3, title: "Day Tour to a Traditional Coffee Farm", description: "Visit a coffee plantation to learn about the bean-growing process, roast your own beans, and enjoy a fresh tasting." },
      { day: 4, title: "Gourmet Breakfast & Departure Transfer", description: "Enjoy breakfast at the hotel before checking out and taking your private transfer back to the airport." }
    ]
  },
  "mexico-ruinas": {
    title: "Mayan Ruins of Yucatan & Cozumel Cenotes (Mexico)",
    location: "Quintana Roo, Mexico",
    duration: "5 Days / 4 Nights",
    difficulty: "Fácil" as any,
    description: "Unveil the ancient Mayan culture on this wonderful Yucatan tour. Walk through the ruins of Tulum, swim in pristine subterranean cenotes, and relax on Cozumel beaches.",
    highlights: [
      "Tour the ancient cliffside Mayan archaeological fortress of Tulum",
      "Swim in natural crystal-clear underground cenotes",
      "Ferry route to beautiful beaches in Cozumel"
    ],
    inclusions: [
      "4 nights at a beach resort with daily buffet breakfasts",
      "Guided archaeological tours with all entrance tickets",
      "Ground and ferry transfers listed in the itinerary"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Quintana Roo & Beachfront Sunset", description: "Arrive at Cancun airport and transfer to your hotel. Open some fresh coconut drinks and watch the Caribbean sunset." },
      { day: 2, title: "Tulum Mayan Ruins Guided Walk & Subterranean Cenote Swim", description: "Explore Tulum's spectacular ocean-facing ruins, then cool down with a swim in a beautiful freshwater cenote." },
      { day: 3, title: "Ferry Voyage to Cozumel Beach & Snorkeling", description: "Take the ferry to Cozumel for a relaxing catamaran sailing and snorkeling tour over coral reefs." },
      { day: 4, title: "Free Relaxing Beach Resort Day", description: "Enjoy a free day to relax on the white sands of Playa del Carmen or shop on famous Fifth Avenue." },
      { day: 5, title: "Departure Breakfast & Airport Transfer", description: "Enjoy a final Mexican breakfast before checking out and taking your transfer back to Cancun airport." }
    ]
  }
};

const DIFFICULTY_MAP: Record<string, string> = {
  "Fácil": "Easy",
  "Moderado": "Moderate",
  "Exigente": "Challenging"
};

// Main translator function for Package values
export function getTranslatedPackage(pkg: DestinationPackage, language: "es" | "en"): DestinationPackage {
  if (language === "es") {
    return pkg;
  }

  // Pre-defined translation
  const savedTranslation = PACKAGE_TRANSLATIONS_EN[pkg.id];
  if (savedTranslation) {
    return {
      ...pkg,
      title: savedTranslation.title || pkg.title,
      location: savedTranslation.location || pkg.location,
      duration: translateDuration(savedTranslation.duration || pkg.duration),
      difficulty: translateDifficulty(savedTranslation.difficulty || pkg.difficulty) as any,
      description: savedTranslation.description || pkg.description,
      highlights: savedTranslation.highlights || pkg.highlights,
      inclusions: savedTranslation.inclusions || pkg.inclusions,
      exclusions: savedTranslation.exclusions || pkg.exclusions,
      itinerary: savedTranslation.itinerary || pkg.itinerary,
      faqs: savedTranslation.faqs || pkg.faqs
    };
  }

  // General Fallback for Custom User Packages added through console
  return {
    ...pkg,
    title: translateString(pkg.title),
    location: translateString(pkg.location),
    duration: translateDuration(pkg.duration),
    difficulty: translateDifficulty(pkg.difficulty) as any,
    description: translateString(pkg.description),
    highlights: pkg.highlights.map(h => translateString(h)),
    inclusions: pkg.inclusions.map(i => translateString(i)),
    exclusions: pkg.exclusions.map(e => translateString(e)),
    itinerary: pkg.itinerary.map(it => ({
      ...it,
      title: translateString(it.title),
      description: translateString(it.description)
    })),
    faqs: pkg.faqs.map(f => ({
      q: translateString(f.q),
      a: translateString(f.a)
    }))
  };
}

// Translate common difficulty strings
export function translateDifficulty(diff: string): string {
  return DIFFICULTY_MAP[diff] || diff;
}

// Translate common duration strings
function translateDuration(dur: string): string {
  let res = dur;
  res = res.replace(/Días/g, "Days").replace(/Día/g, "Day");
  res = res.replace(/Noches/g, "Nights").replace(/Noche/g, "Night");
  res = res.replace(/Medio Día/g, "Half Day");
  res = res.replace(/horas/g, "hours").replace(/hora/g, "hour");
  res = res.replace(/Full Day/gi, "Full Day");
  return res;
}

// Dictionary to translate dynamic or custom backend strings
const COMMON_DICTIONARY: Record<string, string> = {
  "Ayacucho, Perú": "Ayacucho, Peru",
  "Ica, Perú": "Ica, Peru",
  "Paracas, Perú": "Paracas, Peru",
  "Nazca, Perú": "Nazca, Peru",
  "Oxapampa, Perú": "Oxapampa, Peru",
  "Cusco, Perú": "Cusco, Peru",
  "Iquitos, Perú": "Iquitos, Peru",
  "Argentina": "Argentina",
  "Fácil": "Easy",
  "Moderado": "Moderate",
  "Exigente": "Challenging",
  "Ver Detalle": "View Details",
  "Reservar": "Book Now",
  "CONTACTAR ASESOR": "SPEAK TO AN EXPERT",
  "CONÓCENOS": "GET TO KNOW US",
  "Sobre Nosotros": "About Us",
  "Contactar Asesor": "Speak to an Expert",
  "Ver Más Historia": "Read Full Story",
  "Inicio": "Home",
  "Contacto": "Contact",
  "Nosotros": "About Us"
};

// Translate simple static database or user strings if needed
export function translateString(str: string): string {
  if (!str) return str;
  if (COMMON_DICTIONARY[str]) return COMMON_DICTIONARY[str];

  // Try some basic replacements
  let translated = str;
  translated = translated.replace(/Perú/g, "Peru");
  translated = translated.replace(/Sánchez/g, "Sanchez");
  translated = translated.replace(/Fácil/gi, "Easy");
  translated = translated.replace(/Moderado/gi, "Moderate");
  translated = translated.replace(/Exigente/gi, "Challenging");
  translated = translated.replace(/Día/g, "Day").replace(/Días/g, "Days");
  translated = translated.replace(/Noche/g, "Night").replace(/Noches/g, "Nights");

  return translated;
}
