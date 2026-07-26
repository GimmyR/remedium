type Props = {
    result: boolean | 0 | undefined;
};

export default function TestResult({ result } : Props) {
    return (
        <span className={`text-nowrap text-bg-${result ? "success" : "danger"} ps-2 pe-3 py-1 rounded-4`}>
            <i className={`bi bi-${result ? "check-circle-fill" : "x-circle-fill"} me-2`}></i>{result ? "Good" : "Bad"}
        </span>
    );
}