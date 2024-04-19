import { getByText, screen, render, waitFor, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import "./Navbar.css";

test("renders Navbar without crashing", () => {
  render(<Navbar />);
});

test("renders and updates upon login", async () => {
  render(<Navbar />);
  expect(getByText("Login/ Signup")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Username:"), { target: { value: "testuser" } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "password" } });
  fireEvent.click(screen.getByText("Login"));

  await waitFor(() => {
    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout, testuser")).toBeInTheDocument();
  });
});
