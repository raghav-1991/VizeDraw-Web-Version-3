import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import PageRouter from './pages/PageRouter.jsx';
import { DialogProvider } from './context/DialogContext.jsx';

export default function App() {
  return (
    <DialogProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<PageRouter />} />
        </Route>
      </Routes>
    </DialogProvider>
  );
}
