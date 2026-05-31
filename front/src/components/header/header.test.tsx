import { render, screen } from "@testing-library/react";
import Header from ".";

jest.mock('@/actions/authentication', () => ({
  signedInAsAdmin: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Test Header component", () => {
    it("should display Remedium", async () => {
        const HeaderComponent = await (Header() as any);
        render(HeaderComponent);
        const brand = screen.getByRole("link", { name: /remedium/i });
        expect(brand).toBeInTheDocument();
    });
});