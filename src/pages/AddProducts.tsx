import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  title: string;
  price: string;
  avatar: string;
  category: string;
  description: string;
}

const AddProducts: React.FC<{ addProduct: (product: Product) => void }> = ({
  addProduct,
}) => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addProductToAPI = async (product: Product) => {
    try {
      const response = await fetch(
        "https://65f3d0ff105614e654a13150.mockapi.io/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      if (response.ok) {
        const data: Product = await response.json();
        console.log("Prouct added:", data);

        // Istalgan qo'shilgan mahsulotni ishlovchi logika
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const navigate = useNavigate(); // useNavigate hook'ini import qilamiz

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      title: title,
      price: price,
      avatar: avatar,
      category: category,
      description: description,
    };
    addProductToAPI(newProduct); // Yangi mahsulotni mock API-ga yuborish
    setTitle("");
    setPrice("");
    setAvatar("");
    setCategory("");
    setDescription("");

    navigate("/products"); // O'zgarishlarni saqlashdan keyin /products sahifasiga o'tish
  };

  return (
    <div className="w-[50%] mx-auto my-12">
      <h2 className="text-4xl  text-gray-900 text-center">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <TextInput
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Avatar URL:</label>
          <TextInput
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <TextInput
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddProducts;
