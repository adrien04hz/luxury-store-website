'use client';

import OtherCars from "./OtherCars";
import Image from "next/image";
import Link from "next/link";
import { CarInterface } from "../Interfaces/CarInterface";
import { MakeInterface } from "../Interfaces/MakeInterface";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/app/Context/cartContext";




interface Props{
    auto: CarInterface;
    marca: MakeInterface;
    cars: CarInterface[];
}

export default function Details( { auto, marca, cars }: Props ) {
    const { setCount, setItems} = useCart();
    const [added, setAdded] = useState(false);  
    const { title, model, year, price, description, images, id, make_id} = auto;
    const { name } = marca;

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

            setTimeout(
                () => {
                    setAdded(false);
                }, 5000
            );

        } else {
            setAdded(false);
        }
    }
    //-----


    return (
        <div>
            <div className={`bg-gray-900 text-white h-[180px] w-[450px] fixed left-15 bottom-0 rounded-t-[20px] flex flex-col items-center justify-center gap-5 z-20 transition-transform transform duration-500 ease-in-out ${ added ? 'translate-y-[0px]': 'translate-y-[180px]'} px-7`}>
                <div>
                    <p className="font-bold">Successfully added!</p>
                </div>
                <div className="flex gap-4 items-center justify-center ">
                    <div className="rounded-[12px] overflow-hidden w-[40%]">
                        <Image
                            src={images[0]}
                            alt={title}
                            width={400}
                            height={180}
                            className="object-cover w-full h-full"
                            loading="lazy"
                        />
                    </div>
                    <div className="w-[60%]">
                        <p>{title}</p>
                        <p>{year}</p>
                    </div>
                </div>
            </div>
            {/* div de la rutita */}
            <div className="my-5 ml-20">
                <ul className="flex gap-2 [&>li]:text-gray-700 [&>li]:text-sm">
                    <li className="hover:underline"><Link href={"/CarStore/Cars"}>Cars</Link></li>
                    <li>{">"}</li>
                    <li className="hover:underline"><Link href={'#'}>{ name }</Link></li>
                    <li>{">"}</li>
                    <li>{ model }</li>
                </ul>
            </div>

            {/*  div de las imagenes*/}
            <div className="mx-20 flex justify-center h-[550px] overflow-hidden gap-1 items-center rounded-[12px]">
                
                <div className="h-full w-[50%] overflow-hidden rounded-l-[12px]">
                    <Image
                        src={images[0]}
                        alt={title}
                        width={845}
                        height={500}
                        quality={100}
                        className="object-cover w-full h-full hover:scale-102 transition-transform duration-1200 ease-in-out rounded-l-[12px]"
                        loading="lazy"
                    />
                </div>

                <div className="h-full w-[50%] flex flex-col gap-1  rounded-r-[12px]">
                    <div className="h-[50%] flex gap-1">
                        <div className="h-full w-[50%] overflow-hidden">
                            <Image
                                src={images[1]}
                                alt={title}
                                width={420}
                                height={250}
                                className="object-cover w-full h-full hover:scale-102 transition-transform duration-1200 ease-in-out"
                                loading="lazy"
                            />
                        </div>

                        <div className="h-full w-[50%] overflow-hidden">
                            <Image
                                src={images[2]}
                                alt={title}
                                width={420}
                                height={250}
                                className="object-cover w-full h-full hover:scale-102 transition-transform duration-1200 ease-in-out"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="h-[50%] flex gap-1">
                        <div className="h-full w-[50%] overflow-hidden">
                            <Image
                                src={images[3]}
                                alt={title}
                                width={420}
                                height={250}
                                className="object-cover w-full h-full hover:scale-102 transition-transform duration-1200 ease-in-out"
                                loading="lazy"
                            />
                        </div>
                        <div className="h-full w-[50%] overflow-hidden">
                            <Image
                                src={images[4]}
                                alt={title}
                                width={420}
                                height={250}
                                className="object-cover w-full h-full hover:scale-102 transition-transform duration-1200 ease-in-out"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* div para detalles */}

            <div className="my-10 ml-20 flex flex-col w-[90%]">
                {/* nombre y precio */}
                <div className="flex gap-2 justify-between items-center pb-7 border-b border-gray-300">
                    <div className="font-bold text-3xl w-[60%]">
                        <p>{ title }</p>
                    </div>
                    <div className="text-3xl">
                        <p>{ price }</p>
                    </div>
                </div>
                {/* modelo y anio */}
                <div className="flex gap-10 justify-start items-center py-7 border-b border-gray-300">
                    <div className="flex flex-col items-center">
                        <div className="font-bold">
                            <p>{ year }</p>
                        </div>
                        <div>
                            <p>Year</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-bold">
                            <p>{ model }</p>
                        </div>
                        <div>
                            <p>Model</p>
                        </div>
                    </div>
                </div>
                {/* description */}
                <div className="flex flex-col gap-4 py-7 border-b border-gray-300">
                    <div className="font-bold text-2xl">
                        <h1>Description</h1>
                    </div>
                    <div>
                        <p>{ description }</p>
                    </div>
                </div>

                <div className="flex justify-end pt-7 pb-36">
                    <motion.button whileTap={{ scale: 0.90 }} whileHover={{ scale: 1.05 }} onClick={addCart} className="border py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300 ease-in-out">
                        Add to Cart
                    </motion.button>
                </div>
            </div>


            {/* div de otros autos */}
            <OtherCars carsArray={cars} />

        </div>
    );
}