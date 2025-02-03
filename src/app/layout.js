import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/authProvider";

import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/themeProvider";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en suppressHydrationWarning">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
        <AuthProvider>
          {children}
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
