import { verifyAdminAuth } from "@/actions/authentication";
import { fetchAllCompoundsTests } from "@/actions/compounds-test";
import TestsTable from "@/components/tests-table";

export default async function TestsListPage() {
    await verifyAdminAuth();
    const tests = await fetchAllCompoundsTests();

    return (
        <main className="min-vh-100 bg-light pt-5 position-relative">
            <div className="d-flex flex-column align-items-center pt-5">
                <h1 className="fs-2 fw-bold text-center mt-lg-3">List of all tests</h1>
                <div className="col-12 col-xl-10 col-xxl-9 table-responsive mt-5 mb-5 pb-5">
                    <TestsTable tests={tests}/>
                </div>
            </div>
        </main>
    );
}