import { getByText, screen, render, waitFor, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

test("renders Navbar without crashing", async () => {
  render(<Navbar />);
});

test("renders and updates upon login", async () => {
  render(<Navbar />);
  expect(getByText("Login/ Signup")).toBeInTheDocument();

  fireEvent.type(screen.getAllByLabelText("Username:"), "testuser");
  fireEvent.type(screen.getByLabelText("Password:"), "password");
  fireEvent.click(screen.getByText("Login"));

  await waitFor(() => {
    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout, testuser")).toBeInTheDocument();
  });
});
