import { useState, useEffect } from 'react';

const mockProducts = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  description: `Description for product ${i + 1}`,
  price: (10 + i).toFixed(2),
  thumbnail: `https://picsum.photos/seed/${i + 1}/300/200`
}));

const PRODUCTS_PER_PAGE = 6;

const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  const fetchProducts = () => {
    try {
      const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const end = start + PRODUCTS_PER_PAGE;
      const pageProducts = filtered.slice(start, end);

      setTimeout(() => {
        setProducts(pageProducts);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [currentPage, searchTerm]);

  const reload = () => {
    setLoading(true);
    setError(null);
    fetchProducts();
  };

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const previousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return {
    products,
    loading,
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage
  };
};

export default useProductSearch;
