type Props = {
    error: string
};

export default function Toast({ error } : Props) {
    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="live-toast" className="toast text-bg-danger align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {error}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    );
}