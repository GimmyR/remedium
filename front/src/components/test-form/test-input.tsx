import { Compound } from "@/interfaces/compound";

type Props = {
    compound: Compound,
    removeCompound: (compound: Compound) => void,
    error?: {
        status?: boolean,
        message?: string
    }
};

export default function TestInput({ compound, removeCompound, error } : Props) {
    return (
        <div className="mb-3">
            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                <span className="fw-bold" data-testid="title-unit">{/* data-testid attribute is necessary to test this component with Jest */}
                    {error && <i className={`bi ${error.status ? "bi-x-circle-fill text-danger" : "bi-check-circle-fill text-success"} me-2`}></i>}
                    {compound.title} <span className="fw-normal">({compound.unit})</span>
                </span>
                <a href="#" className="text-decoration-none me-2" onClick={() => removeCompound(compound)}>
                    <i className="bi bi-trash-fill text-dark"></i>
                </a>
            </div>
            <input type="number" id={`input-compound-${compound.id}`} name={`${compound.id}`} className="form-control rounded-0" step="any"/>
            {error && error.status && <div className="form-text text-danger ps-3">{error.message}</div>}
        </div>
    );
}