import { useNavigate } from "react-router-dom";
import { updateRepuesto } from "../api/repuestos";

function TaskCard({ repuestoItem }) {
  const navigate = useNavigate();

  const handleToggleDisponibilidad = async (e) => {
    e.stopPropagation();
    try {
      const res = await updateRepuesto(repuestoItem._id, {
        disponible: !repuestoItem.disponible
      });
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error al cambiar disponibilidad:", error);
    }
  };

  return (
    <div
      className="bg-zinc-950 p-5 rounded-lg shadow-lg hover:cursor-pointer hover:bg-zinc-900 border border-zinc-800 transition-all flex flex-col justify-between"
      onClick={() => navigate(`/repuestos/${repuestoItem._id}`)}
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-xl text-white">{repuestoItem.repuesto}</h2>
          <button
            onClick={handleToggleDisponibilidad}
            className="p-1.5 rounded-full hover:bg-zinc-800 focus:outline-none"
            title="Cambiar estado de disponibilidad"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${repuestoItem.disponible ? 'text-green-500' : 'text-zinc-600'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
        </div>
        <p className="text-slate-300 text-sm mb-1">
          <strong className="text-white">Modelo compatible:</strong> {repuestoItem.modelo_compatible}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center">
        <span className="text-emerald-400 font-semibold">
          ${repuestoItem.precio}
        </span>
        <span className={`text-xs px-2 py-1 rounded ${repuestoItem.disponible ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>
          {repuestoItem.disponible ? 'Disponible' : 'Agotado'}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;