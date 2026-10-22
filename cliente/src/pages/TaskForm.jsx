import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepuesto, createRepuesto, updateRepuesto, deleteRepuesto } from "../api/repuestos";

function TaskForm() {
  const [repuesto, setRepuesto] = useState('');
  const [modeloCompatible, setModeloCompatible] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const dataToSend = {
        repuesto,
        modelo_compatible: modeloCompatible,
        precio: parseFloat(precio) || 0,
        disponible
      };

      if (!params.id) {
        await createRepuesto(dataToSend);
      } else {
        await updateRepuesto(params.id, dataToSend);
      }
      navigate("/");
    } catch (error) {
      console.log("Error al guardar el repuesto:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMsg(error.response.data.detail);
      } else {
        setErrorMsg("Ocurrió un error al guardar. Es posible que el repuesto ya exista.");
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchRepuesto(params.id)
        .then((res) => {
          setRepuesto(res.data.repuesto);
          setModeloCompatible(res.data.modelo_compatible);
          setPrecio(res.data.precio);
          setDisponible(res.data.disponible);
        })
        .catch((err) => console.log("Error al obtener repuesto por ID:", err));
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este repuesto del inventario?")) {
      try {
        await deleteRepuesto(params.id);
        navigate("/");
      } catch (error) {
        console.log("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-zinc-950 p-8 rounded-lg shadow-xl border border-zinc-800">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">
            {params.id ? "Actualizar Repuesto" : "Crear Repuesto"}
          </h3>

          {/* Alerta visual de error */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-300 text-sm rounded">
              {errorMsg}
            </div>
          )}

          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Nombre del Repuesto</label>
          <input
            type="text"
            placeholder="Ej. Pastillas de freno"
            className="block py-2 px-3 mb-4 w-full text-black rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setRepuesto(e.target.value)}
            value={repuesto}
            autoFocus
            required
          />

          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Modelo Compatible</label>
          <input
            type="text"
            placeholder="Ej. Chevrolet Sail 2020"
            className="block py-2 px-3 mb-4 w-full text-black rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setModeloCompatible(e.target.value)}
            value={modeloCompatible}
            required
          />

          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Precio Unitario ($)</label>
          <input
            type="number"
            step="0.01"
            placeholder="Ej. 45000"
            className="block py-2 px-3 mb-4 w-full text-black rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setPrecio(e.target.value)}
            value={precio}
            required
          />

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="disponibleCheck"
              className="w-4 h-4 text-emerald-600 rounded bg-slate-100 border-gray-300 focus:ring-emerald-500"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
            />
            <label htmlFor="disponibleCheck" className="ml-2 text-sm text-slate-300">
              Disponible en inventario
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-slate-200 text-slate-900 font-bold py-2 px-4 rounded transition-all"
          >
            {params.id ? "Actualizar Repuesto" : "Crear Repuesto"}
          </button>

          {params.id && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full mt-3 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all"
            >
              Eliminar Repuesto
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TaskForm;