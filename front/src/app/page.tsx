import { fetchAllCompounds } from "@/actions/compound";
import TestMedication from "@/components/test-medication";

export default async function HomePage() {
    const compounds = await fetchAllCompounds();

    return (
        <main className="min-vh-100 bg-light pt-5">
            <div className="d-flex flex-column align-items-center pt-5">
                <h1 className="fs-4 fw-bold text-center text-decoration-underline mt-lg-3">Test medication</h1>
                <TestMedication compounds={compounds}/>
            </div>
        </main>
    );
}