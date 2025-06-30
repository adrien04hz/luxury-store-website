import Image from "next/image";



interface CarMake {
    id: number;
    name: string;
    image: string;
}


export default function MakeCardMakes(  {id, name, image } : CarMake ) {
    
    let esOrg = false;


    if([8, 6, 11, 21, 20, 18, 19, 22].includes(id)){
        esOrg = true;
    }

    // `hover:border-gray-700  w-full aspect-[292/220] overflow-hidden transition-border duration-500 ease-in-out ${ esOrg ? 'relative border-gray-200 border-3 flex items-center bg-white ' : 'border-2 border-gray-200' }`

    // `object-cover w-full ${ esOrg && id !== 8 ? 'scale-50 absolute' : ''} ${ esOrg && id === 8 ? 'scale-85 absolute' : '' }`
    return (
        <div className={` w-full aspect-[292/220]  flex items-center justify-center bg-white`}>
                <div className="h-11/12 w-11/12 overflow-hidden flex items-center justify-center">
                    <Image
                        src={image}
                        alt={name}
                        width={292}
                        height={220}
                        className={`object-cover w-full ${ esOrg && id !== 8 ? 'scale-55' : `${ esOrg && id === 8 ? 'scale-95' : 'scale-110' }` } `}
                        loading="lazy"
                    />
                </div>
        </div>    
    );
}