"use client";

import { Compound } from "@/interfaces/compound";
import { FormEvent } from "react";
import AddCompoundInput from "./add-compound-input";
import { createCompound } from "@/actions/compound";

type Props = {
    compound?: Compound
};

export default function AddCompoundForm({ compound } : Props) {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const min = form.get("min") as string;
        const max = form.get("max") as string;

        const comp = { 
            id: compound ? compound.id : undefined, 
            title: compound ? compound.title : form.get("title") as string, 
            unit: compound ? compound.unit : form.get("unit") as string, 
            min: compound ? compound.min : min && min.trim() != "" ? parseFloat(min) : undefined,
            max: compound ? compound.max : max && max.trim() != "" ? parseFloat(max) : undefined,
            active: compound ? compound.active : true
        };

        await saveCompound(comp);
    };

    const saveCompound = async (compound: Compound) => {
        try {
    
            await createCompound(compound);

        } catch(error: any) {

            console.log(error.message);
            
        }
    };

    return (
        <form onSubmit={handleSubmit} className="col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3 px-5 pt-3 px-md-0 pt-md-4">
            <AddCompoundInput type="text" label="Title" name="title" placeholder="e.g. Paracetamol"/>
            <AddCompoundInput type="text" label="Unit" name="unit" placeholder="e.g. mg"/>
            <AddCompoundInput type="number" label="Min" name="min" min={0} step="0.01"/>
            <AddCompoundInput type="number" label="Max" name="max" min={0} step="0.01"/>
            <div className="d-flex flex-row justify-content-center justify-content-md-end pt-3">
                <button type="submit" className="col-12 col-md-auto btn btn-dark rounded-0">Submit</button>
            </div>
        </form>
    );
}