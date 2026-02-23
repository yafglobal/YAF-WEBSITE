import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ScrollReveal from "./ScrollReveal";

// Mock motion/react to avoid animation complexities in tests
vi.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div className={className} data-testid="scroll-reveal" {...props}>
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

describe("ScrollReveal", () => {
  it("renders children", () => {
    render(
      <ScrollReveal>
        <p>Hello World</p>
      </ScrollReveal>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <ScrollReveal className="custom-class">
        <p>Content</p>
      </ScrollReveal>
    );

    expect(screen.getByTestId("scroll-reveal")).toHaveClass("custom-class");
  });
});
