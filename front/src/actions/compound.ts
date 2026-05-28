import { Compound } from "@/interfaces/compound";
import { API_URL } from "@/lib/urls";

export async function fetchAllCompounds(): Promise<Compound[]> {
    const res = await fetch(`${API_URL}/api/compound/all`);

    if(res.ok)
        return await res.json();

    else throw new Error(res.statusText);
}