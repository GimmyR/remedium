"use client";

import { Compound } from "@/interfaces/compound";
import CompoundItem from "./compound-item";
import ConfirmRemove from "./confirm-remove";
import { useState } from "react";

type Props = {
    compounds: Compound[]
};

export default function CompoundsList({ compounds } : Props) {
    const [toRemove, setToRemove] = useState<Compound | undefined>();

    const confirm = (compound: Compound) => {
        const element = document.getElementById("confirm-remove-compound");

        if(element) {
            setToRemove(compound);
            const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
            const modal = new bootstrap.Modal(element);
            modal.show();
        }
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Unit</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th className="col-2"></th>
                        <th className="col-3"></th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {compounds.map(compound => <CompoundItem key={compound.id} compound={compound} confirm={confirm}/>)}
                </tbody>
            </table>
            <ConfirmRemove toRemove={toRemove} reset={() => setToRemove(undefined)}/>
        </>
    );
}