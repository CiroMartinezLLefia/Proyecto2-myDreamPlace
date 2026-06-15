// central data repository for my Dream Place web application

window.myDreamPlaceData = {
  destinations: [
    {
      id: "australia",
      name: "Australia",
      properties: 2246,
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
      alt: "Sydney harbour skyline, Australia"
    },
    {
      id: "japan",
      name: "Japan",
      properties: 1278,
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80",
      alt: "Mount Fuji with cherry blossoms and pagoda, Japan"
    },
    {
      id: "new-zealand",
      name: "New Zealand",
      properties: 480,
      image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80",
      alt: "Coastal cliffs and ocean, New Zealand"
    },
    {
      id: "greece",
      name: "Greece",
      properties: 320,
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
      alt: "White and blue buildings overlooking the Aegean Sea, Greece"
    }
  ],

  inspirations: [
    {
      title: "Sydney's 10 most fashionable 5 star hotels",
      description: "Browse the fastest growing tourism sector in the heart of Australia tourism capital .....",
      image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=700&q=80",
      alt: "Sydney cityscape at night"
    },
    {
      title: "Top cities for Vegan Travellers",
      description: "Top sites where you do not have to worry about being a vegan. Our tourist guide is here...",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80",
      alt: "Cosy restaurant interior with warm lighting"
    },
    {
      title: "World's top destinations during and post covid timeline",
      description: "Pandemic is still intact and will be here for a longer time. Here's where your next destination...",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
      alt: "Dramatic mountain landscape with clouds"
    }
  ],

  hotels: [
    {
      id: "lakeside-motel",
      name: "Lakeside Motel Warefront",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80"
      ],
      rating: 4.5,
      reviews: 1200,
      address: "Lorem ipsum road, Tantruim-2322, Melbourne, Australia",
      overview: [
        "Featuring free WiFi throughout the property, Lakeside Motel Warefront offers accommodations in Lakes Entrance, 19 mi from Bairnsdale. Free private parking is available on site.",
        "Each room at this motel is air conditioned and comes with a flat-screen TV. You will find a kettle, toaster and a microwave in the room. Each room is fitted with a private bathroom. Guests have access to barbecue facilities and a lovely large lawn area. Metung is 6.8 mi from Lakeside Motel Warefront, while Paynesville is 14 mi from the property.",
        "Couples in particular like the location – they rated it 9.2 for a two-person trip."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "💼", name: "Business Services" },
        { icon: "❄️", name: "Air Conditioning" },
        { icon: "🏊", name: "Swimming pool" },
        { icon: "🚗", name: "Parking available" },
        { icon: "👍", name: "Top rated in area" }
      ],
      explore: [
        { name: "Hotel Penselvenyia", distance: "2 min drive", icon: "imgs/LogoBlue.png" },
        { name: "Travis Bakery store house", distance: "10 min drive", icon: "imgs/Location.png" },
        { name: "Olivia Johnson Garden", distance: "15 min drive", icon: "imgs/Location.png" },
        { name: "Norman Opera Circus", distance: "18 min drive", icon: "imgs/Location.png" },
        { name: "Rockdeset hotel", distance: "32 min drive", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "twin-multiple",
          name: "Standard twin bed, Multiple beds",
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
          size: "300 sq ft",
          sleeps: "Sleeps 3",
          beds: "1 double bed and 1 twin bed",
          pricePerNight: 130
        },
        {
          id: "twin-queen",
          name: "Standard twin bed, 1 Queen bed",
          image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
          size: "300 sq ft",
          sleeps: "Sleeps 3",
          beds: "1 Queen bed",
          pricePerNight: 145
        }
      ],
      pricePerNightOriginal: 160,
      pricePerNight: 130,
      promoBadge: "Book now and receive 15% off",
      discountBadge: "5% off",
      popular: true,
      type: "hotel",
      budgetRange: "100-200"
    },
    {
      id: "recce-graham",
      name: "Recce Graham resort",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80"
      ],
      rating: 4.5,
      reviews: 1278,
      address: "Graham Street 45, Melbourne, Australia",
      overview: [
        "A premium resort experience offering luxurious amenities, beachfront views, and highly rated dining services.",
        "Perfect for families and couples looking for a relaxed getaway with top-tier hospitality."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🏊", name: "Swimming pool" },
        { icon: "❄️", name: "Air Conditioning" },
        { icon: "🚗", name: "Parking available" }
      ],
      explore: [
        { name: "Beachfront Boardwalk", distance: "1 min walk", icon: "imgs/Location.png" },
        { name: "Downtown Cafes", distance: "5 min drive", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "resort-suite",
          name: "Ocean View Resort Suite",
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
          size: "450 sq ft",
          sleeps: "Sleeps 4",
          beds: "2 Queen beds",
          pricePerNight: 350
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 350,
      promoBadge: null,
      discountBadge: null,
      popular: true,
      type: "resort",
      budgetRange: "200-500"
    },
    {
      id: "fireside-dinners",
      name: "Fireside Dinners",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80"
      ],
      rating: 4.0,
      reviews: 480,
      address: "Fireside Lane 102, Melbourne, Australia",
      overview: [
        "Nestled in the cozy corners of the city, Fireside Dinners offers a unique lodge experience combined with a world-renowned rustic kitchen."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "❄️", name: "Air Conditioning" },
        { icon: "🔥", name: "Fireplace" }
      ],
      explore: [
        { name: "Mountain Trail Head", distance: "10 min walk", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "rustic-lodge",
          name: "Rustic Lodge Room",
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
          size: "250 sq ft",
          sleeps: "Sleeps 2",
          beds: "1 King bed",
          pricePerNight: 180
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 180,
      promoBadge: null,
      discountBadge: null,
      popular: true,
      type: "residence",
      budgetRange: "0-200"
    },
    {
      id: "oculous-inn",
      name: "Oculous Inn Stay",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80"
      ],
      rating: 4.8,
      reviews: 320,
      address: "Ocean Breeze Road 88, Melbourne, Australia",
      overview: [
        "An boutique stay with breathtaking ocean views and premium service design for discerning travelers."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🏊", name: "Swimming pool" },
        { icon: "❄️", name: "Air Conditioning" },
        { icon: "🚗", name: "Parking available" }
      ],
      explore: [
        { name: "Seaside Lookout", distance: "2 min walk", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "boutique-ocean",
          name: "Boutique Ocean Suite",
          image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
          size: "400 sq ft",
          sleeps: "Sleeps 2",
          beds: "1 King bed",
          pricePerNight: 280
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 280,
      promoBadge: null,
      discountBadge: null,
      popular: true,
      type: "hotel",
      budgetRange: "200-500"
    },
    {
      id: "julia-dens",
      name: "Julia Dens Resort",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=900&q=80"
      ],
      rating: 4.5,
      reviews: 1200,
      address: "Julia Boulevard 11, Melbourne, Australia",
      overview: [
        "Indulge in a premium beachfront sanctuary. Julia Dens Resort offers a perfect blend of relaxation, spa facilities, and active sports."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🏊", name: "Swimming pool" },
        { icon: "💼", name: "Spa Services" }
      ],
      explore: [
        { name: "Julia Lagoon", distance: "5 min walk", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "resort-villa",
          name: "Luxury Beachfront Villa",
          image: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=600&q=80",
          size: "500 sq ft",
          sleeps: "Sleeps 4",
          beds: "2 Double beds",
          pricePerNight: 240
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 240,
      promoBadge: null,
      discountBadge: null,
      popular: false,
      type: "resort",
      budgetRange: "200-500"
    },
    {
      id: "aghnim-scepter",
      name: "Aghnim Scepter Hotel",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&q=80"
      ],
      rating: 4.6,
      reviews: 1200,
      address: "Sorcery Avenue 505, Melbourne, Australia",
      overview: [
        "A magical hotel stay in Melbourne that combines heritage design with modern culinary mastery. Enjoy exclusive dining discounts!"
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🍽", name: "Award-winning Restaurant" },
        { icon: "❄️", name: "Air Conditioning" }
      ],
      explore: [
        { name: "Melbourne Museum of Magic", distance: "8 min drive", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "scepter-king",
          name: "Scepter King Room",
          image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80",
          size: "350 sq ft",
          sleeps: "Sleeps 2",
          beds: "1 King bed",
          pricePerNight: 300
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 300,
      promoBadge: "Receive 30% discount on a restaurant",
      discountBadge: null,
      popular: false,
      type: "hotel",
      budgetRange: "200-500"
    },
    {
      id: "marineford-hotel",
      name: "Marineford Hotel",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=900&q=80"
      ],
      rating: 4.2,
      reviews: 1200,
      address: "Admiralty Wharf 1, Melbourne, Australia",
      overview: [
        "Overlooking the bay, Marineford Hotel offers historical harbor views, cozy rooms, and immediate access to shipping lines and tours."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🚗", name: "Free Parking" },
        { icon: "⚓", name: "Harbor Access" }
      ],
      explore: [
        { name: "Marineford Harbor", distance: "1 min walk", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "harbor-twin",
          name: "Harbor View Twin Room",
          image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600&q=80",
          size: "280 sq ft",
          sleeps: "Sleeps 2",
          beds: "2 Twin beds",
          pricePerNight: 120
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 120,
      promoBadge: null,
      discountBadge: null,
      popular: false,
      type: "hotel",
      budgetRange: "0-200"
    },
    {
      id: "shanghai-open",
      name: "Shanghai Open House",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80"
      ],
      rating: 4.5,
      reviews: 1200,
      address: "Lantern Road 8, Melbourne, Australia",
      overview: [
        "A spacious open-house model bringing Asian aesthetic and design principles to the center of Melbourne."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🍵", name: "Tea lounge" }
      ],
      explore: [
        { name: "Chinatown Melbourne", distance: "15 min walk", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "deluxe-zen",
          name: "Deluxe Zen Room",
          image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
          size: "320 sq ft",
          sleeps: "Sleeps 2",
          beds: "1 Queen bed",
          pricePerNight: 145
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 145,
      promoBadge: null,
      discountBadge: null,
      popular: false,
      type: "shared space",
      budgetRange: "0-200"
    },
    {
      id: "ocean-waves",
      name: "Ocean Waves Resort",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80"
      ],
      rating: 4.7,
      reviews: 1200,
      address: "Ocean Avenue 777, Melbourne, Australia",
      overview: [
        "Experience first-class luxury with private beach umbrellas, infinity pools, and round-the-clock personal concierge."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🏊", name: "Infinity Pool" },
        { icon: "🍹", name: "Beach Bar" }
      ],
      explore: [
        { name: "Ocean Waves Beach", distance: "0 min walk", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "waves-suite",
          name: "Infinity Pool Ocean Suite",
          image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
          size: "480 sq ft",
          sleeps: "Sleeps 4",
          beds: "2 Queen beds",
          pricePerNight: 310
        }
      ],
      pricePerNightOriginal: null,
      pricePerNight: 310,
      promoBadge: null,
      discountBadge: null,
      popular: false,
      type: "resort",
      budgetRange: "200-500"
    },
    {
      id: "miami-frontier",
      name: "Maimi City frontier",
      location: "Melbourne",
      destinationId: "australia",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80"
      ],
      rating: 4.4,
      reviews: 1200,
      address: "Frontier Boulevard 99, Melbourne, Australia",
      overview: [
        "A retro Miami-styled boutique stay right in Melbourne, featuring custom neon decor, vintage lounge, and restaurant perks."
      ],
      facilities: [
        { icon: "📶", name: "Free wifi" },
        { icon: "🍹", name: "Cocktail lounge" },
        { icon: "🚲", name: "Bicycle rental" }
      ],
      explore: [
        { name: "Boutique Shopping District", distance: "5 min walk", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: "miami-suite",
          name: "Neon Deco Double Room",
          image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
          size: "310 sq ft",
          sleeps: "Sleeps 2",
          beds: "1 Double bed",
          pricePerNight: 190
        }
      ],
      pricePerNightOriginal: 200,
      pricePerNight: 190,
      promoBadge: "Receive 30% discount on a restaurant",
      discountBadge: "15% off",
      popular: false,
      type: "hotel",
      budgetRange: "0-200"
    }
  ],

  defaultTrips: [
    {
      hotelId: "lakeside-motel",
      roomId: "twin-multiple",
      checkIn: "Sunday, March 18, 2022",
      checkOut: "Tuesday, March 20, 2022",
      nights: 2,
      pricePaid: 130,
      originalPrice: 150,
      guests: "2 adults, 1 room",
      firstName: "Ciro",
      lastName: "Martinez"
    }
  ]
};

// Generator for massive dummy data to test scale and performance
(function() {
  const cities = [
    { name: "Melbourne", destId: "australia", prefix: "Melbourne" },
    { name: "Australia", destId: "australia", prefix: "Sydney" },
    { name: "Japan", destId: "japan", prefix: "Tokyo" },
    { name: "New Zealand", destId: "new-zealand", prefix: "Auckland" },
    { name: "Greece", destId: "greece", prefix: "Athens" }
  ];

  const hotelNames = [
    "Grand Plaza", "Seaside Resort", "Royal Stay", "Heritage Inn", 
    "Boutique Haven", "Vista Point", "Blue Lagoon", "Sunset Lodge", 
    "Urban Oasis", "Central Suite", "Apex View", "Summit Retreat",
    "Sleek & Chic Stay", "Harmony House", "Serenity Spa & Resort",
    "The Golden Key", "Emerald Gardens", "Sapphire Sands", "Panorama Hotel",
    "Tranquil Pines", "Ocean Breeze", "Rustic Charm Inn", "Metro Lux",
    "The Gallery Suites", "Horizon View"
  ];

  const types = ["hotel", "resort", "residence", "shared space"];

  const images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    "https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=600&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=600&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=600&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80",
    "https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=600&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80"
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
    "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=900&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&q=80",
    "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=900&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80"
  ];

  const facilitiesPool = [
    { icon: "📶", name: "Free wifi" },
    { icon: "💼", name: "Business Services" },
    { icon: "❄️", name: "Air Conditioning" },
    { icon: "🏊", name: "Swimming pool" },
    { icon: "🚗", name: "Parking available" },
    { icon: "👍", name: "Top rated in area" }
  ];

  const roomImages = [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80"
  ];

  // We generate 1500 hotels
  const totalToGenerate = 1500;
  for (let i = 0; i < totalToGenerate; i++) {
    const city = cities[i % cities.length];
    const hotelName = `${city.prefix} ${hotelNames[Math.floor(Math.random() * hotelNames.length)]} ${Math.floor(i / cities.length) + 1}`;
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Price range logic to distribute prices across budget classes
    const budgetIndex = i % 5;
    let pricePerNight = 120;
    if (budgetIndex === 0) {
      pricePerNight = 50 + Math.floor(Math.random() * 150); // 50 to 200
    } else if (budgetIndex === 1) {
      pricePerNight = 201 + Math.floor(Math.random() * 299); // 201 to 500
    } else if (budgetIndex === 2) {
      pricePerNight = 501 + Math.floor(Math.random() * 499); // 501 to 1000
    } else if (budgetIndex === 3) {
      pricePerNight = 1001 + Math.floor(Math.random() * 999); // 1001 to 2000
    } else {
      pricePerNight = 2001 + Math.floor(Math.random() * 2999); // 2001 to 5000
    }

    const priceOriginal = Math.random() < 0.4 ? Math.round(pricePerNight * (1.1 + Math.random() * 0.2)) : null;
    const discountPercent = priceOriginal ? Math.round(((priceOriginal - pricePerNight) / priceOriginal) * 100) : null;
    const rating = Math.round((3.0 + Math.random() * 2.0) * 10) / 10;
    const reviews = 10 + Math.floor(Math.random() * 2490);

    const mainImg = images[Math.floor(Math.random() * images.length)];
    const gallery = [
      mainImg,
      galleryImages[Math.floor(Math.random() * galleryImages.length)],
      galleryImages[Math.floor(Math.random() * galleryImages.length)]
    ];

    const generatedHotel = {
      id: `gen-${city.destId}-${i}`,
      name: hotelName,
      location: city.name,
      destinationId: city.destId,
      image: mainImg,
      gallery: gallery,
      rating: rating,
      reviews: reviews,
      address: `${10 + (i % 990)} ${city.prefix} Ave, ${city.name}, ${city.name === "Melbourne" ? "Australia" : city.name}`,
      overview: [
        `Welcome to the beautiful ${hotelName}. A premium property located in the heart of ${city.name}.`,
        "Guests can enjoy free high-speed wifi, access to our wellness center, and a wide array of complimentary amenities."
      ],
      facilities: facilitiesPool.slice(0, 3 + Math.floor(Math.random() * 4)),
      explore: [
        { name: `${city.prefix} Central Park`, distance: "5 min walk", icon: "imgs/Location.png" },
        { name: `${city.prefix} Heritage Museum`, distance: "12 min drive", icon: "imgs/Location.png" }
      ],
      rooms: [
        {
          id: `room-standard-${i}`,
          name: "Standard Comfort Room",
          image: roomImages[0],
          size: "250 sq ft",
          sleeps: "Sleeps 2",
          beds: "1 Queen bed",
          pricePerNight: pricePerNight
        },
        {
          id: `room-deluxe-${i}`,
          name: "Premium Deluxe Suite",
          image: roomImages[1],
          size: "400 sq ft",
          sleeps: "Sleeps 4",
          beds: "2 Queen beds",
          pricePerNight: Math.round(pricePerNight * 1.3)
        }
      ],
      pricePerNightOriginal: priceOriginal,
      pricePerNight: pricePerNight,
      promoBadge: Math.random() < 0.25 ? "Special Offer: Book early & save!" : null,
      discountBadge: discountPercent ? `${discountPercent}% off` : null,
      popular: false,
      type: type
    };

    window.myDreamPlaceData.hotels.push(generatedHotel);
  }
})();
