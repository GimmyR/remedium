import { removeCompound } from "@/actions/compound";
import { Compound } from "@/interfaces/compound";

type Props = {
    toRemove?: Compound,
    reset: () => void
};

export default function ConfirmRemove({ toRemove, reset } : Props) {
    const remove = async () => {
        const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
        const modal = bootstrap.Modal.getInstance("#confirm-remove-compound");

        if(modal) {
            modal.hide();
            await removeCompound(toRemove && toRemove.id ? toRemove.id : 0);
        }
    };

    const dismiss = () => {
        const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
        const modal = bootstrap.Modal.getInstance("#confirm-remove-compound");
        
        if(modal) {
            modal.hide();
            reset();
        }
    };

    return (
        <div className="modal fade" id="confirm-remove-compound" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body text-center" data-testid="confirm-remove-message">
                        Are you sure you want to remove this compound (ID = {toRemove?.id}) ?
                    </div>
                    <div className="modal-footer d-flex flex-row justify-content-center">
                        <button type="button" onClick={dismiss} className="btn btn-secondary col-5">No</button>
                        <button type="button" onClick={remove} className="btn btn-danger col-5">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}