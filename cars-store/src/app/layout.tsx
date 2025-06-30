
import "@/app/globals.css";
import { Metadata } from "next";
import { CartProvider } from "@/app/Context/cartContext";

export const metadata : Metadata = {
  icons: {
    icon: 'data:,'
  }
}

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="bg-gray-50">
            <head>
                <link rel="icon" href="data:," />
            </head>

            <CartProvider>
              { children }
            </CartProvider>
        </html>
    );
}
