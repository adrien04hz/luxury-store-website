'use client';
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../Context/cartContext";



export default function DetailNav() {
    const { count } = useCart();
    const n = count;

    // para el banner
    // https://static-x.jamesedition.com/assets/category_banner/cars_desktop-af2ea25aa8e069da3d3411834fa7b06a679a566f81461a9baf7a6e2b40739024.jpg
    return (
        <header className="flex justify-between items-center px-10 top-0 w-full h-16 z-10 bg-white border-b border-gray-200 relative">

            {
                
                n !== 0 && (<div className="absolute bg-red-600 w-[20px] h-[20px] right-8 top-2 rounded-full text-white flex justify-center items-center">
                        <p className="font-bold text-sm">{n}</p>
                    </div>)
            }

            
            <div className="h-8 w-32 overflow-hidden flex flex-row items-center flex-grow basis-0">
                <Link href="/CarStore/Home">
                    <Image
                        id="logoNavBar"
                        className="object-cover scale-95"
                        src="/images/logo_black.png"
                        alt="Logo of car store"
                        width={128}
                        height={32}
                    />
                </Link>

                <div className="pl-3">
                    <p>Luxury Store</p>
                </div>
            </div>
            
            <nav className="">
                <ul className="flex text-sm [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2 [&>li>a]:hover:underline">
                    <li><Link href="/CarStore/Home">Home</Link></li>
                    <li><Link href="/CarStore/Cars">Cars</Link></li>
                    <li><Link href="/CarStore/Makes">Makes</Link></li>
                    <li><Link href="/CarStore/Gallery">Gallery</Link></li>
                </ul>
            </nav>

            <nav className="flex flex-grow justify-end basis-0">
                <ul className="flex text-sm [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2 [&>li>a]:hover:underline">
                    <li><Link href="/CarStore/Cart">Cart</Link></li>
                </ul>
            </nav>
            
        </header>
    );
}

