import { describe, expect, test, vi } from "vitest";
import { render, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { GooeyNav } from "../GooeyNav";

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    isAdmin: false,
    signOut: vi.fn(),
  }),
}));

vi.mock("gsap", () => ({
  gsap: {
    timeline: vi.fn(() => ({
      set: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
    })),
  },
}));

describe("GooeyNav mobile menu", () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <GooeyNav />
      </MemoryRouter>,
    );

    const toggle = utils.getByRole("button", { name: /open navigation/i });

    return { toggle, ...utils };
  };

  test("opens the menu, traps focus and loops shift+tab", async () => {
    const user = userEvent.setup();
    const { toggle, getByRole } = setup();

    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await act(async () => {
      await user.click(toggle);
    });

    await waitFor(() => expect(toggle).toHaveAttribute("aria-expanded", "true"));

    await waitFor(() =>
      expect(getByRole("dialog", { name: /monynha softwares navigation/i })).toBeInTheDocument(),
    );

    const firstItem = getByRole("menuitem", { name: /home/i });
    expect(firstItem).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");

    const closeButton = getByRole("button", { name: /close menu/i });
    expect(closeButton).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(firstItem).toHaveFocus();
  });

  test("supports arrow key navigation and escape close", async () => {
    const user = userEvent.setup();
    const { toggle, getByRole, queryByRole } = setup();

    await act(async () => {
      await user.click(toggle);
    });

    await waitFor(() => expect(getByRole("menuitem", { name: /home/i })).toBeInTheDocument());
    const firstItem = getByRole("menuitem", { name: /home/i });
    const secondItem = getByRole("menuitem", { name: /repositories/i });

    expect(firstItem).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(secondItem).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(firstItem).toHaveFocus();

    await act(async () => {
      await user.keyboard("{Escape}");
    });

    await waitFor(() => expect(toggle).toHaveFocus());
    await waitFor(() => expect(toggle).toHaveAttribute("aria-expanded", "false"));

    await waitFor(() =>
      expect(queryByRole("dialog", { name: /monynha softwares navigation/i })).not.toBeInTheDocument(),
    );
  });
});
