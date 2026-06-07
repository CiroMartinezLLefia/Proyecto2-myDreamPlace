// Local Mock Data for myDreamPlace

const destinationsData = [
  {
    id: "dest-1",
    name: "Australia",
    properties_count: 2245,
    image_url: "assets/dest-australia.png"
  },
  {
    id: "dest-2",
    name: "Japan",
    properties_count: 1278,
    image_url: "assets/dest-japan.png"
  },
  {
    id: "dest-3",
    name: "New Zealand",
    properties_count: 480,
    image_url: "assets/dest-newzealand.png"
  },
  {
    id: "dest-4",
    name: "Greece",
    properties_count: 320,
    image_url: "assets/dest-greece.png"
  }
];

const inspirationsData = [
  {
    id: "insp-1",
    title: "Sydney's 10 most fashionable 5 star hotels",
    description: "Browse the fastest growing tourism sector in the heart of Australia's vibrant coastal capital...",
    image_url: "assets/insp-sydney.png"
  },
  {
    id: "insp-2",
    title: "Top cities for Vegan Travellers",
    description: "Top sites where you do not have to worry about being a vegan. Our pocket guide is here...",
    image_url: "assets/insp-vegan.png"
  },
  {
    id: "insp-3",
    title: "World's top destinations during and post covid timeline",
    description: "Pandemic safe travel, road trips and destinations offering high safety standards and clean air...",
    image_url: "assets/insp-world.png"
  }
];

const hotelsData = [
  {
    id: "hotel-1",
    name: "Lakeside Resort & Cabins",
    location: "Queenstown, New Zealand",
    price_per_night: 180,
    rating: 4.8,
    reviews_count: 124,
    image_url: "assets/hotel-1.png"
  },
  {
    id: "hotel-2",
    name: "Chiba Onsen & Spa",
    location: "Tokyo, Japan",
    price_per_night: 240,
    rating: 4.9,
    reviews_count: 89,
    image_url: "assets/hotel-2.png"
  },
  {
    id: "hotel-3",
    name: "Santorini Heights Cave Suites",
    location: "Imerovigli, Greece",
    price_per_night: 320,
    rating: 4.7,
    reviews_count: 215,
    image_url: "assets/hotel-3.png"
  },
  {
    id: "hotel-4",
    name: "The Darling Hotel & Suites",
    location: "Sydney, Australia",
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
