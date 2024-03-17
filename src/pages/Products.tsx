import React, { useEffect, useState, ChangeEvent } from "react";
import useProduct from "../app/useProduct";
import Loading from "../components/Loading";
import { Button, Table, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { ProductType } from "../types/Product.type";

const Products: React.FC = () => {
  const {
    loading,
    error,
    products,
    getProducts,
    deleteProduct,
    updateProduct,
  } = useProduct();
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (id: number) => {
    console.log(id);
    deleteProduct(id);
  };

  const handleEdit = (product: ProductType) => {
    setEditingProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSave = () => {
    if (editedProduct) {
      updateProduct(editedProduct);
      setEditingProductId(null);
      setEditedProduct(null);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof ProductType
  ) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [key]: e.target.value,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        products && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Avatar</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {products.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Cell>
                    <img
                      src={product.avatar}
                      alt={product.title}
                      className="rounded-full w-12 h-12"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {editingProductId === product.id ? (
                      <TextInput
                        type="text"
                        value={editedProduct?.title}
                        onChange={(e) => handleChange(e, "title")}
                      />
                    ) : (
                      product.title
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {editingProductId === product.id ? (
                      <TextInput
                        type="number"
                        value={editedProduct?.price}
                        onChange={(e) => handleChange(e, "price")}
                      />
                    ) : (
                      product.price
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {editingProductId === product.id ? (
                      <TextInput
                        type="text"
                        value={editedProduct?.category}
                        onChange={(e) => handleChange(e, "category")}
                      />
                    ) : (
                      product.category
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {editingProductId === product.id ? (
                      <TextInput
                        type="text"
                        value={editedProduct?.description}
                        onChange={(e) => handleChange(e, "description")}
                      />
                    ) : (
                      product.description
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {editingProductId === product.id ? (
                      <Button onClick={handleSave}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEdit(product)}>Edit</Button>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )
      )}

      <div className="flex w-full justify-center ">
        <Link
          className="my-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to="/addproducts"
        >
          Add New Product{" "}
        </Link>
      </div>
    </div>
  );
};

export default Products;