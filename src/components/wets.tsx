{
  /* <Table>
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
            <Button color="success" onClick={() => handleEdit(product)}>
              Edit
            </Button>
          )}
        </Table.Cell>
        <Table.Cell className="w-[148px]">
          <Button onClick={() => handleDelete(product.id)} color="failure">
            Delete
          </Button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>; */
}
