import { Metadata } from "next";
import Image from "next/image";
import MakeCard from "@/app/Components/MakeCard";
import { MakeInterface } from "@/app/Interfaces/MakeInterface";
import CarItem from "@/app/Components/CarItem";
import Link from "next/link";
import { CarInterface } from "@/app/Interfaces/CarInterface";

export const metadata: Metadata = {
    title: "Home",
    description: "Home page of the Car Store",
    icons: '/images/car.ico'
};

const getMake = async () => {
    const response = await fetch('http://127.0.0.1:8000/makes/limit/16').then((res) => res.json());
    return response;
}

const getCars = async () => {
    const res = await fetch('http://127.0.0.1:8000/cars/limit/8').then((res) => res.json());
    return res;
}

export default async function HomePage() {
    const makes_list = await getMake();
    const cars_list = await getCars();

    const { makes } = makes_list;
    const { cars } = cars_list;

    return (

        <div>
            <div className="relative w-full">
                <Image
                    src={"https://static-x.jamesedition.com/assets/category_banner/cars_desktop-af2ea25aa8e069da3d3411834fa7b06a679a566f81461a9baf7a6e2b40739024.jpg"}
                    width={1920}
                    height={1080}
                    alt="Banner of the Car Store"
                    className="brightness-50 object-cover w-full"
                />

                <div className="absolute bottom-16 left-16 text-white flex flex-col gap-8">
                    <h1 className="text-7xl">Luxury Cars</h1>
                    <p className="text-lg">Experience the ultimate in luxury and performance with our selection of high-end cars.</p>
                </div>
            </div>

            {/* marcas */}
            <div className="flex flex-col mt-32">
                <div className="ml-20 flex justify-between items-center ">
                    <div>
                        <h1 className="text-4xl">Best Makes:</h1>
                    </div>
                    
                    <Link href="/CarStore/Makes">
                        <div>
                            <h1 className="mr-20 font-extrabold underline">View All</h1>
                        </div>
                    </Link>
                </div>

                <div className="my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-8 mx-20">
                    {
                        makes.map( ( { id, name, models, image} : MakeInterface) => (
                            <MakeCard key={id} id={id} name={name} image={image} />
                        ))
                    }
                </div>
            </div>

            <div className="flex flex-col mt-32">
                <div className="ml-20 flex justify-between items-center ">
                    <div>
                        <h1 className="text-4xl">Featured:</h1>
                    </div>
                    
                    <Link href="/CarStore/Cars">
                        <div>
                            <h1 className="mr-20 font-extrabold underline">View All</h1>
                        </div>
                    </Link>
                </div>

                <div className="my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mx-20">
                    {
                        cars.map( ( { id, title, price, year, images }: CarInterface ) => (
                            <CarItem key={id} id={id} title={title} price={price} year={year} images={images} />
                        ))
                    }
                </div>
            </div>


            <div className="mx-20 mt-32 mb-56 flex flex-col gap-8 border-t border-b py-50 border-gray-300">
                <div className="mb-10">
                    <p>
                        Prestige vehicles were and always will be one of the ultimate status symbols. They’ve also proved to be one of the safest investment portfolios which champions a clear advantage over stocks or cryptocurrency. Every exotic or supercar is a rolling work of art that can be enjoyed daily and provide its owner with the thrilling experience of driving a bespoke machine.
                        We offer a selection of world-class vehicles and top popular models if you are looking for a luxury car or supercar for sale.
                        From immensely capable Rolls Royce Cullinans, and sublimely fast Ferraris, to impressive Bugattis and Koenigseggs. At JamesEdition, we offer only the finest and most desirable vehicles, including a lineup of rare classic cars.
                    </p>
                </div>
                <div>
                    <p className="font-bold">
                        Rare, Exotic cars, and Supercars For Sale
                    </p>
                </div>

                <div>
                    <p>
                        The Car Store is the best place to find rare, exotic cars, and supercars for sale. We have a wide selection of high-end vehicles from top manufacturers, including Ferrari, Lamborghini, Bugatti, and more. Our team of experts is dedicated to helping you find the perfect car to fit your lifestyle and budget. Whether you're looking for a classic car or the latest model, we have something for everyone. Visit us today to see our full inventory and take a test drive.
                    </p>    
                </div>
            </div>
            
        </div>
    );
}