from pydantic import BaseModel, Field

class Game(BaseModel):
    id: str
    name: str = Field(min_length=1)
    category: str = Field(min_length=1)
    price: float = Field(ge=0)
    stock: int = Field(ge=0)