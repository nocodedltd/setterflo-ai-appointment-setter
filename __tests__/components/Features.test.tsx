/**
 * @jest-environment jsdom
 */

import { describe, it, expect } from "@jest/globals";
import { screen, within, renderWithProviders } from "@/test-utils/render";
import Features from "@/components/Features";
import { features as featuresContent } from "@/lib/content/landing-data";

describe("Features component", () => {
  it("renders section title and subtitle", () => {
    renderWithProviders(<Features />);

    expect(screen.getByRole("heading", { level: 2, name: featuresContent.sectionTitle })).toBeInTheDocument();

    if (featuresContent.sectionSubtitle) {
      expect(screen.getByText(featuresContent.sectionSubtitle)).toBeInTheDocument();
    }
  });

  it("renders each feature card with icon and description", () => {
    renderWithProviders(<Features />);

    const featureHeadings = screen.getAllByRole("heading", { level: 3 });
    const sorted = [...featuresContent.features].sort((a, b) => a.order - b.order);

    expect(featureHeadings).toHaveLength(sorted.length);

    featureHeadings.forEach((heading, index) => {
      const expectedFeature = sorted[index];
      expect(heading).toHaveTextContent(expectedFeature.title);

      const card = heading.closest("div");
      expect(card).toBeTruthy();

      if (card) {
        const utils = within(card);
        expect(utils.getByText(expectedFeature.description)).toBeInTheDocument();
      }
    });
  });

  it("displays partner logos", () => {
    renderWithProviders(<Features />);

    const logos = ["Next Labs", "Vercel", "Globe Corp", "Window Systems"];
    logos.forEach((name) => {
      expect(screen.getByRole("img", { name })).toBeInTheDocument();
    });
  });
});
