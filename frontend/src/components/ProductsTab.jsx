import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsTab.css';

// admin products management component
const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    store: 'rice',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('rice');
  const [expandedId, setExpandedId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      if (files && files[0]) reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, form, {
          headers: { Authorization: token },
        });
      } else {
        await axios.post('http://localhost:5000/api/products', form, {
          headers: { Authorization: token },
        });
      }
      setForm({ name: '', description: '', price: '', store: 'rice', image: '' });
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      store: product.store,
      image: '',
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token },
      });
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const filteredProducts = products.filter(p => p.store === activeTab);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-center">Manage Products</h3>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Product
        </button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'rice' ? 'active' : ''}`} onClick={() => setActiveTab('rice')}>
            Rice Store
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'grocery' ? 'active' : ''}`} onClick={() => setActiveTab('grocery')}>
            Grocery Store
          </button>
        </li>
      </ul>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-box shadow rounded p-4 bg-white">
            <h5 className="mb-3">{editingId ? 'Edit Product' : 'Add Product'}</h5>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-control mb-2" required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="form-control mb-2" required />
              <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="form-control mb-2" required />
              <select name="store" value={form.store} onChange={handleChange} className="form-select mb-2">
                <option value="rice">Rice Store</option>
                <option value="grocery">Grocery Store</option>
              </select>
              <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-control mb-3" />
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success me-2">{editingId ? 'Update' : 'Add'}</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Cards */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {filteredProducts.map(product => (
          <div key={product._id} className="col">
            <div className="card h-100 shadow-sm border-0">
              {product.image?.data && (
                <img
                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                  alt={product.name}
                  className="card-img-top"
                />
              )}
              <div className="card-body d-flex flex-column">
                <div className="mt-auto">
                  <h6 className="card-title mb-2">{product.name}</h6>
                  <p className="price mb-1">₹{product.price}</p>
                </div>
                <p className="card-text text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                  {expandedId === product._id ? product.description : `${product.description.slice(0, 60)}... `}
                  {product.description.length > 60 && (
                    <button className="btn btn-link btn-sm p-0" onClick={() => setExpandedId(prev => prev === product._id ? null : product._id)}>
                      {expandedId === product._id ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </p>
              </div>
              <div className="card-footer bg-white border-0 d-flex justify-content-between">
                <button className="btn btn-outline-warning btn-sm" onClick={() => handleEdit(product)}>Edit</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTab;
