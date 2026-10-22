import TaskCard from "./TaskCard";

function TaskList({ repuestos }) {
  if (!repuestos || repuestos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">No hay repuestos registrados en el inventario.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {repuestos.map((repuesto) => (
        <TaskCard repuestoItem={repuesto} key={repuesto._id} />
      ))}
    </div>
  );
}

export default TaskList;