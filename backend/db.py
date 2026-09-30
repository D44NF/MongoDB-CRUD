import os

from dotenv import load_dotenv
from pymongo import AsyncMongoClient

load_dotenv()

client = AsyncMongoClient(os.getenv("MONGO_CONNECTION"))
database = client["arcade_launcher"]
collection = database["games"]

async def add_game(game: dict):
    result = await collection.insert_one(game)
    return str(result.inserted_id)


async def get_game(game_id: str):
    return await collection.find_one({"id": game_id})

async def get_all_games():
    return await collection.find().to_list()

async def get_games_by_category(category: str):
    return await collection.find({"category": category}).to_list()

async def change_stock(game_id: str, amount: int):
    result = await collection.update_one(
        {"id": game_id},
        {"$inc": {"stock": amount}},
    )
    return result.modified_count

async def delete_game(game_id: str):
    result = await collection.delete_one({"id": game_id})
    return result.deleted_count