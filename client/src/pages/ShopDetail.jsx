import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

export default function ShopDetail() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const { data } = await api.get(`/shops/${id}?includeProducts=true`);
        setShop(data);
      } catch (err) {
        console.error(' Shop load error:', err);
        setError('Failed to load shop');
      }
    };

    load();
  }, [id]);

  if (error) return <div className="container">{error}</div>;
  if (!shop) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div
        className="row"
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h2>{shop.name}</h2>
        <div className="row">
          <Link className="btn" to={`/shops/${id}/products/new`}>
            + New Product
          </Link>
          <Link className="btn" to={`/shops/${id}/edit`}>
            Edit Shop
          </Link>
        </div>
      </div>

      {shop.imageUrl && (
        <img className="image" src={shop.imageUrl} alt={shop.name} />
      )}
      <p className="small">{shop.description}</p>

      <h3 style={{ marginTop: 24 }}>Products</h3>
      <div className="grid grid-3">
        {shop.products?.map((p) => (
          <div key={p._id} className="card">
            {p.imageUrl ? (
              <img className="image" src={p.imageUrl} alt={p.name} />
            ) : (
              <div className="image" />
            )}
            <h4>{p.name}</h4>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="badge">₹ {p.price}</span>
             
              <Link className="link" to={`/products/${p._id}/edit?shopId=${id}`}>
                 Edit
                  </Link>

            </div>
            <p className="small">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
