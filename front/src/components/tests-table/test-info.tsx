import { CompoundsTest } from "@/interfaces/compound-test";
import { format } from "date-fns";

type Props = {
    test: CompoundsTest;
};

export default function TestInfo({ test } : Props) {
    return (
        <table>
            <tbody>
                <tr>
                    <td className="pe-2">
                        <strong>
                            <span className="text-decoration-underline me-1">Test date</span>:
                        </strong>
                    </td>
                    <td>{format(test.testDate, "dd/MM/yyyy HH:mm")}</td>
                </tr>
                <tr>
                    <td>
                        <strong>
                            <span className="text-decoration-underline me-1">Reason</span>:
                        </strong>
                    </td>
                    <td>{test.reason}</td>
                </tr>
            </tbody>
        </table>
    );
}