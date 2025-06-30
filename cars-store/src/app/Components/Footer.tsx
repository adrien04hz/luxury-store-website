import Image from "next/image";
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="w-full bottom-0 h-[540px] bg-black text-white flex flex-col justify-between relative py-5 pt-10 px-20">
            <div className="flex gap-20">
                <div className="flex flex-col gap-5">
                    <p className="font-bold">Luxury Store</p>
                    <ul className="[&>li]:text-sm [&>li]:text-white flex flex-col gap-2">
                        <li>About</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>FAQ</li>
                        <li>Blog</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-5">
                    <p className="font-bold hover:underline"><Link href={'/CarStore/Makes'}>Makes</Link></p>
                    <div className="flex gap-10">
                        <ul className="[&>li]:text-sm [&>li]:text-white [&>li]:hover:underline flex flex-col gap-2">
                            <li><Link href={'/CarStore/MakeCars/8'}>Maserati</Link></li>
                            <li><Link href={'/CarStore/MakeCars/7'}>Mercedes-Benz</Link></li>
                            <li><Link href={'/CarStore/MakeCars/4'}>Ferrari</Link></li>
                            <li><Link href={'/CarStore/MakeCars/5'}>Porsche</Link></li>
                            <li><Link href={'/CarStore/MakeCars/14'}>McLaren</Link></li>
                            <li><Link href={'/CarStore/MakeCars/15'}>Pagani</Link></li>
                            <li><Link href={'/CarStore/MakeCars/9'}>Rolls-Royce</Link></li>
                            <li><Link href={'/CarStore/MakeCars/10'}>Ford</Link></li>
                        </ul>
                        <ul className="[&>li]:text-sm [&>li]:text-white [&>li]:hover:underline flex flex-col gap-2">
                            <li><Link href={'/CarStore/MakeCars/6'}>Tesla</Link></li>
                            <li><Link href={'/CarStore/MakeCars/1'}>Bugatti</Link></li>
                            <li><Link href={'/CarStore/MakeCars/11'}>Alfa Romeo</Link></li>
                            <li><Link href={'/CarStore/MakeCars/13'}>Koenigsegg</Link></li>
                            <li><Link href={'/CarStore/MakeCars/12'}>Aston Martin</Link></li>
                            <li><Link href={'/CarStore/MakeCars/2'}>Lamborghini</Link></li>
                            <li><Link href={'/CarStore/MakeCars/3'}>Bentley</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <p className="font-bold">For Business</p>
                    <ul className="[&>li]:text-sm [&>li]:text-white flex flex-col gap-2">
                        <li>Sell Your Car</li>
                        <li>Buy Cars</li>
                        <li>Car Valuation</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-5">
                    <p className="font-bold">Follow Us</p>
                    <ul className="[&>li]:text-sm [&>li]:text-white flex flex-col gap-2">
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>LinkedIn</li>
                        <li>YouTube</li>
                    </ul>
                </div>
            </div>

            <div className="flex  items-center gap-5 border-t border-gray-300 pt-4">
                <div>
                    <Link href="/CarStore/Home">
                        <Image
                            id="logoNavBar"
                            className="object-cover scale-95"
                            src="/images/logo_white.png"
                            alt="Logo of car store"
                            width={128}
                            height={32}
                        />
                    </Link>

                </div>
                <p className="text-sm text-white">	&copy; Luxury Store - All Rights Reserved</p>
            </div>
        </footer>
    );
}