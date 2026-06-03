"use server";

import { CompoundTest } from "@/interfaces/compound-test";
import { PUBLIC_URL, PRIVATE_URL } from "@/lib/urls";
import { cookies } from "next/headers";

export async function fetchAllCompoundsTests() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    if(!accessToken)
        throw new Error("Forbidden");

    const res = await fetch(`${PRIVATE_URL ? PRIVATE_URL : PUBLIC_URL}/api/compounds-tests`, {
        headers: {
            "Authorization": `Bearer ${accessToken.value}`
        }
    });

    const data = await res.json();
    
    if(res.ok)
        return data;

    else throw new Error(data.message);
}

export async function makeTests(test: CompoundTest[]) {
    const res = await fetch(`${PRIVATE_URL ? PRIVATE_URL : PUBLIC_URL}/api/compounds-tests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(test)
    });

    const data = await res.json();

    if(res.ok)
        return data;

    else throw new Error(data.message);
}