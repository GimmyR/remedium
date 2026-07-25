"use server";

import { Compound } from "@/interfaces/compound";
import { CompoundTest, CreateTest } from "@/interfaces/compound-test";
import { getRandomFloat, getRandomInt } from "@/lib/helpers";
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

export async function createTest(test: CreateTest) {
    const url = `${PRIVATE_URL ? PRIVATE_URL : PUBLIC_URL}/api/compounds-tests`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(test)
    });

    const data = await res.json();

    if(res.ok)
        return data;

    else throw new Error(data.message[0]);
}

export async function generateCompounds(compounds: Compound[]) {
    const compoundsNumber = getRandomInt(1, 5);
    const compoundsIndex: number[] = [];
    const compoundTests: CompoundTest[] = [];

    for(let i = 0; i < compoundsNumber; i++) {
        while(true) {
            const index = getRandomInt(0, compounds.length - 1);

            if(!compoundsIndex.includes(index)) {
                compoundsIndex.push(index);
                compoundTests.push({ 
                    compoundId: compounds[index].id ?? 0, 
                    amount: getRandomFloat(1, 1500)
                });
                break;
            }
        }
    }

    return compoundTests;
}