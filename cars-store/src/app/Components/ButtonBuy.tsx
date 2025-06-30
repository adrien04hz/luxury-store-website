'use client';
import { motion } from "framer-motion";
import { useCart } from "../Context/cartContext";
import { useState } from "react";

interface ButtonBuyInterface {
    priceFinal: string;
}

export default function ButtonBuy( { priceFinal }: ButtonBuyInterface ) {

    const { setCount, setItems, items } = useCart();
    const [ bought, setBought ] = useState(false);

    const clearCart = async () => {
        const res = await fetch('http://127.0.0.1:8000/cart/clear', {
            method: 'DELETE',
        });

        if (res.ok) {
            setCount(0);  // Resetea el contador visual
            setItems([]);
            setBought(true);

            setTimeout(
                () => {
                    setBought(false);
                }, 5000
            );
            console.log('Carrito vaciado');
        } else {
            setBought(false);
            console.error('Error al vaciar el carrito');
        }
    };

    return (
        <div className="mt-20 flex justify-end items-center mb-70 py-10 mx-[-35] border-t border-gray-400">
            <div className={`bg-gray-900 text-white h-[180px] w-[450px] fixed left-15 bottom-0 rounded-t-[20px] flex flex-col items-center justify-center gap-5 z-20 transition-transform transform duration-500 ease-in-out ${ bought ? 'translate-y-[0px]': 'translate-y-[180px]'} px-7`}>
                            <div className="flex flex-col items-center justify-center">
                                <p className="font-bold">THANKS FOR TRUSTING US!</p>
                                <p>Your order has been placed successfully.</p>
                            </div>

            </div>
            <div className="flex flex-col gap-5 justify-center  items-end w-200">
                <p className="text-xl">Total: $ {`${items.length !== 0? priceFinal : 0}`}</p>
                <motion.button onClick={clearCart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-green-700 text-white rounded-md px-4 py-2 text-xl">Buy now!</motion.button>
            </div>
        </div>
    );
}
