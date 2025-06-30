import { Metadata } from "next";
import ItemCart from "@/app/Components/ItemCart";
import { CarInterface } from "@/app/Interfaces/CarInterface";
import ButtonBuy from "@/app/Components/ButtonBuy";

interface CartInterface {
    title: string;
    model: string;
    make_id: string;
    year: number;
    price: string;
    images: string[];
    id: string;
    description: string;
    quantity: number;
}

const Items = async () => {
    const res = await fetch('http://127.0.0.1:8000/cart').then((res) => res.json());
    return res;
}

export const metadata: Metadata = {
    title: "Cart",
    description: "Details of the cart",
    icons: '/images/car.ico'
};

export default async function Cart(){
    const prices : number[] = [];
    let priceFinal : number = 0;

    const item = await Items();

    const { cart } = item;

    cart.forEach((item : CartInterface) => {
        prices.push(parseInt(item.price.split(" ")[1].split(",").join("")) * item.quantity);
    });

    prices.forEach((price : number) => {
        priceFinal += price;
    });

    return (
        <div className="mx-50 mt-20 flex flex-col">
            <div>
                <p className="text-4xl mb-4">Luxury Cart</p>
            </div>
            <div className="h-[700px] overflow-y-scroll scrollbar-hide">
                {
                    cart.map( ({ title, model, make_id, year, price, images, id, description, quantity } : CartInterface) => (
                        prices.push(parseInt(price.split(" ")[1].split(",").join(""))*quantity),
                        <ItemCart key={id} title={title} model={model} make_id={make_id} year={year} price={price} images={images} id={id} description={description} quantity={quantity} />
                    ) )
                }
            </div>

            <ButtonBuy priceFinal={priceFinal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />

        </div>
    );
}