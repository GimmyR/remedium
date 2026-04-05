"use client";

import { FormEvent, useState } from "react";
import TestInput from "./test-input";
import { Compound } from "@/interfaces/compound";
import AddCompoundModal from "../add-compound-modal";
import { API_URL } from "@/lib/urls";
import { CompoundTest } from "@/interfaces/compound-test";

export default function TestForm() {
    const [compoundsToTest, setCompoundsToTest] = useState<Compound[]>([]);
    const [testedCompounds, setTestedCompounds] = useState<CompoundTest[]>([]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const test = formData.entries().toArray().map(entry => ({ compoundId: entry[0], amount: entry[1] }));
        
        await fetch(`${API_URL}/api/compounds-test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(test)
        }).then(res => res.json())
            .then(data => setTestedCompounds(data))
            .catch(error => console.error(error));
    };

    const addCompound = (compound: Compound) => {
        compoundsToTest.push(compound);
        setCompoundsToTest([...compoundsToTest]);
    };

    const removeCompound = (compound: Compound) => {
        const index = compoundsToTest.findIndex(c => c.id == compound.id);
        compoundsToTest.splice(index, 1);
        setCompoundsToTest([...compoundsToTest]);
    };

    const setError = (index: number, id: number) => {
        if(testedCompounds.length > 0) {
            if(testedCompounds[index])
                return testedCompounds[index].compoundId == id ? { status: testedCompounds[index].error, message: testedCompounds[index].message } : undefined;
            else return undefined;
        } else return undefined;
    };

    return (
        <>
            <form className="col-12 col-lg-3 px-5 pt-3" onSubmit={handleSubmit}>
                {compoundsToTest.map((compound, index) => <TestInput key={compound.id} compound={compound} removeCompound={removeCompound} error={setError(index, compound.id)}/>)}
                <div className="d-flex flex-column flex-lg-row mt-3">
                    <div className="col-lg-6 mb-3 mb-lg-0 pe-lg-1">
                        <button type="button" className="btn btn-outline-dark rounded-0 col-12" data-bs-toggle="modal" data-bs-target="#add-compound">Add compound</button>
                    </div>
                    <div className="col-lg-6 ps-lg-1">
                        <button type="submit" className="btn btn-outline-dark rounded-0 col-12" disabled={compoundsToTest.length == 0}>Submit</button>
                    </div>
                </div>
            </form>
            <AddCompoundModal compoundsToTest={compoundsToTest} addCompound={addCompound}/>
        </>
    );
}