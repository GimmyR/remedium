"use server";

import { Compound } from "@/interfaces/compound";
import { API_URL } from "@/lib/urls";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function fetchAllCompounds(): Promise<Compound[]> {
    const res = await fetch(`${API_URL}/api/compounds`);

    if(res.ok)
        return await res.json();

    else throw new Error(res.statusText);
}

export async function fetchUniqueCompound(id: number): Promise<Compound> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");
    const res = await fetch(`${API_URL}/api/compounds/${id}`, {
        headers: {
            "Authorization": `Bearer ${accessToken ? accessToken.value : ''}`
        }
    });

    if(res.ok)
        return await res.json();

    else throw new Error(res.statusText);
}

export async function createCompound(compound: Compound) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    const res = await fetch(`${API_URL}/api/compounds/`, {
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

export async function updateCompound(compound: Compound) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    const res = await fetch(`${API_URL}/api/compounds/`, {
        method: "PUT",
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

export async function patchActive(id: number, active: boolean) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    const res = await fetch(`${API_URL}/api/compounds/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken ? accessToken.value : ''}`
        },
        body: JSON.stringify({ id: id, active: active })
    });

    const data = await res.json();

    if(res.ok)
        revalidatePath("/");

    else throw new Error(data.message);
}

export async function removeCompound(id: number) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    const res = await fetch(`${API_URL}/api/compounds/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken ? accessToken.value : ''}`
        }
    });

    const data = await res.json();

    if(res.ok)
        revalidatePath("/");

    else throw new Error(data.message);
}