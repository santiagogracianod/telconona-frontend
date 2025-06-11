/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { OrderDetails } from '../components/order-details'

// 1. Indica a Jest que mockee axios
jest.mock('axios')

// 2. Crea una variable con el tipo Mocked de axios
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockData = {
  descripcion: 'Instalación de internet',
  cliente: { nombre: 'Juan Pérez', direccion: 'Calle Falsa 123' },
  estado: { nombre: 'En curso' },
  fechaCreacion: '2024-01-05T08:00:00',
  tipo: { nombre: 'Instalación', descripcion: 'Tipo de instalación' }
}

// 3. Configura el return de axios.get
mockedAxios.get.mockResolvedValue({ data: mockData })

test('renders order details correctly', async () => {
  render(<OrderDetails id="ORD-001" />)

  // Comprueba mensaje de carga inicial
  expect(screen.getByText(/cargando detalles de la orden/i)).toBeInTheDocument()

  // Espera a que llegue la data mockeada y se renderice
  await waitFor(() => {
    expect(screen.getByText('Instalación de internet')).toBeInTheDocument()
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Calle Falsa 123')).toBeInTheDocument()
    expect(screen.getByText('En curso')).toBeInTheDocument()
    expect(screen.getByText('Instalación')).toBeInTheDocument()
    expect(screen.getByText('Tipo de instalación')).toBeInTheDocument()
  })
})
