import { Metadata } from "next";
import MakeCard from "@/app/Components/MakeCard";
import { MakeInterface } from "@/app/Interfaces/MakeInterface";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Makes",
    description: "List of car makes",
    icons: '/images/car.ico'
};

const getMake = async () => {
    const response = await fetch('http://127.0.0.1:8000/makes').then((res) => res.json());
    return response;
}


export default async function Makes(){
    const makes_list = await getMake();
    const { makes } = makes_list;
    return (
        <div className="mx-20 mt-30 mb-60 flex flex-col gap-5">
            <p className="text-4xl mb-10">Featured Makes</p>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

                {
                    makes.map( ( { id, name, models, image} : MakeInterface) => (
                        <MakeCard key={id} id={id} name={name} image={image} />
                    ))
                }

            </div>
        </div>
    );
}