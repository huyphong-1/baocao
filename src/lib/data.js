// lib/data.js
export const phones = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 31990000,
    oldPrice: 34990000,
    badge: "Hot",
    image: "/phones/iphone15pm.jpg",
    specs: ["Apple A17 Pro", 'Màn 6.7" OLED 120Hz', "Camera 48MP", "Pin 4422 mAh"],
    brand: "Apple",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 256GB",
    price: 28990000,
    oldPrice: 31990000,
    badge: "-10%",
    image: "/phones/s24ultra.jpg",
    specs: ["Snapdragon 8 Gen 3", 'Màn 6.8" QHD+', "Camera 200MP", "Pin 5000 mAh"],
    brand: "Samsung",
  },
  {
    id: 3,
    name: "Xiaomi 14 256GB",
    price: 18990000,
    oldPrice: 20990000,
    badge: "New",
    image: "/phones/xiaomi14.jpg",
    specs: ["Snapdragon 8 Gen 3", 'Màn 6.36" 120Hz', "Leica Camera", "Pin 4610 mAh"],
    brand: "Xiaomi",
  },
  {
    id: 4,
    name: "iPad Pro 11 M4 256GB",
    price: 25990000,
    oldPrice: 28990000,
    badge: "Tablet",
    image: "/phones/ipadpro.jpg",
    specs: ["Apple M4", 'Màn 11" OLED", "Hỗ trợ Apple Pencil", "Face ID"],
    brand: "Apple",
  },
];

export const accessories = [
  {
    id: 1,
    name: "AirPods Pro 2",
    price: 5490000,
    image: "/phones/airpods.jpg",
  },
  {
    id: 2,
    name: "Cường lực iPhone 15 Pro Max",
    price: 190000,
    image:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    name: "Ốp lưng chống sốc S24 Ultra",
    price: 290000,
    image:
      "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const formatPrice = (number) =>
  number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
