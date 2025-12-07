import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { cartTotalQuantity } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
      </div>

      <div className="navbar-cart">
        <div className="cart-icon-wrapper">
            <ShoppingCart />
            {cartTotalQuantity > 0 && (
              <span className="cart-badge">{cartTotalQuantity}</span>
            )}
        </div>
      </div>
    </nav>
  );
};