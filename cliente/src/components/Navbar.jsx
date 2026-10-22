import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex justify-between items-center my-7 border-b border-zinc-800 pb-4">
      <Link to="/">
        <h1 className="text-3xl font-bold tracking-wide">Autopartes App</h1>
      </Link>
      <Link
        to="/repuestos/new"
        className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded border border-zinc-700 transition-all"
      >
        Crear Repuesto
      </Link>
    </header>
  );
}

export default Navbar;