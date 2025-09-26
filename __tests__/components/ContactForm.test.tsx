/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, screen, waitFor, renderWithProviders } from "@/test-utils/render";
import ContactForm from "@/components/ContactForm";

const mockFetch = global.fetch as jest.Mock;

describe("ContactForm validation", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Message sent successfully",
        timestamp: new Date().toISOString(),
      }),
    });
  });

  it("shows validation errors when submitting empty form", async () => {
    renderWithProviders(<ContactForm />);
    document.querySelector("form")?.setAttribute("novalidate", "true");

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument();
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
      expect(screen.getByText("Message must be at least 10 characters")).toBeInTheDocument();
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows specific error messages for invalid inputs", async () => {
    renderWithProviders(<ContactForm />);
    document.querySelector("form")?.setAttribute("novalidate", "true");

    fireEvent.input(screen.getByLabelText(/full name/i), { target: { value: "A" } });
    fireEvent.input(screen.getByLabelText(/email address/i), { target: { value: "invalid-email" } });
    fireEvent.input(screen.getByLabelText(/message/i), { target: { value: "short" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument();
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
      expect(screen.getByText("Message must be at least 10 characters")).toBeInTheDocument();
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("clears validation errors when fields are corrected", async () => {
    renderWithProviders(<ContactForm />);
    document.querySelector("form")?.setAttribute("novalidate", "true");

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument();
    });

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    fireEvent.change(messageInput, {
      target: {
        value: "This is a sufficiently long message to pass validation.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.queryByText("Name must be at least 2 characters")).not.toBeInTheDocument();
      expect(screen.queryByText("Please enter a valid email address")).not.toBeInTheDocument();
      expect(screen.queryByText("Message must be at least 10 characters")).not.toBeInTheDocument();
    });
  });
});
