import TestForm from "@/components/test-form";

export default function HomePage() {
    return (
        <main className="min-vh-100 bg-light pt-5">
            <div className="d-flex flex-column align-items-center pt-5">
                <h1 className="fs-4 fw-bold text-center text-decoration-underline mt-lg-3">Test compounds</h1>
                <TestForm/>
            </div>
        </main>
    );
}