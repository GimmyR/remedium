"use client";

import TestDetailsModal from "@/components/tests-table/test-details-modal";
import { CompoundsTest } from "@/interfaces/compound-test";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

type Props = {
    tests: CompoundsTest[]
};

const defaultTest: CompoundsTest = {
    id: 0,
    testDate: new Date(),
    applicant: "Unknown",
    reason: "Unknown",
    details: []
};

export default function TestsTable({ tests } : Props) {
    const [selectedTest, setSelectedTest] = useState<CompoundsTest>(defaultTest);

    const sortTests = () => {
        return tests.sort((a, b) => {
            const date1 = new Date(a.testDate);
            const date2 = new Date(b.testDate);
            return date2.getTime() - date1.getTime();
        });
    };

    const isGood = (test: CompoundsTest) => {
        for(const detail of test.details) {
            if((detail.compound.min && detail.amount < detail.compound.min) || (detail.compound.max && detail.amount > detail.compound.max))
                return false;
        } return true;
    };

    const showTestDetailsModal = (test: CompoundsTest) => {
        setSelectedTest(test);
        const element = document.querySelector("#test-details-modal");

        if(element) {
            const bootstrap = require("bootstrap");
            const modal = new bootstrap.Modal(element);

            if(modal) {
                modal.show();
                element.addEventListener("hide.bs.modal", () => {
                    setSelectedTest(defaultTest);
                });
            }
        }
    };

    return (
        <>
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date & Time</th>
                        <th>Applicant</th>
                        <th>Reason</th>
                        <th>Result</th>
                        <th>See details</th>
                    </tr>
                </thead>
                <tbody>
                    {sortTests().map(test => <tr key={test.id} className="align-middle">
                        <td>{test.id}</td>
                        <td className="text-nowrap">{format(test.testDate, "dd/MM/yyyy HH:mm")}</td>
                        <td>{test.applicant}</td>
                        <td>{test.reason}</td>
                        <td>
                            <span className={`text-nowrap text-bg-${isGood(test) ? "success" : "danger"} ps-2 pe-3 py-1 rounded-4`}>
                                <i className={`bi bi-${isGood(test) ? "check-circle-fill" : "x-circle-fill"} me-2`}></i>{isGood(test) ? "Good" : "Bad"}
                            </span>
                        </td>
                        <td>
                            <Link href="#" onClick={() => showTestDetailsModal(test)}>
                                <i className="bi bi-eye-fill"></i>
                            </Link>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <TestDetailsModal test={selectedTest}/>
        </>
    );
}