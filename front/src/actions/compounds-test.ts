"use server";

import { API_URL } from "@/lib/urls";
import { cookies } from "next/headers";

export async function fetchAllCompoundsTests() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    if(!accessToken)
        throw new Error("Forbidden");

    const res = await fetch(`${API_URL}/api/compounds-tests`, {
        headers: {
            "Authorization": `Bearer ${accessToken.value}`
        }
    });

    const data = await res.json();
    
    if(res.ok)
        return data;

    else throw new Error(data.message);
}