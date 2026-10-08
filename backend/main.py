from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import db


class Game(BaseModel):
    id: str
    name: str
    category: str
    price: float
    stock: int
    owned: bool = False
    imageUrl: str | None = None


class GameUpdate(BaseModel):
    name: str
    category: str
    price: float
    stock: int
    imageUrl: str | None = None


class PriceUpdate(BaseModel):
    price: float


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.collection.create_index("id", unique=True)
    yield
    await db.client.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/get_all_games")
async def list_games():
    return await db.get_all_games()


@app.get("/read_games/{game_id}")
async def read_game(game_id: str):
    game = await db.get_game(game_id)
    if game is None:
        raise HTTPException(status_code=404, detail="Spiel nicht gefunden")
    return game


@app.post("/create_games", status_code=201)
async def create_game(game: Game):
    await db.add_game(game.model_dump())
    return game


@app.put("/update_games/{game_id}")
async def update_game(game_id: str, body: GameUpdate):
    if await db.update_game(game_id, body.model_dump()) == 0:
        raise HTTPException(status_code=404, detail="Spiel nicht gefunden")
    return {"ok": True}


@app.post("/buy_games/{game_id}")
async def buy_game(game_id: str):
    result = await db.buy_game(game_id)
    if result == "not_found":
        raise HTTPException(status_code=404, detail="Spiel nicht gefunden")
    if result == "out_of_stock":
        raise HTTPException(status_code=409, detail="Spiel ist ausverkauft")
    return {"ok": True}


@app.patch("/change_games/{game_id}/price")
async def change_price(game_id: str, body: PriceUpdate):
    if await db.update_price(game_id, body.price) == 0:
        raise HTTPException(status_code=404, detail="Spiel nicht gefunden")
    return {"ok": True}


@app.delete("/delete_games/{game_id}", status_code=204)
async def remove_game(game_id: str):
    if await db.delete_game(game_id) == 0:
        raise HTTPException(status_code=404, detail="Spiel nicht gefunden")