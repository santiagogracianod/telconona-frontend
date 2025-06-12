/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { OrderDetails } from '../components/order-details'

const mockOrder = {
  descripcion: 'Instalación de internet',
  cliente: { nombre: 'Juan Pérez', direccion: 'Calle Falsa 123' },
  estado: { nombre: 'En curso' },
  fechaCreacion: '2024-01-05T08:00:00',
  tipo: { nombre: 'Instalación', descripcion: 'Tipo de instalación' }
}

test('renders order details correctly from prop', () => {
  // 1) Renderizas pasándole el objeto completo
  render(<OrderDetails order={mockOrder} />)

  // 2) Compruebas los textos que el componente sí muestra
  expect(screen.getByText('Detalles de la orden')).toBeInTheDocument()
  expect(screen.getByText('Instalación de internet')).toBeInTheDocument()
  expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
  expect(screen.getByText('Calle Falsa 123')).toBeInTheDocument()
  expect(screen.getByText('En curso')).toBeInTheDocument()
  expect(screen.getByText('Instalación')).toBeInTheDocument()
  expect(screen.getByText('Tipo de instalación')).toBeInTheDocument()
})
