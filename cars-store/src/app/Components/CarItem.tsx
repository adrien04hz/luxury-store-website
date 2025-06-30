import Image from "next/image";
import Link from "next/link";

interface Car{
    id : number;
    title: string;
    price: string;
    year: string;
    images: string[];
}

export default function CarItem( { id, title, price, year, images }: Car ) {

    return (
        <Link href={`/CarStore/CarDetails/${id}`}>
            <div className="border border-gray-200 rounded-sm flex flex-col gap-2 box-border w-full h-full carItem">
                <div  className=" w-full aspect-[556/342] overflow-hidden">
                        <Image
                            src={images[0]}
                            alt={title}
                            width={556}
                            height={342}
                            className="object-cover w-full h-full transition-transform duration-300 ease-in-out imageCar"
                            loading="lazy"
                        />
                </div>

                <div className="flex flex-col gap-2 justify-center px-4 py-2">
                    <p className="font-bold text-base">{ title.startsWith(year) ? title : year.concat(` ${title}`) }</p>
                    <p className="text-sm mb-2">{ price }</p>
                </div>
            </div>
        </Link>
    );
}