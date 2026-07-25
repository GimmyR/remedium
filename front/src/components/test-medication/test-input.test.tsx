import { render, screen } from "@testing-library/react";
import TestInput from "./test-input";

const props = {
    compound: {
        id: 1,
        title: "Paracetamol",
        unit: "mg",
        active: true
    },
    amount: 200,
    error: {
        status: false
    }
};

describe("Test TestInput component", () => {
    it("should display the title, unit of the compound and tested amount", () => {
        render(<TestInput {...props}/>);
        const titleUnit = screen.getByTestId(`title-unit-${props.compound.id}`);
        expect(titleUnit).toBeInTheDocument();
        expect(titleUnit).toHaveTextContent(`${props.compound.title} (${props.compound.unit})`);
        const input = screen.getByAltText(`compound-${props.compound.id}`);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(props.amount);
    });
});