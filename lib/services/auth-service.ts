import axios from 'axios';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  token: string;
  userId: User;
};

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post('https://musical-fishstick-v6pqrx4466xx2rw6-8080.app.github.dev/api/v1/auth/login', {
        username,
        password,
      }, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Login failed: ${error.response?.statusText ?? error.message}`);
    }
  },

  logout: async () => {
    localStorage.removeItem('telconova-token');
    localStorage.removeItem('telconova-user');
  },
};