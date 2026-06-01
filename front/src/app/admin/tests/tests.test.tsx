import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import TestsListPage from "./page";

const tests = [
    {
        "id": 1,
        "testDate": new Date(),
        "details": [
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
        ]
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
        const compoundTitle = screen.getByText(tests[0].details[0].compound.title);
        expect(compoundTitle).toBeInTheDocument();
    });
});