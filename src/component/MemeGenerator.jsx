import { useState } from "react";

const MemeGenerator = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const handleAddCategory = () => {
    const categoryName = document.getElementById("categoryName").value.trim();
    const categoryColor = document.getElementById("categoryColor").value;

    if (categoryName === "") {
      window.alert("Please enter a category name");
      return;
    }

    const newCategory = {
      name: categoryName,
      color: categoryColor,
    };

    setCategories([...categories, newCategory]);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function (event) {
        const newImage = {
          src: event.target.result,
          id: `uploadedImage${images.length + i}`,
        };

        setImages((prevImages) => [...prevImages, newImage]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (event, image) => {
    event.dataTransfer.setData("text", image.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("bg-gray-400");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("bg-gray-400");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("bg-gray-400");
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    event.currentTarget.appendChild(draggableElement);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div className="bg-gray-800 p-5 h-full w-full">
      <span className="z-10">
        <a href="http://instagram.com/dev_1.1.1.1">
          <img
            className="absolute top-5 right-5 h-16 w-16"
            src="https://img.icons8.com/clouds/50/instagram-new--v3.png"
            alt=""
          />
        </a>
      </span>

      <h1 className="mt-8 text-white text-4xl font-bold text-center p-8 flex w-full justify-center items-center">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/3d-fluency/50/face-with-tears-of-joy-icon.png"
          alt="face-with-tears-of-joy-icon"
        />
        &nbsp; Meme Generator &nbsp;
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/3d-fluency/50/face-with-tears-of-joy-icon.png"
          alt="face-with-tears-of-joy-icon"
        />
      </h1>

      <div className="upload mb-5 mt-8 p-4 w-full">
        <h2 className="text-white text-3xl font-bold text-center">
          Upload Images
        </h2>
        <div className="flex justify-center items-center p-4 m-4">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="images flex justify-center items-center gap-4 mb-10 ">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt="Uploaded Image"
            id={image.id}
            className="draggable"
            onDragStart={(event) => handleDragStart(event, image)}
          />
        ))}
      </div>

      <div className="custom-category mb-5 w-full">
        <h2 className="text-white text-3xl font-bold text-center">
          Custom Categories
        </h2>
        <div className="flex p-4 gap-2 justify-center items-center">
          <input
            type="text"
            id="categoryName"
            placeholder="Enter Category Name"
            className="text-sm p-2 border rounded"
          />
          <input type="color" id="categoryColor" className="border rounded" />
          <button
            className="bg-violet-500 text-white p-2 rounded hover:bg-violet-400"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="categories space-y-4 mt-10 p-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category drop-zone flex flex-row space-x-3 p-2 overflow-auto rounded-2xl"
            style={{ backgroundColor: category.color }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <button
              className="bg-transparent text-white rounded"
              onClick={() => handleDeleteCategory(index)}
            >
              <img
                className="h-12 w-12 rounded-2xl"
                src="https://bg-so-1.zippyimage.com/2024/05/05/8aa02ba68b7a711628d58064595e5ed3.gif"
                alt="deleteBinImg"
              />
            </button>
            <h2
              className="text-xl font-bold p-2 flex justify-center items-center"
              //  contentEditable
            >
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeGenerator;
