import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FileInput, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

interface Product {
  title: string;
  price: number;
  avatar: string;
  category: string;
  description: string;
  image: string;
}

const AddProducts: React.FC<{
  addProduct: (product: Product) => void;
}> = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [avatar, setAvatar] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    avatar: "",
    category: "",
    description: "",
    image: "",
  });

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
      try {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          () => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProduct({ ...product, image: downloadURL });
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

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
        console.log("Product added:", data);
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!image) return; // Tasvir tanlanmagan holatda to'xtatish
    const newProduct: Product = {
      title,
      price,
      avatar,
      category,
      description,
      image: product.image,
    };
    addProductToAPI(newProduct);
    setTitle("");
    setPrice(0);
    setAvatar("");
    setCategory("");
    setDescription("");
    setImage(null); // Tasvirni o'chiramiz
    navigate("/products");
  };

  return (
    <div className="w-[50%] mx-auto my-12">
      <h2 className="text-4xl text-gray-900 text-center">Add Product</h2>
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
        <div>
          <div className="max-w-2xl p-6 mx-auto">
            <label htmlFor="" className="mb-3 block text-xl">
              Product photo
            </label>
            <FileInput onChange={handleUploadImage} />
            <div className="">
              {product.image && (
                <img src={product.image} alt="" className="w-80" />
              )}
            </div>
          </div>
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddProducts;
