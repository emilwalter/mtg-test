import "@/app/ui/global.css";
import Link from "next/link";
import BackButton from "./ui/back-button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row gap-5 max-w-7xl mx-auto p-4">
          <div>
            <BackButton />
          </div>
          <Link className="font-bold underline" href={"/sets"}>
            All sets
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
