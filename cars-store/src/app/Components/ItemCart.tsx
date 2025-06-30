'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CarInterface } from "../Interfaces/CarInterface";
import { useCart } from "../Context/cartContext";
import { useState } from "react";

interface CartInterface {
    title: string;
    model: string;
    make_id: string;
    year: number;
    price: string;
    images: string[];
    id: string;
    description: string;
    quantity: number;
}

export default function ItemCart( { title, model, year, make_id, description, price, images, id, quantity }: CartInterface) {
    const { items } = useCart();
    const precio = price.split(" ")[1].split(",").join("");
    console.log(precio);
    const sub = parseInt(precio) * quantity;

    
    
    const { setCount, setItems} = useCart();
    const [added, setAdded] = useState(true);  
    const [ cantidad, setCantidad] = useState(quantity); // Estado para la cantidad
    const [ pfinal, setpFinal ] = useState(sub); // Estado para el precio

    const precioFinal = pfinal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const priceFinal = `$ ${precioFinal}`;

    //------
    const addCart = async () => {
        const res = await fetch('http://127.0.0.1:8000/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                make_id: make_id,
                model: model,
                year: year,
                price: price,
                description: description,
                images: images,
                id: id,
            })
        });

        if (res.ok) {
            const resCart = await fetch('http://127.0.0.1:8000/cart').then(res => res.json());
            const { count } = resCart;
            const { cart } = resCart;
            setItems(cart); // Actualiza el estado de los items en el contexto
            setCount(count); // Actualiza visualmente el contador
            setAdded(true);
            setCantidad(cantidad + 1); // Aumenta la cantidad
            setpFinal(pfinal + parseInt(precio)); // Aumenta el precio final

        } else {
            setAdded(false);
        }
    }

    const removeOne = async () => {
        if (cantidad > 1) {
                const res = await fetch(`http://127.0.0.1:8000/cart/${id}`, {
                    method: 'DELETE',
            });

            if (res.ok) {
                const resCart = await fetch('http://127.0.0.1:8000/cart').then(res => res.json());
                const { count } = resCart;
                const { cart } = resCart;

                setItems(cart);
                setCount(count);
                setCantidad(cantidad - 1);
                setpFinal(pfinal - parseInt(precio));
            } else {
                console.error('Error al quitar 1 unidad');
            }

        } else if (cantidad === 1) {
            // Si es la última unidad, eliminamos el item completamente
            const res = await fetch(`http://127.0.0.1:8000/cart/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                const resCart = await fetch('http://127.0.0.1:8000/cart').then(res => res.json());
                const { count } = resCart;
                const { cart } = resCart;

                setItems(cart);
                setCount(count);
                setCantidad(0);
                setpFinal(0);
                setAdded(false); // Oculta visualmente el item
            } else {
                console.error('Error al eliminar última unidad');
            }
        }
    };

    const removeItem = async () => {
        const res = await fetch(`http://127.0.0.1:8000/cart/remove/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            const resCart = await fetch('http://127.0.0.1:8000/cart').then(res => res.json());
            const { count } = resCart;
            const { cart } = resCart;

            setItems(cart);   // Actualiza la lista
            setCount(count);  // Actualiza la burbuja
            setCantidad(0);   // Localmente cantidad 0
            setpFinal(0);     // Subtotal 0
            setAdded(false);  // Oculta visualmente
        } else {
            console.error('Error al eliminar el item');
        }
    };


    return (
        <>
            {
                items.length !== 0 && (added && (<div className="flex justify-between items-center py-10">
                    <div className="flex gap-7 justify-center items-center">
                        <Link href={`/CarStore/CarDetails/${id}`}>
                            <div className="w-[300px] rounded-[12px] overflow-hidden">
                                <Image
                                    className="object-cover h-full w-full hover:scale-105 transition-transform duration-500 ease-in-out"
                                    loading="lazy"
                                    src={images[0]}
                                    alt="Car image"
                                    width={556}
                                    height={342}
                                />
                            </div>
                        </Link>

                        <div className="flex flex-col justify-evenly ">
                            <p className="text-3xl font-bold mb-1">{title}</p>
                            <p className="text-xl mb-5">{year} {model}</p>
                            <p className="mb-10 text-xl">{price}</p>
                            <p className="text-lg">Subtotal: {priceFinal}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10 justify-center items-center text-xl">
                        <div>
                            <motion.button onClick={removeItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-red-800 text-white rounded-md px-4 py-2">Remove</motion.button>
                        </div>
                        <div className="flex gap-7 justify-center items-center">
                            <motion.button onClick={addCart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gray-200 text-black rounded-full px-4 py-2 hover:bg-gray-300">+</motion.button>
                            <p>{cantidad}</p>
                            <motion.button onClick={removeOne} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gray-200 text-black rounded-full px-4 py-2 hover:bg-gray-300">-</motion.button>
                        </div>

                    </div>
                </div>))
            }
        </>
    );
}