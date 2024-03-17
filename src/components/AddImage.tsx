import { Button, FileInput } from "flowbite-react";
import { useState } from "react";

const AddImage = () => {
  const [image, setImage] = useState(null);

  return (
    <div className="mx-auto">
      <div className="flex justify-center items-center">
        <FileInput onChange={(e) => setImage(e.target.files[0])} />
        <Button outline>Uplaud</Button>
      </div>
    </div>
  );
};

export default AddImage;
