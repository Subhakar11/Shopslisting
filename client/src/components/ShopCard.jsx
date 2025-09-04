import { Link } from 'react-router-dom';

export default function ShopCard({ shop }) {
  return (
    <div className="card">
      {/* Shop Image */}
      {shop.imageUrl ? (
        <img
          className="image"
          src={shop.imageUrl}
          alt={shop.name}
          style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
        />
      )
      : (
        <div
          className="image"
          style={{
            width: "100%",
            height: "180px",
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          No Image
        </div>
      )}

      {/* Shop Info */}
      <h3>{shop.name}</h3>
      <p className="small">{shop.description}</p>

      {/* Footer */}
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Link className="link" to={`/shops/${shop._id}`}>
          View products →
        </Link>
        <span className="badge">{shop.products?.length ?? 0} products</span>
      </div>
    </div>
  );
}
