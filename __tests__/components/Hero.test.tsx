/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";
import { hero as heroContent } from "@/lib/content/landing-data";

describe("Hero component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders hero headline, subheadline, and primary CTA", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1, name: heroContent.headline })).toBeInTheDocument();
    expect(screen.getByText(heroContent.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: heroContent.ctaText })).toBeInTheDocument();
  });

  it("scrolls to CTA target when the button is clicked", () => {
    const target = document.createElement("div");
    target.setAttribute("id", heroContent.ctaTarget.replace("#", ""));
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);

    render(<Hero />);

    const button = screen.getByRole("button", { name: heroContent.ctaText });
    fireEvent.click(button);

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("does not throw when CTA target is missing", () => {
    render(<Hero />);

    const button = screen.getByRole("button", { name: heroContent.ctaText });

    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
