import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { getItemQuantity, addToCart, removeFromCart } = useCart();
    const quantity = getItemQuantity(product.id);

    return (
        <div className="product-card">
            <div className="image-container">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
                <span className="category">{product.category}</span>
                <h3>{product.title}</h3>
                <div className="rating">
                    ★ {product.rating.rate} ({product.rating.count})
                </div>
                <p className="price">{product.price.toFixed(2)} PLN</p>
                <div className="card-actions">
                    {quantity === 0 ? (
                        <button
                            className="add-btn"
                            onClick={() => addToCart(product)}
                        >
                            Dodaj do koszyka
                        </button>
                    ) : (
                        <div className="quantity-controls">
                            <button onClick={() => removeFromCart(product.id)}>-</button>
                            <span className="quantity-display">{quantity} w koszyku</span>
                            <button onClick={() => addToCart(product)}>+</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};