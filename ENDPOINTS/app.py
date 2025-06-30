from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List
from fastapi.responses import JSONResponse
from random import randint
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://localhost:27017")
db = client['autosTienda']

# collection de carrito
cart = db['cart']

# modelo de validacion para el carrito
class Car(BaseModel):
    title: str
    make_id: int
    model: str
    year: str
    price: str
    description: str
    images: List[str]
    id: int


# funcion para obtener los fabricantes de autos
@app.get("/makes")
def get_makes():
    resultado = list(db.makes.find({}, { "_id": 0 }))

    return {
        "success": True,
        "count": len(resultado),
        "makes": resultado
    }


# funcion para obtener todos los autos
@app.get("/cars")
def get_cars():
    resultado = list(db.cars.find({}, { "_id": 0 }))

    return {
        "success": True,
        "count": len(resultado),
        "cars": resultado
    }


# funcion para obtener la galeria
@app.get("/gallery")
def get_gallery():
    resultado = list(db.gallery.find({}, { "_id": 0 }))

    return {
        "success": True,
        "count": len(resultado),
        "gallery": resultado
    }


# que aleatoriamente te regrese n autos pero no el inicio ni del final, aleatorio
# funcion para obtener ultimos n autos
@app.get("/cars/limit/{n}")
def get_Ncars(n: int):
    total_cars = db.cars.count_documents({})  # Contar el total de autos en la colección

    if total_cars <= n + 2:  # Verificar si hay suficientes autos para excluir inicio y final
        return {
            "success": False,
            "message": "No hay suficientes autos para realizar la operación"
        }

    # Generar un índice aleatorio excluyendo el inicio y el final
    start_index = randint(0, total_cars - n)

    # Obtener los autos desde el índice aleatorio
    resultado = list(db.cars.find({}, {"_id": 0}).skip(start_index).limit(n))

    return {
        "success": True,
        "count": len(resultado),
        "cars": resultado
    }



# que aleatoriamente te regrese n autos pero no el inicio ni del final, aleatorio
# funcion para obtener ultimos n autos
@app.get("/makes/limit/{n}")
def get_Nmakes(n: int):
    total_makes = db.makes.count_documents({})  # Contar el total de fabricantes en la colección

    if total_makes <= n + 2:  # Verificar si hay suficientes fabricantes para excluir inicio y final
        return {
            "success": False,
            "message": "No hay suficientes fabricantes para realizar la operación"
        }

    # Generar un índice aleatorio excluyendo el inicio y el final
    start_index = randint(0, total_makes - n)

    # Obtener los fabricantes desde el índice aleatorio
    resultado = list(db.makes.find({}, {"_id": 0}).skip(start_index).limit(n))

    return {
        "success": True,
        "count": len(resultado),
        "makes": resultado
    }


# funcion para obtener fabricante de un auto especifico
@app.get("/makes/{make_id}")
def get_make(make_id : int):
    resultado = db.makes.find_one({ "id": make_id }, { "_id": 0 })

    return {
        "success": True,
        "count": 1 if resultado else 0,
        "car_make": resultado
    }


# funcion para obtener autos de una marca especifica
@app.get("/make/{car_id}/cars")
def get_make_cars(car_id : int):
    resultado = list(db.cars.find({ "make_id": car_id }, { "_id": 0 }))
    resultado1 = db.makes.find_one({ "id": car_id }, { "_id": 0 })

    return {
        "success": True,
        "count": len(resultado),
        "make": resultado1['name'] if resultado1 else None,
        "cars_make": resultado
    }


# funcion para obtener auto especifico
@app.get("/cars/{car_id}")
def get_car(car_id : int):
    return  list(db.cars.find({ "id": car_id }, { "_id": 0 }))



# funcion para agregar un auto al carrito
@app.post("/cart/add")
def add_car(car : Car):
    existing_car = cart.find_one({"id": car.id})
    if existing_car:
        cart.update_one({"id": car.id}, {"$inc": {"quantity": 1}})
        return JSONResponse(status_code=200, content={"message": "Cantidad aumentada en el carrito"})
    else:
        data = car.model_dump()  # Usa model_dump() en lugar de dict()
        data["quantity"] = 1
        cart.insert_one(data)
        return JSONResponse(status_code=201, content={"message": "Auto añadido al carrito"})


# funcion para obtener autos del carrito
@app.get("/cart")
def get_cart():
    resultado = list(cart.find({}, { "_id": 0 }))
    return {
        "success": True,
        "count": len(resultado),
        "cart": resultado
    }


# funcion para eliminar todos los autos del carrito
@app.delete("/cart/clear")
def clear_cart():
    cart.delete_many({})
    return JSONResponse(status_code=200, content={"message": "Carrito vaciado"})




# funcion para eliminar un auto del carrito
@app.delete("/cart/{car_id}")
def delete_car(car_id : int):
    existing_car = cart.find_one({"id": car_id})
    if existing_car:
        if existing_car["quantity"] > 1:
            cart.update_one({"id": car_id}, {"$inc": {"quantity": -1}})
            return JSONResponse(status_code=200, content={"message": "Cantidad disminuida en el carrito"})
        else:
            cart.delete_one({"id": car_id})
            return JSONResponse(status_code=200, content={"message": "Auto eliminado del carrito"})
    else:
        return JSONResponse(status_code=404, content={"message": "Auto no encontrado en el carrito"})
    

@app.delete("/cart/remove/{car_id}")
def remove_car_completely(car_id: int):
    result = cart.delete_one({"id": car_id})
    if result.deleted_count > 0:
        return JSONResponse(status_code=200, content={"message": "Auto eliminado completamente del carrito"})
    else:
        return JSONResponse(status_code=404, content={"message": "Auto no encontrado en el carrito"})
