import { Compound } from "@/interfaces/compound";

type Props = {
    compound: Compound,
    amount: number,
    error: {
        status?: boolean,
        message?: string
    }
};

export default function TestInput({ compound, amount, error } : Props) {
    return (
        <div className="mb-3">
            <div className="d-flex flex-row justify-content-start align-items-center mb-2">
                <span className="fw-bold" data-testid={`title-unit-${compound.id}`}>{/* data-testid attribute is necessary to test this component with Jest */}
                    {error && <i className={`bi ${error.status ? "bi-x-circle-fill text-danger" : "bi-check-circle-fill text-success"} me-2`}></i>}
                    {compound.title} <span className="fw-normal">({compound.unit})</span>
                </span>
            </div>
            <input type="number" value={amount.toFixed(2)} className="form-control rounded-0" step="any" alt={`compound-${compound.id}`} disabled/>
            {error && error.status && <div className="form-text text-danger ps-3">{error.message}</div>}
        </div>
    );
}