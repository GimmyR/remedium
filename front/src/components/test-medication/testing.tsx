type Props = {
    status: number;
};

export default function Testing({ status } : Props) {
    if(status == 0)
        return null;

    return (
        <div className="d-flex flex-row justify-content-center align-items-center mt-4">
            <div className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></div>
            <strong role="status" className="text-secondary ms-2">
                {status == 1 ? (
                    "Analyzing medication"
                ) : (
                    "Testing compounds"
                )}
            </strong>
        </div>
    );
}