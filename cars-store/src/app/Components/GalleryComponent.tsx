'use client';

import Image from "next/image";
import { Gallery } from "../Interfaces/GalleryInterface";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
interface Props {
    gallery: Gallery;
}

export default function GalleryComponent( { gallery } : Props ) {
    const primer = gallery;
    const { name } = primer;
    const { images } = primer;

    const [widths, setWidths] = useState<number[]>([]);
    const [realWidths, setRealWidths] = useState<number[]>([]); 
    const divRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Solo se ejecuta en el cliente
        const randomWidths = images.map(() => Math.floor(Math.random() * 250) + 400);
        setWidths(randomWidths);
    }, [images]);

    useEffect(() => {
        if (widths.length === images.length) {
            // Recupera el ancho real mostrado de cada div
            const measured = divRefs.current.map(ref => ref?.getBoundingClientRect().width ?? 0);
            setRealWidths(measured);
            console.log(measured);
        }
    }, [widths, images.length]);

    // Mientras no se generan los anchos, no renderizar nada
    if (widths.length !== images.length) return null;


    return (
        <div className="flex flex-col">

            {/* titulo y botones */}
            <div className="flex justify-between h-[100px] items-center w-full">

                <h1 className="text-4xl">{ name }</h1>
            </div>

            {/* galeria del coche */}
            <div className="flex flex-wrap gap-2 w-[1694px]">
            
                {images.map((src, i) => {
            
                    return (
                        <div key={i} ref={el => {divRefs.current[i] = el}} style={{ width: widths[i], height: "380px" }} className={`flex items-center justify-center overflow-hidden snap-start ${ realWidths[i] === 1694 ? 'hidden' : 'flex-grow'}`}>
                            <Image
                                src={src}
                                alt={`Imagen ${i}`}
                                width={widths[i]}
                                height={380}
                                className="object-cover object-center w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}