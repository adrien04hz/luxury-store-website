import Details from "@/app/Components/Details";
import { CarInterface } from "@/app/Interfaces/CarInterface";
import { MakeInterface } from "@/app/Interfaces/MakeInterface";


// funcion para obtener los datos del auto
const getCarDetails = async ( car_id : string) => {
    const res = await fetch(`http://127.0.0.1:8000/cars/${car_id}`).then(res => res.json());
    return res;
};

// funcion para obtener otros 6 autos random
const getRandomCars = async () => {
    const res = await fetch(`http://127.0.0.1:8000/cars/limit/6`).then(res => res.json());
    return res;
}


export async function generateMetadata({ params }: { params: { car_id: string } }) {
    const { car_id } = await params;
    const res = await fetch(`http://127.0.0.1:8000/cars/${car_id}`).then(res => res.json());
    const car = res[0];
    
    if (!car) {
        return {
            title: 'Car not found | Car Store',
            description: 'No car details found',
        };
    }
    const marca = await fetch(`http://127.0.0.1:8000/makes/${car.make_id}`).then(res1 => res1.json());
    const { car_make } = marca;
    const { image } = car_make;


    return {
        title: `${ car.title.startsWith(car.year) ? car.title : car.year.concat(` ${car.title}`) }`,
        description: `Details about the ${car.year} ${car.title} including price, images and more.`,
        icons: `${image}`
    };
}

export default async function CarDetails( { params } : { params: { car_id : string } } ) {

    const { car_id } = await params;
    const car = await getCarDetails(car_id);

    // obtener los datos del auto
    const { title, make_id, model, year, price, description, images } = car[0];
    const carCero : CarInterface = car[0];

    //obtener la marca del auto
    const make = await fetch(`http://127.0.0.1:8000/makes/${make_id}`).then(res => res.json());

    const { car_make } : { car_make: MakeInterface } = make;
    const { name } = car_make;

    const otherCars  = await getRandomCars();
    const { cars } : { cars: CarInterface[] }  = otherCars;


    return (
        <Details auto={carCero} marca={car_make} cars={cars} />
    );
}