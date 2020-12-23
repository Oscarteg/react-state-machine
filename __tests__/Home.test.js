import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Home from "../pages/index";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Finite state machine")).toBeInTheDocument();
});
