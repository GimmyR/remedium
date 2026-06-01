import { render, screen } from "@testing-library/react";
import TestDetailModal from ".";

const details = [
    {
        "id": 2,
        "compound": {
            "id": 1,
            "title": "Paracetamol",
            "unit": "mg",
            "min": 500,
            "max": 1000,
            "active": true
        },
        "amount": 300
    }
];

describe("Test TestDetailModal component", () => {
    it("Should display a list of test details", () => {
        render(<TestDetailModal details={details}/>);
        const title = screen.getByText("Paracetamol");
        expect(title).toBeInTheDocument();
    });
});