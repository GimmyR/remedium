"use client";

import { signOut } from "@/actions/authentication";

export default function ConfirmModal() {
    const handleClick = async () => {
        const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
        const modal = bootstrap.Modal.getInstance("#sign-out-modal");
        modal?.hide();
        await signOut();
    };

    return (
        <div className="modal fade" id="sign-out-modal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body fs-5 text-center">
                        Are you sure you want to sign out ?
                    </div>
                    <div className="modal-footer d-flex flex-row justify-content-center">
                        <button type="button" className="btn btn-secondary col-4" data-bs-dismiss="modal">No</button>
                        <button type="button" onClick={handleClick} className="btn btn-danger col-4">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}