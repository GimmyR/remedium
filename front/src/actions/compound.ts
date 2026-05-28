"use server";

import { Compound } from "@/interfaces/compound";
import { API_URL } from "@/lib/urls";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function fetchAllCompounds(): Promise<Compound[]> {
    const res = await fetch(`${API_URL}/api/compound/all`);

    if(res.ok)
        return await res.json();

    else throw new Error(res.statusText);
}

export async function createCompound(compound: Compound) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    const res = await fetch(`${API_URL}/api/compound/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken ? accessToken.value : ''}`
        },
        body: JSON.stringify(compound)
    });

    const data = await res.json();

    if(res.ok)
        redirect("/admin", RedirectType.push);

    else throw new Error(data.message);
}