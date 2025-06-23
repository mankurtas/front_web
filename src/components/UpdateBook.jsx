
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, NavLink } from "react-router-dom";
import { BooksContext } from "../context/BooksContext"; // Assume you have this
import { CategoryContext } from "../context/CategoryContex";


function UpdateBook() {
    const { category } = useContext(CategoryContext)
    const { books, fetchBooks } = useContext(BooksContext);
    const { id } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [hasSavedChanges, setHasSavedChanges] = useState(false);
    const [savedData, setSavedData] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const { register, reset, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            authorid: "",
            categoryid: "",
            cover: ""
        }
    });

    const book = books?.find((book) => String(book.id) === String(id));

    useEffect(() => {
        if (book && category.length > 0) {
            reset({
                title: book.title,
                authorid: book.author_id,
                categoryid: String(book.category_id), // ensure string
                cover: book.cover
            });
        }
    }, [book, category, reset]);


    return (
        <>
            {showSuccessPopup && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                    Book updated successfully!
                </div>
            )}

            <form
                className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md flex flex-col gap-4"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Update Book</h2>

                {/* Title input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Book Title</span>
                    </label>
                    <label className="input validator">
                        <input
                            disabled={!isEditing}
                            type="text"
                            {...register("title")}
                            placeholder="e.g., The Great Gatsby"
                            required
                            minLength={1}
                            maxLength={255}
                        />
                    </label>
                </div>

                {/* Author ID input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Author ID</span>
                    </label>
                    <label className="input validator">
                        <input
                            disabled={!isEditing}
                            type="number"
                            {...register("authorid")}
                            placeholder="e.g., 5"
                            required
                            min={1}
                        />
                    </label>
                </div>

                {/* Category ID input */}

                <div className="form-control">
                    <label className="label">Category</label>
                    <select
                        disabled={!isEditing}
                        {...register("categoryid", { required: true })}
                        className="select select-bordered"
                    >
                        <option value="">Select category</option>
                        {category.map((cat) => (
                            <option key={cat.id} value={String(cat.id)}>
                                {cat.category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Cover URL input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cover Image URL</span>
                    </label>
                    <label className="input validator">
                        <input
                            disabled={!isEditing}
                            type="url"
                            {...register("cover")}
                            placeholder="https://example.com/cover.jpg"
                        />
                    </label>
                </div>

                {/* Edit Button */}
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary mt-4"
                    >
                        Edit
                    </button>
                )}

                {/* Save Button */}
                {isEditing && (
                    <button
                        type="button"
                        onClick={handleSubmit((validData) => {
                            setHasSavedChanges(true);
                            setSavedData(validData);
                        })}
                        className="btn btn-primary mt-4"
                    >
                        Save
                    </button>
                )}

                {/* Update Button */}
                {isEditing && hasSavedChanges && (
                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                    >
                        Update
                    </button>
                )}

                <button type="button" className="btn btn-neutral mt-4">
                    <NavLink to="/">Back to list</NavLink>
                </button>
            </form>
        </>
    );
}

export default UpdateBook;
