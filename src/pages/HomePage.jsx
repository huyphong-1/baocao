import React from "react";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: "31.990.000đ",
    discount: "-10%",
    description: "Apple A17 Pro, Màn 6.7\" OLED 120Hz, Camera 48MP",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    price: "28.990.000đ",
    discount: "-10%",
    description: "Snapdragon 8 Gen 3, Màn 6.8\" QHD+, Camera 200MP",
  },
  {
    id: 3,
    name: "Xiaomi 14 256GB",
    brand: "Xiaomi",
    price: "18.990.000đ",
    discount: "New",
    description: "Snapdragon 8 Gen 3, Màn 6.36\" 120Hz, Leica Camera",
  },
  {
    id: 4,
    name: "iPad Pro 11 M4 256GB",
    brand: "Apple",
    price: "25.990.000đ",
    discount: "Tablet",
    description: "Apple M4, Màn 11\" OLED, Hỗ trợ Apple Pencil",
  },
];

const HomePage = () => {
  return (
    <div className="flex justify-center gap-4 px-4 py-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col"
        >
          <img
            src={`https://via.placeholder.com/200x200.png?text=${product.name}`}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="mt-4">
            <h3 className="font-bold text-lg text-primary">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <span className="text-xl font-semibold text-primary mt-2">
              {product.price}
            </span>
            <button className="mt-4 bg-primary text-white py-2 px-4 rounded-full">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
