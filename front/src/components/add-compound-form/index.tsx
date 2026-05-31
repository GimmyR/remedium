"use client";

import { Compound } from "@/interfaces/compound";
import { FormEvent, useState } from "react";
import AddCompoundInput from "./add-compound-input";
import { createCompound, updateCompound } from "@/actions/compound";
import Toast from "../toast";
import { useRouter } from "next/navigation";

type Props = {
    compound?: Compound
};

export default function AddCompoundForm({ compound } : Props) {
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const min = form.get("min") as string;
        const max = form.get("max") as string;

        const comp = { 
            id: compound ? compound.id : undefined, 
            title: form.get("title") as string, 
            unit: form.get("unit") as string, 
            min: min && min.trim() != "" ? parseFloat(min) : undefined,
            max: max && max.trim() != "" ? parseFloat(max) : undefined,
            active: compound ? compound.active : true
        };

        await saveCompound(comp);
    };

    const saveCompound = async (compound: Compound) => {
        try {
            
            if(!compound.id)
                await createCompound(compound);
            else await updateCompound(compound);

        } catch(error: any) {

            setError(error.message);
            const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
            const toast = new bootstrap.Toast("#live-toast");
            toast.show();
            
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3 px-5 pt-3 px-md-0 pt-md-4">
                <AddCompoundInput type="text" label="Title" name="title" defaultValue={compound ? compound.title : ''} placeholder="e.g. Paracetamol"/>
                <AddCompoundInput type="text" label="Unit" name="unit" defaultValue={compound ? compound.unit : ''} placeholder="e.g. mg"/>
                <AddCompoundInput type="number" label="Min" name="min" defaultValue={compound ? compound.min : 0} min={0} step="0.01"/>
                <AddCompoundInput type="number" label="Max" name="max" defaultValue={compound ? compound.max : 0} min={0} step="0.01"/>
                <div className="d-flex flex-column flex-md-row justify-content-md-end pt-3">
                    <button type="button" onClick={() => router.back()} className="col-12 col-md-auto btn btn-secondary mb-3 mb-md-0 me-md-2 rounded-0">Back</button>
                    <button type="submit" className="col-12 col-md-auto btn btn-dark rounded-0">Submit</button>
                </div>
            </form>
            <Toast error={error}/>
        </>
    );
}