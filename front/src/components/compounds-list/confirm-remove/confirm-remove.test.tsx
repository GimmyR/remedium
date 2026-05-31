import { render, screen } from "@testing-library/react";
import ConfirmRemove from ".";

jest.mock('@/actions/compound', () => ({
  createCompound: jest.fn(() => Promise.resolve({ success: true })),
  deleteCompound: jest.fn(() => Promise.resolve({ success: true })), // Si tu as un delete
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null, push: jest.fn() };
  },
}));

const props = {
    toRemove: {
        id: 1,
        title: "Paracetamol",
        unit: "mg",
        min: 500,
        max: 1000,
        active: true
    },
    reset: () => {}
};

describe("Test ConfirmRemove component", () => {
    it("Should display a question with the ID of compound to remove", () => {
        render(<ConfirmRemove {...props}/>);
        const message = screen.getByTestId("confirm-remove-message");
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent(`Are you sure you want to remove this compound (ID = ${props.toRemove.id}) ?`);
    });
});