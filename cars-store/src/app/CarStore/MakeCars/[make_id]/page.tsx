import CarItem from "@/app/Components/CarItem";
import { CarInterface } from "@/app/Interfaces/CarInterface";
import Image from "next/image";
import Link from "next/link";
import MakeCardMakes from "@/app/Components/MakeCardMakes";



export async function generateMetadata({ params }: { params: { make_id: string } }) {
    const { make_id }  = await params;
    const res = await fetch(`http://127.0.0.1:8000/makes/${make_id}`).then(res => res.json());
    const { car_make } = res;
    const { name } = car_make;
    const { image } = car_make;

    if (!name) {
        return {
            title: 'Make not found | Car Store',
            description: 'No make details found'
        };
    }

    return {
        title: `${name}`,
        description: `Details about the ${name} make including price, images and more.`,
        icons: `${image}`
    };
}

const getMakeCar = async ( make_id : string) => {
   const res = await fetch(`http://127.0.0.1:8000/make/${make_id}/cars`).then(res => res.json());
    return res;
}

export default async function MakeCars( { params } : { params: { make_id : string } } ){
    const { make_id } = await params;
    const cars = await getMakeCar(make_id);

    const res = await fetch(`http://127.0.0.1:8000/makes/${make_id}`).then(res => res.json());
    const { car_make } = res;
    const { image } = car_make;

    const { cars_make } = cars;
    const { make } = cars;

    return (
        <div className="flex flex-col gap-10 mx-20 mt-10 mb-60">

            <div className="">
                <ul className="flex gap-2 [&>li]:text-gray-700 [&>li]:text-sm">
                    <li className="hover:underline"><Link href={"/CarStore/Cars"}>Cars</Link></li>
                    <li>{">"}</li>
                    <li className="hover:underline"><Link href={`/CarStore/MakeCars/${make_id}`}>{ make }</Link></li>
                </ul>
            </div>

            <div className="flex justify-start items-center gap-5">

                <div className="overflow-hidden border-gray-300 w-[150px]">
                    <MakeCardMakes id={parseInt(make_id)} name={make} image={image}/>
                </div>

                <p className="text-4xl">{make}</p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {
                    cars_make.map( ( { id, title, make_id, model, year, price, description, images } : CarInterface) => (
                        <CarItem key={id} id={id} title={title}  year={year} price={price}  images={images} />
                    ))
                }
            </div>
        </div>
    );
}