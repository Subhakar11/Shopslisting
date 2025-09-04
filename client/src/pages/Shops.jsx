import { useEffect, useState } from 'react';
import api from '../api';
import ShopCard from '../components/ShopCard';
import { Link } from 'react-router-dom';

export default function Shops(){
  const [shops, setShops] = useState([]);

  const load = async () => {
    const { data } = await api.get('/shops?includeProducts=true');
    setShops(data);
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="container">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <h2>All Shops</h2>
        <Link className="btn" to="/shops/new">+ New Shop</Link>
      </div>
      <div className="grid grid-3">
        {shops.map(s => <ShopCard key={s._id} shop={s} />)}
      </div>
    </div>
  );
}
