import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { CategoryContext } from "../context/CategoryContex";
import axios from "axios";
import { NavLink } from "react-router-dom";

const apiURL = import.meta.env.VITE_API_URL;

function NewCategory() {
  const { setCategory } = useContext(CategoryContext);
  const { register, handleSubmit, reset } = useForm();
  const [addedCategory, setAddedCategory] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${apiURL}categories/create`,
        { category: data.category },
        { withCredentials: true }
      );

      setAddedCategory(response.data.data);

      // Optionally update context list to include new category instantly
      setCategory((prev) => [...prev, response.data.data]);

      reset();
    } catch (err) {
      console.error("Failed to add category:", err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Category</h2>

        <div className="form-control">
          <label className="label">Category Name</label>
          <label className="input">
            <input
              type="text"
              {...register("category", { required: true, minLength: 2 })}
              placeholder="Category Name"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Add Category
        </button>

        <button type="button" className="btn btn-neutral mt-4">
          <NavLink to="/">Back to list</NavLink>
        </button>
      </form>

      {addedCategory && (
        <div className="max-w-md mx-auto mt-6 p-4 bg-success text-success-content rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Category Added!</h3>
          <p><strong>Name:</strong> {addedCategory.category}</p>
        </div>
      )}
    </>
  );
}

export default NewCategory;
