import Image from "next/image";
import { Appbar } from "./components/Appbar";
import { useSession } from "next-auth/react";
import ShowData  from "./components/Showdata";

export default function Home() {
  return (
    <div>
        <Appbar />
        <ShowData />
        <div>
          hi
        </div>
    </div>
  );
}
