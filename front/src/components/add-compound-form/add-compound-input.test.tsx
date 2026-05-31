import { render, screen } from "@testing-library/react";
import AddCompoundInput from "./add-compound-input";

const props = {
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "e.g. Paracetamol",
    defaultValue: "Ibuprofen"
};

describe("Test AddCompoundInput component", () => {
    it("Should display label, placeholder and default value", () => {
        render(<AddCompoundInput {...props}/>);
        const input = screen.getByPlaceholderText(props.placeholder);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(props.defaultValue);
        const label = screen.getByText(`${props.label} :`);
        expect(label).toBeInTheDocument();
    });
});