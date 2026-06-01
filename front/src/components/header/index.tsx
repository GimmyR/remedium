import { signedInAsAdmin } from "@/actions/authentication";
import Link from "next/link";
import ConfirmModal from "./confirm-modal";
import Menu from "./menu";

export default async function Header() {
    const isSignedInAsAdmin = await signedInAsAdmin();

    return (<>
        <header className="container-fluid border-bottom py-2 fixed-top text-bg-light">
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row align-items-center">
                    <Link href="/" className="text-dark text-decoration-none fw-bold fs-3">Remedium</Link>
                    {isSignedInAsAdmin && <Menu/>}
                </div>
                {!isSignedInAsAdmin && <Link href="/sign-in" className="btn btn-dark px-4 fw-bold">Sign in</Link>}
                {isSignedInAsAdmin && <button type="button" data-bs-target="#sign-out-modal" data-bs-toggle="modal" className="btn btn-dark px-4 fw-bold">Sign out</button>}
            </div>
        </header>
        <ConfirmModal/>
    </>);
}