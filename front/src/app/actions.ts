"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function saveAccessToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", token);
    redirect("/admin", RedirectType.push);
}