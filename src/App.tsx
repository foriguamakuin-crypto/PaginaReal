import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import SizeGuide from './pages/SizeGuide';
import Shipping from './pages/Shipping';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/tallas" element={<SizeGuide />} />
          <Route path="/envios" element={<Shipping />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
