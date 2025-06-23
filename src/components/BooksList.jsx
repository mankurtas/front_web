
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext"
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router";



function BooksList() {

    const { books } = useContext(BooksContext);
    const { user } = useContext(UserContext)


    return (
        <div className="bg-base-100 rounded-box shadow-md p-4">
            <h2 className="text-xs opacity-60 tracking-wide mb-2">List of books</h2>
            {user?.role === 'admin' && (<div><NavLink to="/insert_book"> <button className="btn btn-md btn-success ">+ Add Book</button></NavLink>
                <NavLink to="/insert_book"> <button className="btn btn-md btn-success ">+ Insert Category</button></NavLink></div>
            )}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                    <li key={book.id}>
                        <div className="card card-side bg-base-100 shadow-md p-4 flex items-center gap-4">
                            <figure className="w-32 h-40 overflow-hidden rounded-lg">
                                <img src={book.cover} alt="book" className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body flex-1">
                                <h2 className="card-title text-lg font-semibold">{book.title}</h2>
                                <p className="text-sm text-gray-600">Author: {book.author}</p>
                                <p className="text-sm text-gray-600">Category: {book.category}</p>
                                <p className="text-sm text-gray-600">Reserved: {book.reserved ? "Yes" : "No"}</p>
                            </div>

                            {user?.role === 'admin' && (<NavLink to={`/book/${book.id}`} className="btn btn-primary">
                                Edit
                            </NavLink>
                            )}
                        </div>


                    </li>
                ))}
            </ul>

        </div>
    );
}

export default BooksList;