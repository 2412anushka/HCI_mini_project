export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const categories = ["All", "Breakfast", "Lunch", "Dinner", "Desserts"];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Eggs Benedict",
    description: "Poached eggs on English muffins with hollandaise sauce and Canadian bacon.",
    price: 12.99,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1608039829572-9b0189ecf0a0?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Avocado Toast",
    description: "Sourdough toast topped with smashed avocado, cherry tomatoes, and microgreens.",
    price: 10.49,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Pancake Stack",
    description: "Fluffy buttermilk pancakes with maple syrup, fresh berries, and whipped cream.",
    price: 11.99,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Grilled Chicken Caesar",
    description: "Crisp romaine, grilled chicken, parmesan, croutons, and classic Caesar dressing.",
    price: 14.99,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Margherita Pizza",
    description: "Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
    price: 13.49,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Club Sandwich",
    description: "Triple-decker with turkey, bacon, lettuce, tomato, and mayo on toasted bread.",
    price: 12.49,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Filet Mignon",
    description: "8oz prime filet with truffle mashed potatoes and grilled asparagus.",
    price: 34.99,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Pan-Seared Salmon",
    description: "Atlantic salmon with lemon butter sauce, wild rice, and seasonal vegetables.",
    price: 26.99,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms, parmesan, and truffle oil.",
    price: 19.99,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.",
    price: 9.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Crème Brûlée",
    description: "Vanilla custard with a caramelized sugar crust and fresh raspberries.",
    price: 8.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Chocolate Lava Cake",
    description: "Warm molten chocolate cake served with vanilla ice cream.",
    price: 10.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
  },
];
