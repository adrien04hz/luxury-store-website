import { Metadata } from "next";
import { CarInterface } from "@/app/Interfaces/CarInterface";
import CarItem from "@/app/Components/CarItem";

export const metadata: Metadata = {
    title: "Cars",
    description: "General list of cars",
    icons: '/images/car.ico'
};


const getCars = async () => {
    const res = await fetch('http://127.0.0.1:8000/cars').then((res) => res.json());

    return res.cars;
}


export default async function Cars() {
    const cars = await getCars();

    return (
        <div className="my-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-20 mb-50">
            {
                cars.map( ( { id, title, price, year, images }: CarInterface) => (
                    
                    
                    <CarItem
                        key={ id }
                        id = { id }
                        title={ title }
                        price={ price }
                        year={ year }
                        images={ images }
                    />
                    
                ))
            }
        </div>
    );
}