'use client';

import useSWR from "swr";
import galleryFetch from "@/app/API/GalleryAPI";
import { GalleryInterface} from "@/app/Interfaces/GalleryInterface";
import GalleryComponent from "@/app/Components/GalleryComponent";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const fetcher = async () => {
    const res : GalleryInterface = await galleryFetch();
    return res;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; // clonar para no mutar el original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // índice aleatorio entre 0 y i
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // intercambiar
  }
  return newArray;
}



export default function GalleryPage() {
    const containerRef = useRef<HTMLDivElement>(null);



    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -1694, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 1694, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    
    const { data, error, isLoading } = useSWR("gallery", fetcher);
    

    
    const galeria1 = data?.gallery ?? [];
    const galeria = shuffleArray(galeria1);



    if (isLoading) return <div className="w-full h-full flex justify-center items-center text-4xl"><h1>Loading...</h1></div>;
    if (error) return <div>Error loading gallery</div>;

    return (
        <div className="flex justify-center">

            <div className="fixed flex justify-between w-full top-[50%] px-5 z-10">
                <motion.button onClick={scrollLeft} whileHover={{ scale: 1.1 }} className="flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 h-10 w-10">{"<"}</motion.button>
                
                <motion.button whileHover={{ scale: 1.1 }} onClick={scrollRight} className="flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 h-10 w-10">{">"}</motion.button>
            </div>
            
            <div id="inicio" ref={containerRef} className="mx-20 my-10 flex overflow-x-auto w-[1694px] snap-x snap-mandatory scroll-smooth ">
                {
                    galeria.map((item, index) => (
                        <GalleryComponent key={index} gallery={item} />
                    ))
                }
            </div>
        </div>
    )
}








// console.log(JSON.stringify([...document.querySelectorAll('.je2-gallery-dialog__tabs__images img')].map( l => l.src),null,2))