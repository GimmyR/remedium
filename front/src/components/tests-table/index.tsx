"use client";

import { CompoundsTest } from "@/interfaces/compound-test";
import { format } from "date-fns";
import Link from "next/link";
import "./tests-table.css";
import TestDetailModal from "./test-detail-modal";
import { useState } from "react";
import { TestDetail } from "@/interfaces/test-detail";

type Props = {
    tests: CompoundsTest[]
};

export default function TestsTable({ tests } : Props) {
    const [details, setDetails] = useState<TestDetail[]>([]);

    const showDetails = (dets: TestDetail[]) => {
        const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
        const modal = new bootstrap.Modal("#test-detail-modal");

        if(modal) {
            setDetails([...dets]);
            modal.show();
        }
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => <tr key={test.id} className="align-middle">
                        <td>{test.id}</td>
                        <td>{format(test.testDate, "dd/MM/yyyy")}</td>
                        <td>{format(test.testDate, "HH:mm")}</td>
                        <td className="text-center">
                            <Link href="#" onClick={() => showDetails(test.details)} className="text-decoration-none tests-table-row-link">See details</Link>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <TestDetailModal details={details}/>
        </>
    );
}