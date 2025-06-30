import Footer from "@/app/Components/Footer";
import "@/app/globals.css";
import NavBar from "@/app/Components/NavBar";



export default function CarLayout({ children }: { children: React.ReactNode; }) {
    return (
        <body className="flex flex-col min-h-screen">

            <NavBar />
            <main className="flex-1">{ children }</main>
            <Footer />
        </body>
    );
}
