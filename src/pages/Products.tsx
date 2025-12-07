import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>('default');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Błąd pobierania danych');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError('Nie udało się pobrać produktów.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getSortedProducts = () => {
        const sorted = [...products];
        switch (sortOption) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'title-asc':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return products;
        }
    };
    const displayedProducts = getSortedProducts();
    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Ładowanie produktów...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;

    return (
        <div>
            <div className="products-header">
                <h1>Nasze Produkty</h1>
                <div className="sort-controls">
                    <label htmlFor="sort">Sortuj według: </label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="default">Domyślnie</option>
                        <option value="price-asc">Cena: rosnąco</option>
                        <option value="price-desc">Cena: malejąco</option>
                        <option value="title-asc">Tytuł: A-Z</option>
                    </select>
                </div>
            </div>
            <div className="products-grid">
                {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};