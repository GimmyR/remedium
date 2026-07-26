import { TestDetail } from "@/interfaces/test-detail";

type Props = {
    details: TestDetail[];
};

export default function TestDetailsTable({ details } : Props) {
    const isGood = (detail: TestDetail) => (detail.compound.min && detail.amount >= detail.compound.min) && (detail.compound.max && detail.amount <= detail.compound.max);

    return (
        <table className="table table-bordered table-hover text-center">
            <thead>
                <tr>
                    <th>Compound</th>
                    <th>Unit</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Amount</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {details.map(detail => <tr key={detail.id}>
                    <td>{detail.compound.title}</td>
                    <td>{detail.compound.unit}</td>
                    <td>{detail.compound.min}</td>
                    <td>{detail.compound.max}</td>
                    <td>{detail.amount.toFixed(2)}</td>
                    <td>
                        <span className={`text-nowrap text-bg-${isGood(detail) ? "success" : "danger"} ps-2 pe-3 py-1 rounded-4`}>
                            <i className={`bi bi-${isGood(detail) ? "check-circle-fill" : "x-circle-fill"} me-2`}></i>{isGood(detail) ? "Good" : "Bad"}
                        </span>
                    </td>
                </tr>)}
            </tbody>
        </table>
    );
}