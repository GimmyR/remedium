import { CompoundsTest } from "@/interfaces/compound-test";
import { format } from "date-fns";

type Props = {
    tests: CompoundsTest[]
};

export default function TestsTable({ tests } : Props) {
    const formatTests = () => {
        const results: any[] = tests.reduce((acc: any[], test: CompoundsTest) => {
            for(const detail of test.details)
                acc.push({
                    id: test.id,
                    detailId: detail.id,
                    date: format(test.testDate, "dd/MM/yyyy HH:mm"),
                    title: detail.compound.title,
                    unit: detail.compound.unit,
                    min: detail.compound.min,
                    max: detail.compound.max,
                    amount: detail.amount,
                    status: isGood(detail)
                });

            return acc;
        }, []);

        return results.sort((a, b) => a.id - b.id);
    };

    const isGood = (test: any) => (test.min && test.min <= test.amount) && (test.max && test.max >= test.amount);

    return (
        <table className="table table-hover text-center">
            <thead>
                <tr>
                    <th>Test ID</th>
                    <th>Detail ID</th>
                    <th>Date & Time</th>
                    <th>Title</th>
                    <th>Unit</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {formatTests().map(test => <tr key={`${test.id}-${test.detailId}`} className="align-middle">
                    <td>{test.id}</td>
                    <td>{test.detailId}</td>
                    <td className="text-nowrap">{test.date}</td>
                    <td>{test.title}</td>
                    <td>{test.unit}</td>
                    <td>{test.min}</td>
                    <td>{test.max}</td>
                    <td>{test.amount}</td>
                    <td>
                        <span className={`text-nowrap text-bg-${isGood(test) ? "success" : "danger"} ps-2 pe-3 py-1 rounded-4`}>
                            <i className={`bi bi-${isGood(test) ? "check-circle-fill" : "x-circle-fill"} me-2`}></i>{isGood(test) ? "Good" : "Bad"}
                        </span>
                    </td>
                </tr>)}
            </tbody>
        </table>
    );
}