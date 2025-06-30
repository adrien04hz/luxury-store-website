'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../Context/cartContext";

export default function NavBar() {
    const [ logoSrc, setLogoSrc ] = useState('/images/logo_black.png');
    const { count } = useCart();
    const n = count;

    useEffect( () => {
        const $header = document.getElementById("navbar");
        const onscroll = () => {
            if( window.scrollY > 250){
                $header?.classList.add('fondo');
                setLogoSrc('/images/logo_white.png');
            }else{
                $header?.classList.remove('fondo');
                setLogoSrc('/images/logo_black.png');
            }
        };

        window.addEventListener('scroll', onscroll);
        return () => {
            window.removeEventListener('scroll', onscroll);
        }
    }, []);

    // para el banner
    // https://static-x.jamesedition.com/assets/category_banner/cars_desktop-af2ea25aa8e069da3d3411834fa7b06a679a566f81461a9baf7a6e2b40739024.jpg
    return (
        <header id="navbar" className="flex justify-between items-center px-10 top-0 w-full h-16 fixed z-10 carsHeader">
            
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
                        src={logoSrc}
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

