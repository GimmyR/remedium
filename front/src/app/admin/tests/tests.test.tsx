import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import TestsListPage from "./page";

const tests = [
    {
        "id": 1,
        "testDate": new Date(2026, 6, 26, 9, 30),
        "applicant": "Dr. Vance",
        "reason": "To alleviate chronic neuropathic pain in diabetic patients.",
        "details": []
    }
];

jest.mock("@/actions/authentication", () => ({
    verifyAdminAuth: jest.fn()
}));

jest.mock("@/actions/compounds-test", () => ({
    fetchAllCompoundsTests: jest.fn(() => Promise.resolve(tests))
}));

describe("Test TestsTable component", () => {
    it("Should display 'List of all tests' title and a list of compounds test", async () => {
        const Tests = await (TestsListPage() as any);
        render(Tests);
        const title = screen.getByText("List of all tests");
        expect(title).toBeInTheDocument();
        const date = screen.getByText(format(tests[0].testDate, "dd/MM/yyyy HH:mm"));
        expect(date).toBeInTheDocument();
        const applicant = screen.getByText(tests[0].applicant);
        expect(applicant).toBeInTheDocument();
        const reason = screen.getByText(tests[0].reason);
        expect(reason).toBeInTheDocument();
    });
});