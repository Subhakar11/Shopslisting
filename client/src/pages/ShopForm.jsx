
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import ImagePicker from "../components/ImagePicker";

export default function ShopForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const edit = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!edit) return;
      try {
        const { data } = await api.get(`/shops/${id}`);
        setName(data.name);
        setDescription(data.description || "");
      } catch (err) {
        setError("Failed to load shop");
      }
    };
    load();
  }, [id, edit]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const form = new FormData();
      form.append("name", name);
      form.append("description", description);
      if (image) form.append("image", image);

      if (edit) {
        if (!id) {
          setError("Shop ID not found");
          return;
        }
        await api.put(`/shops/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate(`/shops/${id}`);
      } else {
        const { data } = await api.post("/shops", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        navigate(`/shops/${data._id}`);
      }
    } catch (err) {
      console.error("Shop save error:", err);
      setError(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="card">
        <h2>{edit ? "Edit Shop" : "New Shop"}</h2>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <input
            className="input"
            placeholder="Shop name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

