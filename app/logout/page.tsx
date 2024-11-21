'use client';

import {useEffect} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

function Logout() {
    const {status} = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === 'loading') {
            return;
        }
        signOut({
            redirect: false
        }).then(() => {
            router.replace('/login')
        });
    }, [status, router]);

    return null;
}

export default Logout;