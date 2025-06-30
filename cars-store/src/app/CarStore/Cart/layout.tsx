import Footer from "@/app/Components/Footer";
import "@/app/globals.css";
import DetailNav from "@/app/Components/DetailNav";



export default function CartLayout({ children }: { children: React.ReactNode; }) {
    return (
        <body className="flex flex-col min-h-screen">

            <DetailNav />
            <main className="flex-1">{ children }</main>
            <Footer />
        </body>
    );
}
