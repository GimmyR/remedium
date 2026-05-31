import { verifyAdminAuth } from "@/actions/authentication";
import AddCompoundForm from "@/components/add-compound-form";

export default async function AddCompoundPage() {
    await verifyAdminAuth();
    
    return (
        <main className="min-vh-100 bg-light pt-5 position-relative">
            <div className="d-flex flex-column align-items-center pt-5">
                <h1 className="fs-2 fw-bold text-center mt-lg-3">Add compound</h1>
                <div className="col-12 d-flex flex-row justify-content-center">
                    <AddCompoundForm/>
                </div>
            </div>
        </main>
    );
}