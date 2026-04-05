import Link from "next/link";

export default function Header() {
    return (
        <header className="container-fluid border-bottom py-2 fixed-top">
            <div className="d-flex flex-row justify-content-between">
                <Link href="/" className="text-dark text-decoration-none fw-bold fs-3">Remedium</Link>
                <button className="btn btn-dark px-4 fw-bold">Sign in</button>
            </div>
        </header>
    );
}