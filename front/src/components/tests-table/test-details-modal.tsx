import TestDetailsTable from "@/components/tests-table/test-details-table";
import TestInfo from "@/components/tests-table/test-info";
import { CompoundsTest } from "@/interfaces/compound-test";
import { format } from "date-fns";

type Props = {
    test: CompoundsTest;
};

export default function TestDetailsModal({ test } : Props) {
    return (
        <div className="modal fade" id="test-details-modal" tabIndex={-1} aria-labelledby="test-details-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="test-details-modal-label">{test.applicant}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column">
                            <div>
                                <TestInfo test={test}/>
                            </div>
                            <div className="mt-3">
                                <TestDetailsTable details={test.details}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}