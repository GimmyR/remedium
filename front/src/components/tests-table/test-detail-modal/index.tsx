import { TestDetail } from "@/interfaces/test-detail";

type Props = {
    details: TestDetail[]
};

export default function TestDetailModal({ details } : Props) {
    const isGood = (detail: TestDetail) => (detail.compound.min && detail.compound.min <= detail.amount) && (detail.compound.max && detail.compound.max >= detail.amount);

    return (
        <div className="modal fade" id="test-detail-modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Unit</th>
                                    <th>Min</th>
                                    <th>Max</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map(detail => <tr key={detail.id} className="align-middle">
                                    <td>{detail.id}</td>
                                    <td>{detail.compound.title}</td>
                                    <td>{detail.compound.unit}</td>
                                    <td>{detail.compound.min}</td>
                                    <td>{detail.compound.max}</td>
                                    <td>{detail.amount}</td>
                                    <td>
                                        <span className={`text-bg-${isGood(detail) ? "success" : "danger"} ps-2 pe-3 py-1 rounded-4`}>
                                            <i className={`bi bi-${isGood(detail) ? "check-circle-fill" : "x-circle-fill"} me-2`}></i>{isGood(detail) ? "Good" : "Bad"}
                                        </span>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}