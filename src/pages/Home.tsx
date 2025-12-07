import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const [randomProduct, setRandomProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Błąd pobierania danych');
        }
        const data: Product[] = await response.json();
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomProduct(data[randomIndex]);
        }
      } catch (err) {
        setError('Nie udało się pobrać produktu dnia.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProduct();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Witaj w naszym sklepie!</h1>
        <p>Sprawdź naszą ofertę lub skorzystaj z okazji dnia poniżej.</p>
      </div>

      <div className="featured-product-section">
        <h2>Polecany produkt</h2>
        {loading && <div className="loading">Szukanie najlepszej oferty...</div>}
        {error && <div className="error">{error}</div>}
        {randomProduct && !loading && !error && (
            <div className="featured-card-wrapper">
                <ProductCard product={randomProduct} />
            </div>
        )}
      </div>
    </div>
  );
};