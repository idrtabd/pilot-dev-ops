import { useState, useEffect } from 'react'
import './App.css'

interface Item {
  id: number;
  name: string;
  description?: string;
  priority: string;
  createdAt: string;
}

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHealth();
    fetchItems();
  }, []);

  const fetchHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      setHealth(data);
    } catch (error) {
      console.error('Failed to fetch health status:', error);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItemName, priority: 'medium' }),
      });
      
      if (response.ok) {
        setNewItemName('');
        fetchItems();
      }
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  return (
    <>
      <h1>DevOps Pilot Application</h1>
      
      <div className="health-status">
        <h2>System Health</h2>
        {health ? (
          <div>
            <p>Status: <span className={`status ${health.status}`}>{health.status}</span></p>
            <p>Uptime: {Math.floor(health.uptime / 60)} minutes</p>
          </div>
        ) : (
          <p>Loading health status...</p>
        )}
      </div>

      <div className="card">
        <h2>Items Management</h2>
        
        <form onSubmit={createItem} className="item-form">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter item name"
          />
          <button type="submit">Add Item</button>
        </form>

        {loading ? (
          <p>Loading items...</p>
        ) : (
          <ul className="items-list">
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                <span className={`priority ${item.priority}`}>{item.priority}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
