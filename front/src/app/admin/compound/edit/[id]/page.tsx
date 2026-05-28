import { verifyAdminAuth } from "@/actions/authentication";
import { fetchUniqueCompound } from "@/actions/compound";
import AddCompoundForm from "@/components/add-compound-form";

type Props = {
    params: Promise<{ id: number }>
};

export default async function EditCompoundPage({ params } : Props) {
    await verifyAdminAuth();
    const { id } = await params;
    const compound = await fetchUniqueCompound(id);
    
    return (
        <main className="min-vh-100 bg-light pt-5 position-relative">
            <div className="d-flex flex-column align-items-center pt-5">
                <h1 className="fs-2 fw-bold text-center mt-lg-3">Edit compound</h1>
                <div className="col-12 d-flex flex-row justify-content-center">
                    <AddCompoundForm compound={compound}/>
                </div>
            </div>
        </main>
    );
}