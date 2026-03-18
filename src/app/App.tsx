import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  // Force Vite HMR rebuild
  return <RouterProvider router={router} />;
}
