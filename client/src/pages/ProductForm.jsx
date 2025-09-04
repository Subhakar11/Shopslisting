
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ImagePicker from "../components/ImagePicker";

export default function ProductForm() {
  const navigate = useNavigate();
  const { shopId, productId } = useParams(); 
  const [searchParams] = useSearchParams();

  const edit = Boolean(productId);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  
  const effectiveShopId = shopId || searchParams.get("shopId");


  useEffect(() => {
    if (!edit) return;

    const loadProduct = async () => {
      try {
        const { data } = await api.get(`/products/${productId}`);
        setName(data.name || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
      } catch (err) {
        console.error(" Failed to load product:", err);
        setError("Failed to load product details");
      }
    };

    loadProduct();
  }, [edit, productId]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (!effectiveShopId) {
        setError("Shop ID missing. Cannot save product.");
        return;
      }

      const form = new FormData();
      form.append("shopId", effectiveShopId);
      form.append("name", name);
      form.append("price", price);
      form.append("description", description);
      if (image) form.append("image", image);

      if (edit) {
        await api.put(`/products/${productId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

     
      navigate(`/shops/${effectiveShopId}`);
    } catch (err) {
      console.error(" Product save failed:", err);
      setError(err.response?.data?.message || "Save failed. Please try again.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="card">
        <h2>{edit ? "Edit Product" : "New Product"}</h2>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <input
            className="input"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <textarea
            rows="3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <ImagePicker onChange={setImage} />

          {error && (
            <div className="small" style={{ color: "#fca5a5" }}>
              {error}
            </div>
          )}

          <button className="btn">Save</button>
        </form>
      </div>
    </div>
  );
}
