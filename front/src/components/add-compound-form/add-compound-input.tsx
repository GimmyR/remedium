type Props = {
    label: string,
    type: string,
    name: string,
    placeholder?: string,
    defaultValue?: any,
    min?: number,
    step?: any
};

export default function AddCompoundInput({ label, type, name, placeholder, defaultValue, min, step } : Props) {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-md-center mb-3">
            <label className="col-12 col-md-3 text-md-center fw-bold">{label} :</label>
            <div className="col-12 col-md-9">
                <input type={type} className="form-control rounded-0" name={name} defaultValue={defaultValue} placeholder={placeholder} min={min} step={step}/>
            </div>
        </div>
    );
}