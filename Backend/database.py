from motor.motor_asyncio import AsyncIOMotorClient
from models import Repuesto, UpdateRepuesto
from bson import ObjectId


cliente = AsyncIOMotorClient('mongodb://localhost')
database = cliente.autopartesdatabase
coleccion = database.autopartes


async def get_todos_repuestos():
    repuestos = []
    cursor = coleccion.find({})
    async for document in cursor:
        document['_id'] = str(document['_id'])
        repuestos.append(Repuesto(**document))
    return repuestos


async def create_repuesto(repuesto_data: dict):
    new_repuesto = await coleccion.insert_one(repuesto_data)
    created_repuesto = await coleccion.find_one({'_id': new_repuesto.inserted_id})
    if created_repuesto:
        created_repuesto['_id'] = str(created_repuesto['_id'])
    return created_repuesto


async def get_one_repuesto_id(id: str):
    task = await coleccion.find_one({'_id': ObjectId(id)})
    if task:
        task['_id'] = str(task['_id'])
    return task


async def get_repuesto_por_nombre(nombre: str):
    repuesto = await coleccion.find_one({'repuesto': nombre})
    if repuesto:
        repuesto['_id'] = str(repuesto['_id'])
    return repuesto


async def update_repuesto(id: str, data: UpdateRepuesto):
    repuestos_data = data.model_dump(by_alias=True, exclude_none=True)
    repuestos_data.pop('_id', None)
    await coleccion.update_one({'_id': ObjectId(id)}, {'$set': repuestos_data})
    document = await coleccion.find_one({'_id': ObjectId(id)})
    if document:
        document['_id'] = str(document['_id'])
    return document


async def delete_repuesto(id: str):
    await coleccion.delete_one({'_id': ObjectId(id)})
    return True