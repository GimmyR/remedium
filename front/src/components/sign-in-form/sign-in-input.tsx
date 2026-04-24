type Props = {
    type: string,
    icon: string,
    name: string,
    placeholder: string
};

export default function SignInInput({ type, icon, name, placeholder } : Props) {
    const basicAddon = `basic-addon-${name}`;

    return (
        <div className="input-group mb-3">
            <span className="input-group-text rounded-0" id={basicAddon}>
                <i className={`bi bi-${icon}`}></i>
            </span>
            <input type={type} className="form-control rounded-0" name={name} placeholder={placeholder} aria-label={name.charAt(0).toUpperCase() + name.slice(1)} aria-describedby={basicAddon}/>
        </div>
    );
}