import { render, screen } from "@testing-library/react";
import TestsTable from ".";
import { format } from "date-fns";

const tests = [
    {
        "id": 1,
        "testDate": new Date(2026, 6, 26, 9, 30),
        "applicant": "Dr. Vance",
        "reason": "To alleviate chronic neuropathic pain in diabetic patients.",
        "details": []
    }
];

describe("Test TestsTable component", () => {
    it("Should display a list of compounds test", () => {
        render(<TestsTable tests={tests}/>);
        const date = screen.getByText(format(tests[0].testDate, "dd/MM/yyyy HH:mm"));
        expect(date).toBeInTheDocument();
        const applicant = screen.getByText(tests[0].applicant);
        expect(applicant).toBeInTheDocument();
        const reason = screen.getByText(tests[0].reason);
        expect(reason).toBeInTheDocument();
    });
});