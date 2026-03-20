// "use client";

// import { useSession } from "next-auth/react";

// export const ShowData = () => {
//     const { data: session, status } = useSession();

//     return (
//         <div>
//             <p>Status: {status}</p>
//             <pre>{JSON.stringify(session, null, 2)}</pre>
//         </div>
//     );
// };

import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

const ShowData = async ()=>{
    const session = await getServerSession(NEXT_AUTH);
    return(
        <div>
            {JSON.stringify(session)}
        </div>
    )
}

export default ShowData;