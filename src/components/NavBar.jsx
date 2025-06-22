import { Home, Map, Compass } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { userLogout } from "../services/logout";


export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Pradžia", icon: <Home size={30} /> },
    { to: "/tours", label: "Ekskursijos", icon: <Map size={30} /> },
  ];

  const logout = async () => {
    try {
      await userLogout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-primary text-cyan-100 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs sm:text-sm transition-colors duration-200 ${isActive ? "text-base" : "text-neutral hover:text-warning"
                }`
              }
            >
              <div className="mb-1">{icon}</div>
              <span>{label}</span>
            </NavLink>
          ))}
          {user && (<NavLink
            to={`/mytours`}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs sm:text-sm transition-colors duration-200 ${isActive ? "text-secondary" : "text-neutral hover:text-accent"
              }`
            }
          >
            <div className="mb-1">{<Compass size={30} />}</div>
            <span>Mano turai</span>
          </NavLink>)}


        </div>

        {/* Login Log outButton */}
        {user ?
          (
            <div>
              <button onClick={logout} className="btn btn-md btn-accent ">
                Atsijungti
              </button>
            </div>
          ) : <div>
            <Link
              to="/login"
              className="btn btn-md btn-success "
            >
              Prisijungti
            </Link>
          </div>
        }
      </div>
    </nav>
  );
}


{/* <div>
           {user && (
            <NavLink to={`/mytours`} >
              <div className="mb-1">{Compass}</div>
              <span>Mano turai</span>
            </NavLink>)}
         </div> */}