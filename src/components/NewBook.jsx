import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import {AuthorsContext} from "../context/AuthorContext"
import {CategoryContext} from "../context/CategoryContex"
import { BooksContext } from "../context/BooksContext";
import axios from "axios";
import { NavLink } from "react-router-dom"; // use react-router-dom not react-router
import { UserContext } from "../context/UserContext";

const apiURL = import.meta.env.VITE_API_URL;

function NewBook() {

  const {authors} = useContext(AuthorsContext);
  const {category} = useContext(CategoryContext);
  const {fetchBooks}= useContext(BooksContext)
  const { register, handleSubmit, reset } = useForm();
  const [addedBook, setAddedBook] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${apiURL}books/create`,
        {
          title: data.title,
          authorid: data.authorid,
          categoryid: data.categoryid,
          cover: data.cover || undefined, // Optional
        },
        { withCredentials: true }
      );

      setAddedBook(response.data.data);
      fetchBooks()
      reset();
    } catch (err) {
      console.error("Failed to add book:", err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Book</h2>

        {/* Title input */}
        <div className="form-control">
          <label className="label">Title</label>
          <label className="input">
            <input type="text" {...register("title", { required: true })} placeholder="Book Title" />
          </label>
        </div>

        {/* Author select */}
        <div className="form-control">
          <label className="label">Author</label>
          <select {...register("authorid", { required: true })} className="select select-bordered">
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category select */}
        <div className="form-control">
          <label className="label">Category</label>
          <select {...register("categoryid", { required: true })} className="select select-bordered">
            <option value="">Select category</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Cover URL */}
        <div className="form-control">
          <label className="label">Cover Image (optional)</label>
          <label className="input">
            <input type="url" {...register("cover")} placeholder="https://..." />
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-4">Add Book</button>

        <button type="button" className="btn btn-neutral mt-4">
          <NavLink to="/">Back to list</NavLink>
        </button>
      </form>

      {addedBook && (
        <div className="max-w-md mx-auto mt-6 p-4 bg-success text-success-content rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Book Added!</h3>
          <p><strong>Title:</strong> {addedBook.title}</p>
        </div>
      )}
    </>
  );
}

export default NewBook;
