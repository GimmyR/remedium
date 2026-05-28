"use client";

import { Compound } from "@/interfaces/compound";
import CompoundItem from "./compound-item";

type Props = {
    compounds: Compound[]
};

export default function CompoundsList({ compounds } : Props) {
    return (
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
                {compounds.map(compound => <CompoundItem key={compound.id} compound={compound}/>)}
            </tbody>
        </table>
    );
}