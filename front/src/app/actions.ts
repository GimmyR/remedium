"use server";

import { API_URL } from "@/lib/urls";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function saveAccessToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", token);
    redirect("/admin", RedirectType.push);
}

export async function verifyAdminAuth() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    if(!accessToken)
        redirect("/", RedirectType.replace);

    const res = await fetch(`${API_URL}/api/auth/is-admin`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken.value}`
        }
    });

    if(!res.ok) {
        cookieStore.delete("access_token");
        redirect("/", RedirectType.replace);
    }
}

export async function signedInAsAdmin() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");

    if(!accessToken)
        return false;

    const res = await fetch(`${API_URL}/api/auth/is-admin`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken.value}`
        }
    });

    return res.ok;
}