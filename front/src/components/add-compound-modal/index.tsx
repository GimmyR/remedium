"use client";

import { Compound } from "@/interfaces/compound";
import { API_URL } from "@/lib/urls";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AddCompound from "./add-compound";

type Props = {
    compoundsToTest: Compound[],
    addCompound: (compound: Compound) => void
};

export default function AddCompoundModal({ compoundsToTest, addCompound } : Props) {
    const [compounds, setCompounds] = useState<Compound[]>([]);
    const [search, setSearch] = useState<string>("");

    const fetchCompounds = async () => {
        await fetch(`${API_URL}/api/compound/all`)
                .then(res => res.json())
                .then(data => setCompounds(data))
                .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchCompounds();
    }, []);

    return (
        <div className="modal fade" id="add-compound" tabIndex={-1} aria-labelledby="add-compound-label" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="add-compound-label">Add compound</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <input type="text" className="form-control rounded-0" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="e.g. Paracetamol"/>
                        </div>
                        <div className="mb-3">
                            {compounds.filter(compound => (!compoundsToTest.includes(compound) && compound.title.toLowerCase().includes(search.toLowerCase())))
                                        .map(compound => <AddCompound key={compound.id} compound={compound} addCompound={addCompound}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}