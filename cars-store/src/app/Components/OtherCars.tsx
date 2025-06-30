'use client';
import CarItem from "@/app/Components/CarItem";
import { CarInterface } from "@/app/Interfaces/CarInterface";
import { useRef } from "react";


export default function OtherCars( { carsArray } : { carsArray : CarInterface[] } ) {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };


    return (
            <div className="flex flex-col gap-10 mx-20 pt-20 mb-56">
                <div className="flex justify-between items-center text-2xl">
                    <p>You Might Also Like</p>

                    <div className="flex gap-10">
                        <button className="w-[30px] h-[30px] flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-100" onClick={scrollLeft}>{ "<" }</button>
                        <button className="w-[30px] h-[30px] flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-100" onClick={scrollRight}>{ ">" }</button>
                    </div>
                </div>
                <div ref={containerRef} className="w-full flex flex-row gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth">
                        {
                            carsArray.map( ( { title, make_id, model, year, price, description, images, id }: CarInterface ) => (
                                <div key={id} className="snap-start flex-shrink-0 w-1/3 h-auto">
                                    <CarItem
                                        key={ id }
                                        id = { id }
                                        title={ title }
                                        price={ price }
                                        year={ year }
                                        images={ images }
                                    />
                                </div>
                        
                            ) )
                        }
                </div>

            </div>
    );
}