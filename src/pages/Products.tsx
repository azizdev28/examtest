import React, { useEffect, useState, ChangeEvent } from "react";
import useProduct from "../app/useProduct";
import Loading from "../components/Loading";
import { Button, Table, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { ProductType } from "../types/Product.type";
import Pagination from "../components/Pagination";

const Products: React.FC = () => {
  const { loading, getProducts, products, deleteProduct, updateProduct } =
    useProduct();
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 4;

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (id: number) => {
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-[1400px] mx-auto my-24 ml-56">
      <div className="flex justify-center w-full flex-col items-center">
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
                {currentProducts.map((product) => (
                  <Table.Row key={product.id}>
                    <Table.Cell className="w-[148px]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="rounded-full w-12 h-12"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-[148px]">
                      {editingProductId === product.id ? (
                        <TextInput
                          className="w-[100px]"
                          type="text"
                          value={editedProduct?.title}
                          onChange={(e) => handleChange(e, "title")}
                        />
                      ) : (
                        product.title
                      )}
                    </Table.Cell>
                    <Table.Cell className="w-[148px]">
                      {editingProductId === product.id ? (
                        <TextInput
                          className="w-[100px]"
                          type="number"
                          value={editedProduct?.price}
                          onChange={(e) => handleChange(e, "price")}
                        />
                      ) : (
                        product.price
                      )}
                    </Table.Cell>
                    <Table.Cell className="w-[148px]">
                      {editingProductId === product.id ? (
                        <TextInput
                          className="w-[100px]"
                          type="text"
                          value={editedProduct?.category}
                          onChange={(e) => handleChange(e, "category")}
                        />
                      ) : (
                        product.category
                      )}
                    </Table.Cell>
                    <Table.Cell className="w-[148px] line-clamp-1">
                      {editingProductId === product.id ? (
                        <TextInput
                          className="w-[100px]"
                          type="text"
                          value={editedProduct?.description}
                          onChange={(e) => handleChange(e, "description")}
                        />
                      ) : (
                        product.description
                      )}
                    </Table.Cell>
                    <Table.Cell className="w-[148px]">
                      {editingProductId === product.id ? (
                        <Button onClick={handleSave} color="blue">
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
                      )}
                    </Table.Cell>
                    <Table.Cell className="w-[148px]">
                      <Button
                        onClick={() => handleDelete(product.id)}
                        color="failure"
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        <div className="flex w-full justify-center ">
          <Link
            className="my-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            to="/addproducts"
          >
            Add New Product{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
