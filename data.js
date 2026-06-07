// Local Mock Data for myDreamPlace

const destinationsData = [
  {
    id: "dest-1",
    name: "Austràlia",
    properties_count: 2245,
    image_url: "assets/dest-australia.png"
  },
  {
    id: "dest-2",
    name: "Japó",
    properties_count: 1278,
    image_url: "assets/dest-japan.png"
  },
  {
    id: "dest-3",
    name: "Nova Zelanda",
    properties_count: 480,
    image_url: "assets/dest-newzealand.png"
  },
  {
    id: "dest-4",
    name: "Grècia",
    properties_count: 320,
    image_url: "assets/dest-greece.png"
  }
];

const inspirationsData = [
  {
    id: "insp-1",
    title: "Els 10 hotels de 5 estrelles més de moda a Sydney",
    description: "Descobreix el sector turístic amb més creixement al cor de la vibrant capital costanera d'Austràlia...",
    image_url: "assets/insp-sydney.png"
  },
  {
    id: "insp-2",
    title: "Les millors ciutats per a viatgers vegans",
    description: "Els millors llocs on no t'has de preocupar per ser vegà. La nostra guia de butxaca és aquí...",
    image_url: "assets/insp-vegan.png"
  },
  {
    id: "insp-3",
    title: "Les principals destinacions del món durant i després de la COVID-19",
    description: "Viatges assegurats contra la pandèmia, viatges per carretera i destinacions que ofereixen alts estàndards de seguretat i aire pur...",
    image_url: "assets/insp-world.png"
  }
];

const hotelsData = [
  {
    id: "hotel-1",
    name: "Lakeside Resort & Cabins",
    location: "Queenstown, Nova Zelanda",
    price_per_night: 180,
    rating: 4.8,
    reviews_count: 124,
    image_url: "assets/hotel-1.png"
  },
  {
    id: "hotel-2",
    name: "Chiba Onsen & Spa",
    location: "Tòquio, Japó",
    price_per_night: 240,
    rating: 4.9,
    reviews_count: 89,
    image_url: "assets/hotel-2.png"
  },
  {
    id: "hotel-3",
    name: "Santorini Heights Cave Suites",
    location: "Imerovigli, Grècia",
    price_per_night: 320,
    rating: 4.7,
    reviews_count: 215,
    image_url: "assets/hotel-3.png"
  },
  {
    id: "hotel-4",
    name: "The Darling Hotel & Suites",
    location: "Sydney, Austràlia",
    price_per_night: 290,
    rating: 4.9,
    reviews_count: 310,
    image_url: "assets/hotel-1.png" // Fallback to hotel-1 for the 4th one since generation failed
  }
];

// Export modules if running in Node environment, else declare globally for browser script tag compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { destinationsData, inspirationsData, hotelsData };
} else {
  window.destinationsData = destinationsData;
  window.inspirationsData = inspirationsData;
  window.hotelsData = hotelsData;
}
