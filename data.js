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
