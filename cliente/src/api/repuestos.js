import axios from "axios";

const URL = 'http://localhost:8000';
const endpoint = `${URL}/api/repuestos`;

// Obtener todos los repuestos del inventario
export const fetchRepuestos = () => axios.get(endpoint);

// Obtener un repuesto específico por su ID
export const fetchRepuesto = (id) => axios.get(`${endpoint}/${id}`);

// Crear un nuevo repuesto
export const createRepuesto = (newRepuesto) => axios.post(endpoint, newRepuesto);

// Actualizar un repuesto existente por su ID
export const updateRepuesto = (id, repuesto) => axios.put(`${endpoint}/${id}`, repuesto);

// Eliminar un repuesto por su ID
export const deleteRepuesto = (id) => axios.delete(`${endpoint}/${id}`);