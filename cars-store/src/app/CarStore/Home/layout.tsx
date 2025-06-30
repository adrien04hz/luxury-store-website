import HomeNav from "@/app/Components/HomeNav";
import Footer from "@/app/Components/Footer";
import "@/app/globals.css";



export default function HomeLayout({ children }: { children: React.ReactNode; }) {
    return (

        <body className="flex flex-col min-h-screen">

            <HomeNav />
            <main className="flex-1">{ children }</main>
            <Footer />
        </body>

    );
}
