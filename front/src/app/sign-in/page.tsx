import SignInForm from "@/components/sign-in-form";

export default function SignInPage() {
    return (
        <main className="min-vh-100 bg-light pt-5">
            <div className="d-flex flex-column align-items-center pt-5">
                <h1 className="fs-2 fw-bold text-center mt-lg-3">Sign in</h1>
                <SignInForm/>
            </div>
        </main>
    );
}