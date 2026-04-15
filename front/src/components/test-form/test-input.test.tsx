import { render, screen } from "@testing-library/react";
import TestInput from "./test-input";
import { Compound } from "@/interfaces/compound";

const props = {
    compound: {
        id: 1,
        title: "Paracetamol",
        unit: "mg"
    },
    removeCompound: (compound: Compound) => {}
};

describe("Test TestInput component", () => {
    it("should display the title and the unit of the compound", () => {
        render(<TestInput {...props}/>);
        const titleUnit = screen.getByTestId("title-unit");
        expect(titleUnit).toBeInTheDocument();
        expect(titleUnit).toHaveTextContent(`${props.compound.title} (${props.compound.unit})`);
    });
});