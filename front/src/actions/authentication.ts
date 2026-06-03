"use server";

import { Account } from "@/interfaces/account";
import { PUBLIC_URL, PRIVATE_URL } from "@/lib/urls";
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

    const res = await fetch(`${PRIVATE_URL ? PRIVATE_URL : PUBLIC_URL}/api/auth/is-admin`, {
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

    const res = await fetch(`${PRIVATE_URL ? PRIVATE_URL : PUBLIC_URL}/api/auth/is-admin`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken.value}`
        }
    });

    return res.ok;
}

export async function signIn(credentials: Account) {
    const res = await fetch(`${PRIVATE_URL ? PRIVATE_URL : PUBLIC_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const data = await res.json();

    if(res.status == 201)
        await saveAccessToken(data.access_token);

    else throw new Error(data.message);
}

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    redirect("/", RedirectType.push);
}