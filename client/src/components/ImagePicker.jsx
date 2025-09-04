export default function ImagePicker({ onChange }){
  return (
    <input className="input" type="file" accept="image/*" onChange={e => onChange(e.target.files?.[0] || null)} />
  );
}
