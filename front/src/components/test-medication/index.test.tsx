import TestMedication from "@/components/test-medication";
import { render, screen } from "@testing-library/react";

const compounds = [
    { id: 1, title: "Paracetamol", unit: "mg", active: true }
];

describe("Test TestMedication", () => {
    it("Should display input for applicant and reason", () => {
        render(<TestMedication compounds={compounds}/>);
        const inputApplicant = screen.getByLabelText("Applicant");
        expect(inputApplicant).toBeInTheDocument();
        const inputReason = screen.getByLabelText("Reason");
        expect(inputReason).toBeInTheDocument();
        const startTestBtn = screen.getByRole("button", { name: "Start test" });
        expect(startTestBtn).toBeInTheDocument();
    });
});