export interface Restaurant {
  _id: string
  name: string
  cuisine: string
  rating: number
  priceRange: string
  imageUrl: string
  deliveryTime: string
  location: string
  description: string
  menu: MenuItem[]
  reviews: Review[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  isVegetarian: boolean
}

export interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
}

export const restaurants: Restaurant[] = [
  {
    _id: "1",
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    priceRange: "$$",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: "30-40 min",
    location: "123 Main St, City Center",
    description:
      "Authentic Indian cuisine with a modern twist. Our chefs use traditional spices and cooking methods to create flavorful dishes that will transport you to the streets of India.",
    menu: [
      {
        id: "m1",
        name: "Butter Chicken",
        description: "Tender chicken cooked in a rich tomato and butter sauce",
        price: 14.99,
        imageUrl:
          "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Main Course",
        isVegetarian: false,
      },
      {
        id: "m2",
        name: "Paneer Tikka Masala",
        description: "Cottage cheese cubes in a spiced tomato gravy",
        price: 12.99,
        imageUrl:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Main Course",
        isVegetarian: true,
      },
      {
        id: "m3",
        name: "Vegetable Biryani",
        description: "Fragrant basmati rice cooked with mixed vegetables and spices",
        price: 10.99,
        imageUrl:
          "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Rice",
        isVegetarian: true,
      },
      {
        id: "m4",
        name: "Garlic Naan",
        description: "Flatbread topped with garlic and butter",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Bread",
        isVegetarian: true,
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "John D.",
        rating: 5,
        comment: "The butter chicken was amazing! Authentic flavors and quick delivery.",
        date: "2 days ago",
      },
      {
        id: "r2",
        userName: "Sarah M.",
        rating: 4,
        comment: "Great food but delivery took a bit longer than expected.",
        date: "1 week ago",
      },
      {
        id: "r3",
        userName: "Raj P.",
        rating: 5,
        comment: "As an Indian, I can confirm this is authentic. The paneer tikka masala is just like my mom's!",
        date: "2 weeks ago",
      },
    ],
  },
  {
    _id: "2",
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.2,
    priceRange: "$$$",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: "25-35 min",
    location: "456 Oak Ave, Downtown",
    description:
      "Experience the taste of Italy with our handmade pasta and authentic sauces. We use only the finest ingredients imported directly from Italy.",
    menu: [
      {
        id: "m1",
        name: "Spaghetti Carbonara",
        description: "Classic pasta with eggs, cheese, pancetta, and black pepper",
        price: 15.99,
        imageUrl:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Pasta",
        isVegetarian: false,
      },
      {
        id: "m2",
        name: "Margherita Pizza",
        description: "Traditional pizza with tomato sauce, mozzarella, and basil",
        price: 13.99,
        imageUrl:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Pizza",
        isVegetarian: true,
      },
      {
        id: "m3",
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
        price: 7.99,
        imageUrl:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Dessert",
        isVegetarian: true,
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Maria G.",
        rating: 5,
        comment: "The carbonara was perfect! Just like I had in Rome.",
        date: "3 days ago",
      },
      {
        id: "r2",
        userName: "Tom B.",
        rating: 3,
        comment: "Food was good but portions were a bit small for the price.",
        date: "1 week ago",
      },
    ],
  },
  {
    _id: "3",
    name: "Sushi Sensation",
    cuisine: "Japanese",
    rating: 4.7,
    priceRange: "$$$",
    imageUrl:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: "35-45 min",
    location: "789 Pine Rd, Eastside",
    description:
      "Premium sushi and Japanese cuisine made with the freshest ingredients. Our sushi chefs have trained in Japan to bring you an authentic experience.",
    menu: [
      {
        id: "m1",
        name: "Dragon Roll",
        description: "Eel, cucumber, avocado, and tobiko",
        price: 16.99,
        imageUrl:
          "https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Rolls",
        isVegetarian: false,
      },
      {
        id: "m2",
        name: "Vegetable Tempura",
        description: "Assorted vegetables in a light, crispy batter",
        price: 9.99,
        imageUrl:
          "https://images.unsplash.com/photo-1615361200141-f45961bc0d69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Appetizers",
        isVegetarian: true,
      },
      {
        id: "m3",
        name: "Salmon Nigiri (2 pcs)",
        description: "Fresh salmon over seasoned rice",
        price: 6.99,
        imageUrl:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Nigiri",
        isVegetarian: false,
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Alex K.",
        rating: 5,
        comment: "Best sushi in town! The dragon roll is a must-try.",
        date: "1 day ago",
      },
      {
        id: "r2",
        userName: "Jessica L.",
        rating: 4,
        comment: "Fresh fish and great presentation. A bit pricey but worth it.",
        date: "5 days ago",
      },
    ],
  },
  {
    _id: "4",
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.0,
    priceRange: "$$",
    imageUrl:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: "20-30 min",
    location: "101 Maple Dr, Westside",
    description:
      "Classic American burgers made with 100% Angus beef. Our burgers are grilled to perfection and served with fresh, locally-sourced ingredients.",
    menu: [
      {
        id: "m1",
        name: "Classic Cheeseburger",
        description: "Angus beef patty with cheddar cheese, lettuce, tomato, and special sauce",
        price: 11.99,
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Burgers",
        isVegetarian: false,
      },
      {
        id: "m2",
        name: "Bacon Deluxe",
        description: "Angus beef patty with bacon, cheese, caramelized onions, and BBQ sauce",
        price: 13.99,
        imageUrl:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Burgers",
        isVegetarian: false,
      },
      {
        id: "m3",
        name: "Veggie Burger",
        description: "Plant-based patty with avocado, sprouts, and vegan mayo",
        price: 12.99,
        imageUrl:
          "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Burgers",
        isVegetarian: true,
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Mike T.",
        rating: 4,
        comment: "Great burgers! The bacon deluxe is my favorite.",
        date: "4 days ago",
      },
      {
        id: "r2",
        userName: "Lisa R.",
        rating: 5,
        comment: "Best veggie burger I've ever had. You won't miss the meat!",
        date: "1 week ago",
      },
    ],
  },
  {
    _id: "5",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.3,
    priceRange: "$$",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: "25-35 min",
    location: "202 Elm St, Southside",
    description:
      "Authentic Mexican street food made with traditional recipes. Our tacos are made with hand-pressed corn tortillas and filled with the freshest ingredients.",
    menu: [
      {
        id: "m1",
        name: "Carne Asada Tacos (3)",
        description: "Grilled steak with onions, cilantro, and salsa verde",
        price: 10.99,
        imageUrl:
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Tacos",
        isVegetarian: false,
      },
      {
        id: "m2",
        name: "Chicken Quesadilla",
        description: "Flour tortilla filled with grilled chicken, cheese, and peppers",
        price: 9.99,
        imageUrl:
          "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Quesadillas",
        isVegetarian: false,
      },
      {
        id: "m3",
        name: "Vegetarian Burrito",
        description: "Large flour tortilla filled with rice, beans, cheese, and vegetables",
        price: 8.99,
        imageUrl:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Burritos",
        isVegetarian: true,
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Carlos M.",
        rating: 5,
        comment: "Reminds me of the tacos I used to eat in Mexico City. Authentic and delicious!",
        date: "2 days ago",
      },
      {
        id: "r2",
        userName: "Emily W.",
        rating: 4,
        comment: "Great flavors and generous portions. The salsa is amazing!",
        date: "6 days ago",
      },
    ],
  },
  {
    _id: "6",
    name: "Noodle House",
    cuisine: "Chinese",
    rating: 4.1,
    priceRange: "$",
    imageUrl:
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    deliveryTime: "30-40 min",
    location: "303 Cedar Blvd, Northside",
    description:
      "Traditional Chinese noodles and stir-fries made with authentic recipes. Our chefs bring decades of experience from various regions of China.",
    menu: [
      {
        id: "m1",
        name: "Beef Chow Mein",
        description: "Stir-fried noodles with beef and vegetables in savory sauce",
        price: 11.99,
        imageUrl:
          "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Noodles",
        isVegetarian: false,
      },
      {
        id: "m2",
        name: "Kung Pao Chicken",
        description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers",
        price: 12.99,
        imageUrl:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Main Course",
        isVegetarian: false,
      },
      {
        id: "m3",
        name: "Vegetable Spring Rolls (4)",
        description: "Crispy rolls filled with cabbage, carrots, and mushrooms",
        price: 5.99,
        imageUrl:
          "https://images.unsplash.com/photo-1606335543042-57c525922933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        category: "Appetizers",
        isVegetarian: true,
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "David L.",
        rating: 4,
        comment: "The chow mein is excellent! Authentic flavors and quick delivery.",
        date: "3 days ago",
      },
      {
        id: "r2",
        userName: "Amy C.",
        rating: 5,
        comment: "Best Chinese food in the area. The Kung Pao Chicken has the perfect level of spice!",
        date: "1 week ago",
      },
    ],
  },
]

