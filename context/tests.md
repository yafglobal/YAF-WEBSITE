Our testing philosophy, tools, and practices.

Philosophy

We don't chase 100% test coverage. We focus on testing the things that matter most — business logic, critical user flows, and anything that's broken before.

The rule: every new PR must include tests for the new code. Existing untested code gets tests added when it's modified (the "boy scout rule").

Backend Testing

We use Jest as our test framework.

Running Tests

# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch

# Run tests for a specific file
npm test -- --testPathPattern=user.service.test

What to Test

Service layer functions — this is where business logic lives, so this is where most tests should be

API endpoints — test the request/response cycle for critical routes

Utility functions — pure functions are the easiest to test

Edge cases — what happens with empty input, null values, duplicate entries?

Example Test

describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const user = await UserService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
    });

    it('should throw an error if email already exists', async () => {
      // ... setup existing user

      await expect(
        UserService.createUser({ email: 'existing@example.com', name: 'Test' })
      ).rejects.toThrow('Email already exists');
    });
  });
});

Test File Naming

Place test files in a tests/ directory that mirrors src/ structure

Name test files: <module>.test.js (e.g., user.service.test.js)

Frontend Testing

We use Jest + React Testing Library.

What to Test

Components with logic — conditional rendering, form validation, state changes

User interactions — clicking buttons, submitting forms, navigating

Critical user flows — signup, login, core product features

What NOT to Test

Pure UI components with no logic (a styled button that just renders text)

Third-party library behavior

Implementation details (don't test internal state, test what the user sees)

Example Frontend Test

import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('shows error when email is empty', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with email and password', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});

Testing Mindset

Think about tests as documentation: "this is what this code is supposed to do." If a test is hard to write, the code might be hard to understand — that's a signal to refactor.

When you fix a bug, write a test for it first. This ensures the bug never comes back.