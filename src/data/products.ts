export interface Product {
  id: number;
  category: string;
  name: string;
  weight: string;
  price: number;
  oldPrice: number | null;
  discount: string | null;
  time: string;
  image: string;
}

export const CATEGORIES = [
  "Milk",
  "Bread & Pav",
  "Eggs",
  "Flakes & Kids Cereals",
  "Muesli & Granola",
  "Oats",
  "Paneer & Tofu",
  "Curd & Yogurt",
  "Breakfast Mixes",
  "Batter",
] as const;

export type CategoryName = (typeof CATEGORIES)[number];

export const RAW_PRODUCTS = [
  // MILK (12 items)
  { id: 101, category: "Milk", name: "Amul Taaza Toned Milk", weight: "500 ml", price: 27, oldPrice: null, discount: null },
  { id: 102, category: "Milk", name: "Amul Gold Full Cream Milk", weight: "500 ml", price: 33, oldPrice: null, discount: null },
  { id: 103, category: "Milk", name: "Amul Cow Milk", weight: "500 ml", price: 28, oldPrice: null, discount: null },
  { id: 104, category: "Milk", name: "Amul Lactose Free Milk", weight: "250 ml", price: 25, oldPrice: null, discount: null },
  { id: 105, category: "Milk", name: "Amul Taaza Homogenised Toned Milk", weight: "1 ltr", price: 54, oldPrice: null, discount: null },
  { id: 106, category: "Milk", name: "Mother Dairy Toned Milk", weight: "1 ltr", price: 54, oldPrice: null, discount: null },
  { id: 107, category: "Milk", name: "Amul Moti Toned Milk (90 Days Shelf Life)", weight: "450 ml", price: 30, oldPrice: null, discount: null },
  { id: 108, category: "Milk", name: "Mother Dairy Cow Milk", weight: "500 ml", price: 28, oldPrice: null, discount: null },
  { id: 109, category: "Milk", name: "Humpy Farms A2 Cow Milk", weight: "500 ml", price: 65, oldPrice: null, discount: null },
  { id: 110, category: "Milk", name: "Mother Dairy Full Cream Milk", weight: "1 ltr", price: 66, oldPrice: null, discount: null },
  { id: 111, category: "Milk", name: "Amul Gold Milk", weight: "1 ltr", price: 66, oldPrice: null, discount: null },
  { id: 112, category: "Milk", name: "Yakult Probiotic Drink", weight: "5 × 65 ml", price: 80, oldPrice: null, discount: null },

  // BREAD & PAV (12 items)
  { id: 201, category: "Bread & Pav", name: "iD Whole Wheat Chapati", weight: "6 pcs", price: 50, oldPrice: null, discount: null },
  { id: 202, category: "Bread & Pav", name: "Harvest Gold Atta Whole Wheat Bread", weight: "450 g", price: 50, oldPrice: null, discount: null },
  { id: 203, category: "Bread & Pav", name: "Harvest Gold White Bread", weight: "350 g", price: 30, oldPrice: null, discount: null },
  { id: 204, category: "Bread & Pav", name: "English Oven Zero Maida Atta/Wheat Bread", weight: "400 g", price: 50, oldPrice: null, discount: null },
  { id: 205, category: "Bread & Pav", name: "The Cinnamon Kitchen Crispy Millet Pita Baked Crackers", weight: "100 g", price: 120, oldPrice: null, discount: null },
  { id: 206, category: "Bread & Pav", name: "Harvest Gold White Bread", weight: "700 g", price: 60, oldPrice: null, discount: null },
  { id: 207, category: "Bread & Pav", name: "English Oven Brown Bread", weight: "400 g", price: 45, oldPrice: null, discount: null },
  { id: 208, category: "Bread & Pav", name: "English Oven Zero Maida Multigrain Bread", weight: "400 g", price: 60, oldPrice: null, discount: null },
  { id: 209, category: "Bread & Pav", name: "English Oven Premium White Bread", weight: "700 g", price: 60, oldPrice: null, discount: null },
  { id: 210, category: "Bread & Pav", name: "The Health Factory Zero Maida Whole Wheat Bread", weight: "250 g", price: 45, oldPrice: null, discount: null },
  { id: 211, category: "Bread & Pav", name: "English Oven Milk Bread", weight: "400 g", price: 45, oldPrice: null, discount: null },
  { id: 212, category: "Bread & Pav", name: "English Oven Premium White Bread", weight: "350 g", price: 35, oldPrice: null, discount: null },

  // EGGS (6 items)
  { id: 301, category: "Eggs", name: "Nutrich Farm Fresh Protein Rich Eggs", weight: "6 pcs", price: 55, oldPrice: null, discount: null },
  { id: 302, category: "Eggs", name: "Table White White Eggs", weight: "10 pcs", price: 79, oldPrice: null, discount: null },
  { id: 303, category: "Eggs", name: "Farm Made Free Range Eggs", weight: "6 pcs", price: 110, oldPrice: null, discount: null },
  { id: 304, category: "Eggs", name: "Eggoz Nutrition White Protein Rich Eggs", weight: "10 pcs", price: 95, oldPrice: null, discount: null },
  { id: 305, category: "Eggs", name: "The Egg Co. Farm Fresh Protein Rich Eggs", weight: "10 pcs", price: 90, oldPrice: null, discount: null },
  { id: 306, category: "Eggs", name: "The Urban Eggs Farm Fresh White Eggs", weight: "30 pcs", price: 220, oldPrice: null, discount: null },

  // FLAKES & KIDS CEREALS (12 items)
  { id: 401, category: "Flakes & Kids Cereals", name: "Kellogg's Multigrain Chocos More Chocolatey, No-Maida", weight: "1.05 kg", price: 440, oldPrice: null, discount: null },
  { id: 402, category: "Flakes & Kids Cereals", name: "Kellogg's Multigrain Chocos Variety Pack", weight: "7 pcs", price: 100, oldPrice: null, discount: null },
  { id: 403, category: "Flakes & Kids Cereals", name: "Kellogg's Original Corn Flakes", weight: "275 g", price: 115, oldPrice: null, discount: null },
  { id: 404, category: "Flakes & Kids Cereals", name: "Kellogg's Multigrain Chocos More Chocolatey, No-Maida", weight: "385 g", price: 195, oldPrice: null, discount: null },
  { id: 405, category: "Flakes & Kids Cereals", name: "Kellogg's Multigrain Chocos Moons & Stars", weight: "1.15 kg", price: 480, oldPrice: null, discount: null },
  { id: 406, category: "Flakes & Kids Cereals", name: "Slurrp Farm Choco Crunch Breakfast Cereal for Kids", weight: "300 g", price: 299, oldPrice: null, discount: null },
  { id: 407, category: "Flakes & Kids Cereals", name: "Kellogg's Double Chocolaty Fills Chocos (Crunchy Outside, Creamy Inside)", weight: "250 g", price: 185, oldPrice: null, discount: null },
  { id: 408, category: "Flakes & Kids Cereals", name: "Kellogg's Original Corn Flakes", weight: "250 g", price: 105, oldPrice: null, discount: null },
  { id: 409, category: "Flakes & Kids Cereals", name: "Kellogg's Froot Loops - Crunchy Multigrain Cereal", weight: "285 g", price: 175, oldPrice: null, discount: null },
  { id: 410, category: "Flakes & Kids Cereals", name: "Kellogg's Multigrain Chocos Crunchy Bites Kids Cereal", weight: "375 g", price: 190, oldPrice: null, discount: null },
  { id: 411, category: "Flakes & Kids Cereals", name: "Kellogg's Almonds & Honey Corn Flakes", weight: "168 g", price: 99, oldPrice: null, discount: null },
  { id: 412, category: "Flakes & Kids Cereals", name: "Kellogg's Chocos Fills Double Chocolaty Cereal", weight: "150 g", price: 110, oldPrice: null, discount: null },

  // MUESLI & GRANOLA (6 items)
  { id: 501, category: "Muesli & Granola", name: "Bagrry's Crunchy Muesli 30% Fruit & Nut with Cranberries", weight: "750 g", price: 475, oldPrice: null, discount: null },
  { id: 502, category: "Muesli & Granola", name: "Kellogg's Muesli Fruit, Nut & Seeds", weight: "240 g", price: 160, oldPrice: null, discount: null },
  { id: 503, category: "Muesli & Granola", name: "Kellogg's Muesli Fruit, Nut & Seeds", weight: "750 g", price: 460, oldPrice: null, discount: null },
  { id: 504, category: "Muesli & Granola", name: "Kellogg's Fruit, Nut & Seeds Muesli", weight: "65 g", price: 45, oldPrice: null, discount: null },
  { id: 505, category: "Muesli & Granola", name: "Kwality 25g High Protein Muesli", weight: "400 g", price: 299, oldPrice: null, discount: null },
  { id: 506, category: "Muesli & Granola", name: "Pintola 25g High Protein Muesli Dark Chocolate & Cranberry", weight: "400 g", price: 349, oldPrice: null, discount: null },

  // OATS (6 items)
  { id: 601, category: "Oats", name: "Pintola High Protein Magic Masala Oats", weight: "400 g", price: 215, oldPrice: 239, discount: null },
  { id: 602, category: "Oats", name: "Quaker Rolled Instant Oats", weight: "400 g", price: 86, oldPrice: null, discount: "11% OFF" },
  { id: 603, category: "Oats", name: "Pintola High Protein Oats (Chocolate)", weight: "1 kg", price: 550, oldPrice: 620, discount: "10% OFF" },
  { id: 604, category: "Oats", name: "Pintola High Protein Oats (Dark Chocolate)", weight: "400 g", price: 276, oldPrice: 310, discount: "29% OFF" },
  { id: 605, category: "Oats", name: "GOAT Life High Protein Overnight Instant Oats Choco-Nut Crunch - Pack of 2", weight: "2 x 75 g", price: 196, oldPrice: 278, discount: "25% OFF" },
  { id: 606, category: "Oats", name: "Bagrry's 100% Whole Grain White Instant Oats", weight: "1 kg", price: 165, oldPrice: 220, discount: null },

  // PANEER & TOFU (6 items)
  { id: 701, category: "Paneer & Tofu", name: "Ananda Premium Paneer", weight: "200 g", price: 105, oldPrice: null, discount: null },
  { id: 702, category: "Paneer & Tofu", name: "Mother Dairy Paneer", weight: "200 g", price: 95, oldPrice: null, discount: null },
  { id: 703, category: "Paneer & Tofu", name: "Amul Fresh Malai Paneer", weight: "200 g", price: 95, oldPrice: null, discount: null },
  { id: 704, category: "Paneer & Tofu", name: "Gopala Fresh Malai Paneer", weight: "200 g", price: 110, oldPrice: null, discount: null },
  { id: 705, category: "Paneer & Tofu", name: "Ananda Paneer (Made From Cow Milk) - with Free Curd", weight: "180 g", price: 90, oldPrice: null, discount: null },
  { id: 706, category: "Paneer & Tofu", name: "Milky Mist Low Fat High Protein Paneer", weight: "200 g", price: 98, oldPrice: 165, discount: "40% OFF" },

  // CURD & YOGURT (12 items)
  { id: 801, category: "Curd & Yogurt", name: "Amul Greek Yogurt (Blueberry)", weight: "100 g", price: 40, oldPrice: 45, discount: null },
  { id: 802, category: "Curd & Yogurt", name: "Amul Masti Pouch Curd", weight: "380 g", price: 35, oldPrice: null, discount: "13% OFF" },
  { id: 803, category: "Curd & Yogurt", name: "Country Delight Ghar Jaisa Cup Curd", weight: "400 g", price: 69, oldPrice: 80, discount: null },
  { id: 804, category: "Curd & Yogurt", name: "Mother Dairy Classic Cup Curd", weight: "200 g", price: 25, oldPrice: null, discount: "12% OFF" },
  { id: 805, category: "Curd & Yogurt", name: "Amul Greek Yogurt (Plain)", weight: "100 g", price: 35, oldPrice: 40, discount: null },
  { id: 806, category: "Curd & Yogurt", name: "Amul Masti Pouch Curd", weight: "1 kg", price: 80, oldPrice: null, discount: null },
  { id: 807, category: "Curd & Yogurt", name: "Mother Dairy Classic Pouch Curd", weight: "390 g", price: 35, oldPrice: null, discount: null },
  { id: 808, category: "Curd & Yogurt", name: "Nestle a+ Dahi, Thick & Creamy Cup Curd", weight: "180 g", price: 35, oldPrice: null, discount: "11% OFF" },
  { id: 809, category: "Curd & Yogurt", name: "Amul Flavoured Greek Yogurt (Strawberry)", weight: "100 g", price: 40, oldPrice: 45, discount: null },
  { id: 810, category: "Curd & Yogurt", name: "Amul Masti Set Cup Curd Tub", weight: "1 kg", price: 115, oldPrice: null, discount: null },
  { id: 811, category: "Curd & Yogurt", name: "Amul Masti Cup Curd", weight: "200 g", price: 25, oldPrice: null, discount: null },
  { id: 812, category: "Curd & Yogurt", name: "Mother Dairy Ultimate Cup Curd", weight: "400 g", price: 70, oldPrice: null, discount: null },

  // BREAKFAST MIXES (12 items)
  { id: 901, category: "Breakfast Mixes", name: "English Oven Fruit Bun", weight: "150 g", price: 20, oldPrice: null, discount: null },
  { id: 902, category: "Breakfast Mixes", name: "English Oven Pizza Base", weight: "200 g", price: 50, oldPrice: null, discount: null },
  { id: 903, category: "Breakfast Mixes", name: "iD Wheat Lachha Paratha", weight: "5 pcs", price: 115, oldPrice: null, discount: "6% OFF" },
  { id: 904, category: "Breakfast Mixes", name: "MTR Rava Idli Breakfast Mix", weight: "500 g", price: 124, oldPrice: 133, discount: "5% OFF" },
  { id: 905, category: "Breakfast Mixes", name: "MTR Dosa Breakfast Mix", weight: "500 g", price: 130, oldPrice: 138, discount: "5% OFF" },
  { id: 906, category: "Breakfast Mixes", name: "MTR Rice Idli Breakfast Mix", weight: "500 g", price: 130, oldPrice: 138, discount: "6% OFF" },
  { id: 907, category: "Breakfast Mixes", name: "MTR Upma Breakfast Mix", weight: "160 g", price: 54, oldPrice: 58, discount: null },
  { id: 908, category: "Breakfast Mixes", name: "MTR Uttappam Breakfast Mix", weight: "500 g", price: 142, oldPrice: null, discount: null },
  { id: 909, category: "Breakfast Mixes", name: "MTR 3 Minute Veggie Upma Breakfast Mix", weight: "60 g", price: 27, oldPrice: null, discount: "6% OFF" },
  { id: 910, category: "Breakfast Mixes", name: "MTR Masala Rava Idli Breakfast Mix", weight: "500 g", price: 125, oldPrice: 133, discount: "11% OFF" },
  { id: 911, category: "Breakfast Mixes", name: "MTR 3 Minute Poha Breakfast Mix", weight: "300 g", price: 118, oldPrice: 133, discount: null },
  { id: 912, category: "Breakfast Mixes", name: "MTR Khaman Dhokla- Instant Mix", weight: "2 x 160 g", price: 89, oldPrice: null, discount: null },

  // BATTER (10 items)
  { id: 1001, category: "Batter", name: "iD Idli & Dosa Batter - 500 g", weight: "500 g", price: 72, oldPrice: null, discount: null },
  { id: 1002, category: "Batter", name: "Amma's Special Idli / Dosa Batter", weight: "1 kg", price: 99, oldPrice: null, discount: null },
  { id: 1003, category: "Batter", name: "iD Idli & Dosa Batter - 1 kg", weight: "1 kg", price: 130, oldPrice: null, discount: null },
  { id: 1004, category: "Batter", name: "Rishta Fresh & Tasty Idli & Dosa Batter", weight: "1 kg", price: 130, oldPrice: 135, discount: "11% OFF" },
  { id: 1005, category: "Batter", name: "iD Idli & Dosa Batter (2 kg)", weight: "2 kg", price: 169, oldPrice: 190, discount: null },
  { id: 1006, category: "Batter", name: "Rishta Multigrain Speciality Idli Dosa Batter", weight: "800 g", price: 135, oldPrice: null, discount: "14% OFF" },
  { id: 1007, category: "Batter", name: "iD Protein-Rich Idli Dosa Batter", weight: "1 kg", price: 129, oldPrice: 150, discount: "17% OFF" },
  { id: 1008, category: "Batter", name: "iD Moong Chilla Batter", weight: "500 g", price: 65, oldPrice: 79, discount: "16% OFF" },
  { id: 1009, category: "Batter", name: "iD Fresh High Fibre Brown Rice & Oats Dosa Batter", weight: "500 g", price: 75, oldPrice: 90, discount: "12% OFF" },
  { id: 1010, category: "Batter", name: "Rishta Idli Dosa Batter", weight: "600 g", price: 69, oldPrice: 79, discount: "5% OFF" }
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((item, idx) => {
  const imageIndex = idx + 1;
  return {
    ...item,
    time: "8 MINS",
    image: `/images/product-${imageIndex}.avif`
  };
});

export const CATEGORY_INFO: Record<CategoryName, { name: CategoryName; image: string; description: string }> = {
  "Milk": {
    name: "Milk",
    image: "/images/product-1.avif",
    description: "Farm-fresh pasteurised, toned, full cream and A2 cow milk"
  },
  "Bread & Pav": {
    name: "Bread & Pav",
    image: "/images/product-13.avif",
    description: "Freshly baked whole wheat, multigrain, milk bread and pav"
  },
  "Eggs": {
    name: "Eggs",
    image: "/images/product-25.avif",
    description: "Protein-rich white, brown, free range & organic eggs"
  },
  "Flakes & Kids Cereals": {
    name: "Flakes & Kids Cereals",
    image: "/images/product-31.avif",
    description: "Corn flakes, Chocos, Froot Loops, chocolate crunch & breakfast bowls"
  },
  "Muesli & Granola": {
    name: "Muesli & Granola",
    image: "/images/product-43.avif",
    description: "Crunchy fruit & nut muesli, seeds, berry and dark chocolate granola"
  },
  "Oats": {
    name: "Oats",
    image: "/images/product-49.avif",
    description: "Rolled instant oats, magic masala, overnight oats and high protein options"
  },
  "Paneer & Tofu": {
    name: "Paneer & Tofu",
    image: "/images/product-55.avif",
    description: "Fresh malai paneer, organic cow milk paneer and low fat cubes"
  },
  "Curd & Yogurt": {
    name: "Curd & Yogurt",
    image: "/images/product-61.avif",
    description: "Thick set dahi, pouch curd, and authentic fruit Greek yogurts"
  },
  "Breakfast Mixes": {
    name: "Breakfast Mixes",
    image: "/images/product-73.avif",
    description: "Rava idli, dosa, upma, poha, and quick traditional instant mixes"
  },
  "Batter": {
    name: "Batter",
    image: "/images/product-85.avif",
    description: "Naturally fermented idli, dosa, moong chilla and multigrain batter"
  }
};
