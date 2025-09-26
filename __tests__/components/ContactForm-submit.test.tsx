/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { act, fireEvent, screen, waitFor, renderWithProviders } from "@/test-utils/render";
import ContactForm from "@/components/ContactForm";

const mockFetch = global.fetch as jest.Mock;

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: "Jane Doe" },
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/message/i), {
    target: {
      value: "I would like to learn more about your webhook integration capabilities.",
    },
  });
};

describe("ContactForm submission", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("submits the form and shows success state", async () => {
    jest.useFakeTimers();

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Message sent successfully",
        timestamp: new Date().toISOString(),
      }),
    });

    renderWithProviders(<ContactForm />);
    document.querySelector("form")?.setAttribute("novalidate", "true");
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Message Sent!")).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Message Sent!")).not.toBeInTheDocument();
    });
  });

  it("shows error message when submission fails", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: false,
        error: "Webhook failed",
        timestamp: new Date().toISOString(),
      }),
    });

    renderWithProviders(<ContactForm />);
    document.querySelector("form")?.setAttribute("novalidate", "true");
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Webhook failed")).toBeInTheDocument();
    });

    expect(screen.queryByText("Message Sent!")).not.toBeInTheDocument();
  });

  it("disables submit button during submission and re-enables on error", async () => {
    let resolveFetch: (() => void) | undefined;

    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = () =>
            resolve({
              ok: true,
              json: async () => ({
                success: false,
                error: "Server error",
                timestamp: new Date().toISOString(),
              }),
            });
        })
    );

    renderWithProviders(<ContactForm />);
    document.querySelector("form")?.setAttribute("novalidate", "true");
    fillValidForm();

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent("Sending...");
    });

    act(() => {
      if (!resolveFetch) {
        throw new Error("resolveFetch not initialised");
      }
      resolveFetch();
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });
});
