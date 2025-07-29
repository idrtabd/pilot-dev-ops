import { useState, useEffect } from 'react'
import { DataGrid, Column, Editing, Paging, FilterRow } from 'devextreme-react/data-grid'
import { Button } from 'devextreme-react/button'
import { TextBox } from 'devextreme-react/text-box'
import notify from 'devextreme/ui/notify'
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
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const createItem = async () => {
    if (!newItemName.trim()) {
      notify('Please enter an item name', 'warning', 2000);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItemName, priority: 'medium' }),
      });
      
      if (response.ok) {
        setNewItemName('');
        fetchItems();
        notify('Item created successfully!', 'success', 2000);
      }
    } catch (error) {
      console.error('Failed to create item:', error);
      notify('Failed to create item', 'error', 2000);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchItems();
        notify('Item deleted successfully!', 'success', 2000);
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      notify('Failed to delete item', 'error', 2000);
    }
  };

  return (
    <div className="app-container">
      <h1>DevOps Pilot Application</h1>
      
      <div className="health-status dx-card">
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

      <div className="dx-card">
        <h2>Items Management</h2>
        
        <div className="item-form dx-fieldset">
          <div className="dx-field">
            <div className="dx-field-label">New Item:</div>
            <div className="dx-field-value">
              <TextBox
                value={newItemName}
                onValueChanged={(e) => setNewItemName(e.value)}
                placeholder="Enter item name"
                width="300px"
              />
            </div>
          </div>
          <Button
            text="Add Item"
            type="success"
            icon="add"
            onClick={createItem}
          />
        </div>

        <DataGrid
          dataSource={items}
          showBorders={true}
          showRowLines={true}
          rowAlternationEnabled={true}
          columnAutoWidth={true}
        >
          <Paging defaultPageSize={10} />
          <FilterRow visible={true} />
          <Editing
            mode="row"
            allowDeleting={true}
            confirmDelete={true}
          />
          
          <Column dataField="id" caption="ID" width={70} />
          <Column dataField="name" caption="Name" />
          <Column 
            dataField="priority" 
            caption="Priority"
            cellRender={(data) => (
              <span className={`priority ${data.value}`}>{data.value}</span>
            )}
          />
          <Column
            type="buttons"
            width={110}
            buttons={[{
              name: 'delete',
              icon: 'trash',
              onClick: (e) => e.row && deleteItem(e.row.data.id)
            }]}
          />
        </DataGrid>
      </div>
    </div>
  )
}

export default App
