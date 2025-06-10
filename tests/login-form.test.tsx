/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LoginForm } from '../components/login-form';

// 1) Mock del hook useAuth
const mockLogin = jest.fn();
jest.mock('@/components/auth-provider', () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  it('muestra validación si los campos están vacíos', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(
      await screen.findByText(/por favor ingresa tu email y contraseña/i)
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('llama a login y muestra error si devuelve false', async () => {
    mockLogin.mockResolvedValueOnce(false);

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: 'tecnico' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'badpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('tecnico', 'badpass');
    });
    expect(
      await screen.findByText(/credenciales inválidas\. por favor intenta de nuevo\./i)
    ).toBeInTheDocument();
  });
});
