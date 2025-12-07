import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;