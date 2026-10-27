const users = [
  {
    name: 'Maharajadhiraj Alexander Singh',
    email: 'admin@hotelpro.com',
    phone: '+91 98290 12345',
    password: 'AdminPassword@123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Princess Gayatri Devi',
    email: 'sarah.jenkins@example.com',
    phone: '+91 98765 43210',
    password: 'GuestPassword@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Kunwar Vikramaditya Rathore',
    email: 'david.miller@example.com',
    phone: '+91 97112 34567',
    password: 'GuestPassword@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Rani Meenakshi Sharma',
    email: 'emily.clark@example.com',
    phone: '+91 99887 76655',
    password: 'GuestPassword@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Thakur Michael Verma',
    email: 'michael.ross@example.com',
    phone: '+91 91234 56780',
    password: 'GuestPassword@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Dr. Sophia Mukherjee',
    email: 'sophia.martinez@example.com',
    phone: '+91 94567 89012',
    password: 'GuestPassword@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Captain James Wilson',
    email: 'james.wilson@example.com',
    phone: '+91 95678 12340',
    password: 'GuestPassword@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  }
];

const rooms = [
  {
    roomNumber: '101',
    roomType: 'Haveli Courtyard Room',
    description: 'Overlooking the central palace marble fountain and marigold gardens. Features hand-painted Shekhawati frescoes, antique rosewood armoires, and a soothing brass fountain ambiance.',
    price: 8500,
    capacity: 2,
    bedType: 'Double',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Courtyard View', 'Morning Chai Tray'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 380,
    floor: 1,
    rating: 4.8
  },
  {
    roomNumber: '102',
    roomType: 'Haveli Courtyard Room',
    description: 'Sun-drenched haven featuring traditional Rajasthani block-print linens, Belgian glass chandeliers, and an intricately carved stone jali window.',
    price: 9200,
    capacity: 2,
    bedType: 'Queen',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Breakfast Buffet', 'Ayurvedic Toiletries'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 410,
    floor: 1,
    rating: 4.7
  },
  {
    roomNumber: '103',
    roomType: 'Haveli Courtyard Room',
    description: 'Charming courtyard suite with twin antique brass four-poster beds, hand-woven silk drapery, and a quiet garden veranda.',
    price: 8800,
    capacity: 2,
    bedType: 'Twin',
    amenities: ['WiFi', 'AC', 'TV', 'Room Service', 'Shahi Aarti Welcome', 'Safe'],
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 390,
    floor: 1,
    rating: 4.6
  },
  {
    roomNumber: '201',
    roomType: 'Rajputana Deluxe Room',
    description: 'Regal sanctuary inspired by royal Mewar royalty. Features an ornate private Jharokha balcony overlooking the palace lake, Italian marble bath with brass fittings, and royal silk upholstery.',
    price: 14500,
    capacity: 3,
    bedType: 'King',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Lake View Jharokha', 'Stepwell Pool Access', 'Royal Breakfast'],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 490,
    floor: 2,
    rating: 4.9
  },
  {
    roomNumber: '202',
    roomType: 'Rajputana Deluxe Room',
    description: 'Refined palace chamber with gold leaf ceiling motifs, hand-tufted Kashmiri wool rugs, deep clawfoot copper bathtub, and panoramic fortress views.',
    price: 15200,
    capacity: 2,
    bedType: 'Queen',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Royal Breakfast', 'Stepwell Pool Access', 'Sunset Tea'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 510,
    floor: 2,
    rating: 4.8
  },
  {
    roomNumber: '203',
    roomType: 'Rajputana Deluxe Room',
    description: 'Corner palace suite with dual aspect views of Lake Pichola and the Aravalli hills. Includes personalized khidmatgar butler service and evening sitar serenades.',
    price: 16000,
    capacity: 3,
    bedType: 'King',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Lake View Jharokha', 'Stepwell Pool Access', 'Ayurvedic Massage Voucher'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Occupied',
    size: 530,
    floor: 2,
    rating: 4.9
  },
  {
    roomNumber: '301',
    roomType: 'Yuvraj Heritage Suite',
    description: 'The Royal Heir’s Residence: Grand archways, Burma teak furniture, private drawing salon, solid silver dining accents, and 24/7 dedicated Shahi Khansama service.',
    price: 24000,
    capacity: 3,
    bedType: 'King',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Royal Butler (Khidmatgar)', 'Vintage Car Transfer', 'Panchakarma Spa Access'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 680,
    floor: 3,
    rating: 5.0
  },
  {
    roomNumber: '302',
    roomType: 'Yuvraj Heritage Suite',
    description: 'Majestic suite with handcrafted mother-of-pearl inlays, private terrace overlooking palace domes, and a curated private library of Indian history.',
    price: 26500,
    capacity: 3,
    bedType: 'King',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Royal Butler (Khidmatgar)', 'Vintage Car Transfer', 'Sunset Champagne & Sitar'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 720,
    floor: 3,
    rating: 4.9
  },
  {
    roomNumber: '401',
    roomType: 'Maharaja Presidential Suite',
    description: 'The Crown Jewel of the Palace: Once the personal chambers of the Maharaja. Boasts a 24-karat gold-gilded ceiling, private rooftop marble plunge pool, solid silver swing, and private dining salon for twelve.',
    price: 48000,
    capacity: 4,
    bedType: 'King',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Private Rooftop Plunge Pool', 'Rolls-Royce Chauffeur', 'Personal Royal Butler', 'Imperial Banquet Dinner'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 1200,
    floor: 4,
    rating: 5.0
  },
  {
    roomNumber: '402',
    roomType: 'Maharaja Presidential Suite',
    description: 'Imperial Lake Penthouse with 360-degree views of the water palace. Features antique armaments on display, crystal chandeliers from Firozabad, and a private Ayurvedic hot tub.',
    price: 55000,
    capacity: 4,
    bedType: 'King',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Private Rooftop Plunge Pool', 'Rolls-Royce Chauffeur', 'Personal Royal Butler', 'Champagne High Tea'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Maintenance',
    size: 1350,
    floor: 4,
    rating: 5.0
  },
  {
    roomNumber: '501',
    roomType: 'Maharani Royal Suite',
    description: 'Elegantly curated palace chambers adorned with delicate pink Udaipur marble, peacock glass mosaics, private dressing salon, and a fragrant jasmine courtyard balcony.',
    price: 32000,
    capacity: 5,
    bedType: 'Queen',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Ayurvedic Facial & Spa', 'Jharokha Sunset Tea', 'Royal Khansama Dining'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 850,
    floor: 5,
    rating: 4.9
  },
  {
    roomNumber: '502',
    roomType: 'Maharani Royal Suite',
    description: 'Grand royal family pavilion featuring adjoining princess chambers, marble lotus bath, traditional brass paan and spice bar, and private garden patio.',
    price: 35000,
    capacity: 6,
    bedType: 'Double',
    amenities: ['WiFi', 'AC', 'TV', 'Shahi Aarti Welcome', 'Ayurvedic Facial & Spa', 'Jharokha Sunset Tea', 'Vintage Chauffeur'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    size: 920,
    floor: 5,
    rating: 5.0
  }
];

module.exports = { users, rooms };
