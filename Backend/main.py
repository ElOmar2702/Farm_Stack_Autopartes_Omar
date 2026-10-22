from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from router.repuestos import repuesto_router

app = FastAPI()
origins = [
    config('FRONTEND_URL')
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def welcome():
    return {'message': 'Bienvenido a mi FastAPI API - Inventario de Autopartes'}


app.include_router(repuesto_router)
