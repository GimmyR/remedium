import { Compound } from "@/interfaces/compound";

type Props = {
    compound: Compound,
    addCompound: (compound: Compound) => void
};

export default function AddCompound({ compound, addCompound } : Props) {
    return (
        <div className="d-flex flex-row justify-content-between align-items-center mb-2 p-1 ps-2 border">
            <div className="d-flex flex-row align-items-center">
                <span className="fs-5 fw-bold me-2">{compound.title}</span>
                <span>({compound.unit})</span>
            </div>
            <div>
                <button type="button" onClick={() => addCompound(compound)} className="btn btn-dark">Add</button>
            </div>
        </div>
    );
}