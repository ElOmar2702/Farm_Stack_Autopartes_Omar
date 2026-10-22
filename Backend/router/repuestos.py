from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import (
    get_todos_repuestos,
    get_one_repuesto_id,
    get_repuesto_por_nombre,
    update_repuesto,
    create_repuesto,
    delete_repuesto
)
from models import Repuesto, UpdateRepuesto

repuesto_router = APIRouter()


@repuesto_router.get('/api/repuestos')
async def get_repuestos():
    repuestos = await get_todos_repuestos()
    return repuestos


@repuesto_router.post('/api/repuestos', response_model=Repuesto)
async def save_repuesto(repuesto_data: Repuesto):
    existente = await get_repuesto_por_nombre(repuesto_data.repuesto)
    if existente:
        raise HTTPException(status_code=400, detail="El repuesto ya existe en el inventario")

    dict_repuesto = repuesto_data.model_dump()
    if dict_repuesto.get('id') is None:
        del dict_repuesto['id']

    response = await create_repuesto(dict_repuesto)
    return response


@repuesto_router.get('/api/repuestos/{id}', response_model=Repuesto)
async def get_repuesto(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")

    repuesto = await get_one_repuesto_id(id)
    if repuesto:
        return repuesto
    raise HTTPException(404, f'Repuesto con ID {id} no encontrado')


@repuesto_router.put('/api/repuestos/{id}', response_model=Repuesto)
async def put_repuesto(id: str, repuesto_data: UpdateRepuesto):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")

    response = await update_repuesto(id, repuesto_data)
    if response:
        return response
    raise HTTPException(404, f'Repuesto con ID {id} no encontrado')


@repuesto_router.delete('/api/repuestos/{id}')
async def remove_repuesto(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es inválido")

    response = await delete_repuesto(id)
    if response:
        return 'Repuesto borrado satisfactoriamente'
    raise HTTPException(404, f'Repuesto con ID {id} no encontrado')