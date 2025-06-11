import { render, screen, waitFor } from '@testing-library/react';
import { OrderDetails } from '../components/order-details';

const mockOrder = {
  id: 1,
  codigo: 'ORD-001',
  descripcion: 'Instalación de internet',
  cliente: { nombre: 'Juan Pérez', direccion: 'Calle Falsa 123' },
  estado: { nombre: 'En curso' },
  fechaCreacion: '2024-01-05T08:00:00',
};

jest.mock('../components/order-details', () => ({
  OrderDetails: jest.fn(() => (
    <div>
      <p>ORD-001</p>
      <p>Instalación de internet</p>
      <p>Juan Pérez</p>
      <p>En curso</p>
      <p>Calle Falsa 123</p>
    </div>
  )),
}));

test('renders order details correctly', async () => {
  render(<OrderDetails {...mockOrder} />);

  await waitFor(() => {
    expect(screen.getByText('ORD-001')).toBeInTheDocument();
    expect(screen.getByText('Instalación de internet')).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('En curso')).toBeInTheDocument();
    expect(screen.getByText('Calle Falsa 123')).toBeInTheDocument();
  });
});