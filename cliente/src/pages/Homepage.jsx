import { useEffect, useState } from "react";
import { fetchRepuestos } from "../api/repuestos";
import TaskList from "../components/TaskList";

function Homepage() {
  const [repuestos, setRepuestos] = useState([]);

  useEffect(() => {
    fetchRepuestos()
      .then((res) => {
        setRepuestos(res.data);
      })
      .catch((err) => console.log("Error al cargar repuestos:", err));
  }, []);

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-6 text-slate-200">Inventario de Autopartes</h2>
      <TaskList repuestos={repuestos} />
    </div>
  );
}

export default Homepage;