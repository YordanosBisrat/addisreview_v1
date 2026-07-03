/**
 * Seed script.
 * Run with: npm run seed
 *
 * Drops & recreates all tables from schema.sql, then inserts realistic
 * categories, businesses, and reviews for Addis Ababa, Ethiopia.
 */

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function seed() {
await db.init();

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// ---------------------------------------------------------------
// Categories
// ---------------------------------------------------------------
const categories = [
  { name: 'Restaurants', icon: 'FaUtensils', description: 'Places to enjoy a great meal' },
  { name: 'Cafés', icon: 'FaMugHot', description: 'Coffee shops and casual hangouts' },
  { name: 'Hotels', icon: 'FaHotel', description: 'Places to stay in Addis Ababa' },
  { name: 'Shopping', icon: 'FaShoppingBag', description: 'Malls and shopping centers' },
  { name: 'Healthcare', icon: 'FaHospital', description: 'Hospitals and medical centers' },
  { name: 'Beauty', icon: 'FaCut', description: 'Hair salons, nail salons, and spas' },
  { name: 'More', icon: 'FaEllipsisH', description: 'Shopping malls, real estate agents, banks & credit unions, and more' },
];

const insertCategory = db.prepare(
  'INSERT INTO categories (name, icon, description) VALUES (?, ?, ?)'
);
const categoryIds = {};
for (const c of categories) {
  const info = insertCategory.run(c.name, c.icon, c.description);
  categoryIds[c.name] = info.lastInsertRowid;
}

// ---------------------------------------------------------------
// Businesses
// ---------------------------------------------------------------
const businesses = [
  // Restaurants
  {
    name: 'Sishu',
    category: 'Restaurants',
    description:
      'A cozy Addis Ababa favorite known for authentic Ethiopian dishes served in a warm, family-friendly setting. Popular for its tibs and generous portions.',
    address: 'Bole Road, Addis Ababa',
    lat: 8.9959, lng: 38.7891,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Pizza Corner',
    category: 'Restaurants',
    description:
      'A relaxed spot for wood-fired pizza and pasta with an Ethiopian twist on toppings. A favorite among students and young professionals.',
    address: 'Kazanchis, Addis Ababa',
    lat: 9.0164, lng: 38.7635,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Yod Abyssinia',
    category: 'Restaurants',
    description:
      'A cultural restaurant offering traditional Ethiopian cuisine alongside live music and dance performances - perfect for visitors and special occasions.',
    address: 'Bole Road, near Bole Airport, Addis Ababa',
    lat: 8.9806, lng: 38.7992,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    price: '$$$',
  },
  {
    name: '2000 Habesha',
    category: 'Restaurants',
    description:
      'One of the most iconic cultural restaurants in Addis Ababa, famous for its grand cultural shows, traditional decor, and authentic multi-course Ethiopian dining experience.',
    address: 'Bole Road, Addis Ababa',
    lat: 8.9930, lng: 38.7899,
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    price: '$$$',
  },
  // Cafés
  {
    name: "Tomoca Coffee",
    category: 'Cafés',
    description:
      "Addis Ababa's most legendary coffee house, roasting and serving Ethiopian coffee since 1953. A must-visit for any coffee lover passing through the city.",
    address: 'Wavel Street, Piassa, Addis Ababa',
    lat: 9.0350, lng: 38.7500,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    price: '$',
  },
  {
    name: "Kaldi's Coffee",
    category: 'Cafés',
    description:
      "Often called 'Ethiopia's Starbucks,' Kaldi's offers a modern café experience with great coffee, pastries, and comfortable seating for work or catching up with friends.",
    address: 'Bole Road, Addis Ababa',
    lat: 9.0100, lng: 38.7850,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Garden of Coffee',
    category: 'Cafés',
    description:
      'A peaceful outdoor café tucked into a garden setting, offering a calm escape from the city with excellent Ethiopian coffee and light snacks.',
    address: 'Old Airport Area, Addis Ababa',
    lat: 8.9850, lng: 38.7650,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    price: '$',
  },
  // Hotels
  {
    name: 'Ethiopian Skylight Hotel',
    category: 'Hotels',
    description:
      'A modern 5-star hotel located near Bole International Airport, popular with business travelers for its spacious rooms, conference facilities, and rooftop views.',
    address: 'Near Bole International Airport, Addis Ababa',
    lat: 8.9779, lng: 38.7996,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    price: '$$$',
  },
  {
    name: 'Hyatt Regency Addis Ababa',
    category: 'Hotels',
    description:
      'A luxury international hotel chain offering premium accommodation, multiple restaurants, a spa, and event spaces in the heart of the city.',
    address: 'Meskel Square, Addis Ababa',
    lat: 9.0107, lng: 38.7613,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    price: '$$$',
  },
  {
    name: 'Golden Tulip Addis Ababa',
    category: 'Hotels',
    description:
      'A comfortable mid-to-upscale hotel offering great value, friendly service, and a convenient location for both business and leisure travelers.',
    address: 'Bole Road, Addis Ababa',
    lat: 9.0040, lng: 38.7870,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    price: '$$',
  },
  // Shopping
  {
    name: 'Edna Mall',
    category: 'Shopping',
    description:
      'One of the most popular shopping destinations in Addis Ababa, featuring a cinema, clothing stores, electronics shops, and a food court.',
    address: 'Bole Road, Addis Ababa',
    lat: 9.0075, lng: 38.7825,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Friendship Business Center',
    category: 'Shopping',
    description:
      'A well-known shopping center offering a wide variety of retail stores, fashion boutiques, and dining options in a modern setting.',
    address: 'Bole Road, Addis Ababa',
    lat: 9.0022, lng: 38.7810,
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80',
    price: '$$',
  },
  // Healthcare
  {
    name: "St. Paul's Hospital Millennium Medical College",
    category: 'Healthcare',
    description:
      'A leading public hospital and medical college providing a wide range of specialized medical services and training future healthcare professionals.',
    address: 'Gulele, Addis Ababa',
    lat: 9.0500, lng: 38.7350,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Myungsung Christian Medical Center',
    category: 'Healthcare',
    description:
      'A modern private hospital known for high-quality care, advanced medical equipment, and a wide range of specialist services.',
    address: 'Akaki Kaliti, Addis Ababa',
    lat: 8.8950, lng: 38.7950,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    price: '$$$',
  },
  // Beauty
  {
    name: 'Zewditu Hair & Beauty Salon',
    category: 'Beauty',
    description:
      'A popular full-service hair salon offering cuts, braiding, and styling for all hair types, with a friendly and skilled team.',
    address: 'Bole Road, Addis Ababa',
    lat: 9.0110, lng: 38.7880,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Glow Nail Bar',
    category: 'Beauty',
    description:
      'A clean, modern nail salon offering manicures, pedicures, and gel extensions in a relaxed, welcoming atmosphere.',
    address: 'Sarbet, Addis Ababa',
    lat: 8.9930, lng: 38.7580,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Serenity Spa Addis',
    category: 'Beauty',
    description:
      'A tranquil day spa offering massages, facials, and body treatments — a favorite escape from the busy city.',
    address: 'Kazanchis, Addis Ababa',
    lat: 9.0140, lng: 38.7660,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    price: '$$$',
  },
  // More
  {
    name: 'Dembel City Center',
    category: 'More',
    description:
      'A well-established shopping mall in the heart of the city with retail stores, a supermarket, and a food court.',
    address: 'Bole Road, Addis Ababa',
    lat: 9.0059, lng: 38.7834,
    image: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Century Real Estate',
    category: 'More',
    description:
      'A trusted real estate agency helping clients buy, sell, and rent residential and commercial property across Addis Ababa.',
    address: 'CMC Road, Addis Ababa',
    lat: 9.0210, lng: 38.8110,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    price: '$$',
  },
  {
    name: 'Awash Bank - Bole Branch',
    category: 'More',
    description:
      'A leading private bank branch offering personal and business banking, loans, and foreign currency services.',
    address: 'Bole Road, Addis Ababa',
    lat: 9.0089, lng: 38.7902,
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80',
    price: '$',
  },
];

const insertBusiness = db.prepare(`
  INSERT INTO businesses (name, category_id, description, address, city, latitude, longitude, image_url, price_range)
  VALUES (@name, @category_id, @description, @address, 'Addis Ababa', @lat, @lng, @image, @price)
`);

const businessIds = {};
for (const b of businesses) {
  const info = insertBusiness.run({
    name: b.name,
    category_id: categoryIds[b.category],
    description: b.description,
    address: b.address,
    lat: b.lat,
    lng: b.lng,
    image: b.image,
    price: b.price,
  });
  businessIds[b.name] = info.lastInsertRowid;
}

// ---------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------
const insertReview = db.prepare(`
  INSERT INTO reviews (business_id, author_name, rating, comment, created_at)
  VALUES (?, ?, ?, ?, datetime('now', ?))
`);

const reviewsData = {
  'Sishu': [
    ['Hana Getachew', 5, 'The tibs here are the best in Bole. Great service and cozy atmosphere.', '-10 days'],
    ['Dawit Alemu', 4, 'Solid Ethiopian food, gets busy on weekends but worth the wait.', '-6 days'],
    ['Selam Tesfaye', 5, 'My go-to place for lunch with colleagues. Never disappoints.', '-2 days'],
  ],
  'Pizza Corner': [
    ['Nardos Fikru', 4, 'Loved the wood-fired crust. Great spot for a casual dinner.', '-15 days'],
    ['Yonas Bekele', 3, 'Good pizza but a bit pricey for the portion size.', '-4 days'],
  ],
  'Yod Abyssinia': [
    ['Liya Solomon', 5, 'Amazing cultural show plus delicious food. Took my visiting family here and they loved it.', '-20 days'],
    ['Abel Girma', 5, 'A must for tourists. The dancing performance was incredible.', '-9 days'],
    ['Meron Tadesse', 4, 'Great experience overall, slightly slow service during peak hours.', '-1 days'],
  ],
  '2000 Habesha': [
    ['Kalkidan Worku', 5, 'Best cultural restaurant in the city. The decor alone is worth the visit.', '-18 days'],
    ['Biniam Assefa', 4, 'Fantastic atmosphere and food, a bit expensive but worth it for special occasions.', '-3 days'],
  ],
  'Tomoca Coffee': [
    ['Ruth Mekonnen', 5, 'The original and still the best. This is what Ethiopian coffee should taste like.', '-25 days'],
    ['Samuel Tesema', 5, 'A historic spot, always packed but the coffee is worth the standing room only crowd.', '-7 days'],
    ['Tigist Haile', 4, 'Great coffee, small space so it can get crowded fast.', '-2 days'],
  ],
  "Kaldi's Coffee": [
    ['Elias Yohannes', 4, 'Good spot to work from with reliable wifi and comfortable seating.', '-12 days'],
    ['Sara Mulu', 4, 'Consistent quality across branches, my favorite for a quick latte.', '-5 days'],
  ],
  'Garden of Coffee': [
    ['Betelhem Ashenafi', 5, 'Such a peaceful place to relax outdoors with great coffee.', '-14 days'],
    ['Henok Wondimu', 4, 'Lovely garden setting, a nice break from the busy city.', '-3 days'],
  ],
  'Ethiopian Skylight Hotel': [
    ['Mahlet Tsegaye', 5, 'Excellent service and very close to the airport, perfect for layovers.', '-30 days'],
    ['Robel Kebede', 4, 'Modern rooms and great rooftop view, breakfast could be more varied.', '-8 days'],
  ],
  'Hyatt Regency Addis Ababa': [
    ['Frehiwot Alene', 5, 'Top-notch luxury hotel with impeccable service. Highly recommend for business trips.', '-22 days'],
    ['Yared Mengistu', 5, 'The spa and restaurants are excellent. Great central location too.', '-6 days'],
  ],
  'Golden Tulip Addis Ababa': [
    ['Hilina Getu', 4, 'Comfortable stay with friendly staff, good value for the price.', '-11 days'],
    ['Amanuel Zerihun', 3, 'Decent hotel but rooms could use a refresh.', '-4 days'],
  ],
  'Edna Mall': [
    ['Sosina Tefera', 4, 'Great variety of shops and the cinema is a nice bonus.', '-16 days'],
    ['Natnael Girma', 4, 'Good food court options and easy parking.', '-5 days'],
  ],
  'Friendship Business Center': [
    ['Hiwot Alemayehu', 4, 'Nice mix of boutiques, good place for gifts shopping.', '-13 days'],
    ['Dagim Solomon', 3, 'Decent selection but can get crowded on weekends.', '-2 days'],
  ],
  "St. Paul's Hospital Millennium Medical College": [
    ['Meskerem Bogale', 5, 'Excellent doctors and staff, very professional care during my visit.', '-19 days'],
    ['Tewodros Alemu', 4, 'Good service though wait times can be long due to high patient volume.', '-7 days'],
  ],
  'Myungsung Christian Medical Center': [
    ['Rahel Desta', 5, 'Very clean facility with modern equipment and attentive staff.', '-21 days'],
    ['Bereket Fikadu', 4, 'Great specialist care, slightly higher cost but worth the quality.', '-9 days'],
  ],
  'Zewditu Hair & Beauty Salon': [
    ['Eden Amare', 5, 'Best haircut I have had in Addis. The stylists really listen to what you want.', '-10 days'],
    ['Feven Girma', 4, 'Great braiding work, gets busy on Saturdays so book ahead.', '-3 days'],
  ],
  'Glow Nail Bar': [
    ['Marta Yilma', 5, 'Super clean salon and the gel manicure lasted three weeks.', '-8 days'],
    ['Sifen Abebe', 4, 'Friendly staff, good variety of colors and designs.', '-2 days'],
  ],
  'Serenity Spa Addis': [
    ['Lidya Molla', 5, 'Exactly what the name promises - left feeling completely relaxed.', '-17 days'],
    ['Wondwosen Tsegaye', 4, 'Great massage, calm setting, a bit pricey but worth it for a treat.', '-5 days'],
  ],
  'Dembel City Center': [
    ['Meaza Hailu', 4, 'Good mix of shops and a reliable food court, easy to find parking.', '-14 days'],
    ['Yohannes Desalegn', 4, 'Convenient location and decent variety of stores.', '-4 days'],
  ],
  'Century Real Estate': [
    ['Solomon Berhanu', 5, 'Helped me find a great apartment quickly and handled all the paperwork smoothly.', '-25 days'],
    ['Aster Wolde', 4, 'Professional agents, responsive communication throughout the process.', '-6 days'],
  ],
  'Awash Bank - Bole Branch': [
    ['Getachew Alemu', 4, 'Efficient service and short wait times compared to other branches.', '-19 days'],
    ['Tsion Fekadu', 3, 'Decent service, but forex transactions can take a while.', '-7 days'],
  ],
};

for (const [businessName, reviews] of Object.entries(reviewsData)) {
  const businessId = businessIds[businessName];
  for (const [author, rating, comment, offset] of reviews) {
    insertReview.run(businessId, author, rating, comment, offset);
  }
}

console.log('✅ Database seeded successfully!');
console.log(`   - ${categories.length} categories`);
console.log(`   - ${businesses.length} businesses`);
console.log(`   - ${Object.values(reviewsData).flat().length} reviews`);
}

module.exports = seed;

// Allow running directly via `node database/seed.js` or `npm run seed`
if (require.main === module) {
  seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
}
