import { signedInAsAdmin } from "@/app/actions";
import Link from "next/link";

export default async function Header() {
    const isSignedInAsAdmin = await signedInAsAdmin();

    return (
        <header className="container-fluid border-bottom py-2 fixed-top">
            <div className="d-flex flex-row justify-content-between">
                <Link href="/" className="text-dark text-decoration-none fw-bold fs-3">Remedium</Link>
                {!isSignedInAsAdmin && <Link href="/sign-in" className="btn btn-dark px-4 fw-bold">Sign in</Link>}
                {isSignedInAsAdmin && <Link href="#" className="btn btn-dark px-4 fw-bold">Sign out</Link>}
            </div>
        </header>
    );
}