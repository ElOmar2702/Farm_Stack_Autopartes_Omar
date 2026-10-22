from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)]

class Repuesto(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias='_id')
    repuesto: str
    modelo_compatible: str
    precio: float
    disponible: bool = True

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }

class UpdateRepuesto(BaseModel):
    repuesto: Optional[str] = None
    modelo_compatible: Optional[str] = None
    precio: Optional[float] = None
    disponible: Optional[bool] = None

    model_config = {
        "from_attributes": True,
        "populate_by_name": True,
        "json_encoders": {object: str}
    }