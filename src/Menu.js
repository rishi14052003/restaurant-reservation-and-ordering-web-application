import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingCart, Utensils, Coffee, Cake, Star } from 'lucide-react';
import './index.css';

const OrderSystem = ({ table, order, onOrderChange }) => {
  const menuCategories = {
    Starters: {
      icon: Utensils,
      color: 'orange',
      items: [
        { name: 'Paneer Chilli', price: 5, description: 'Spicy cottage cheese with bell peppers' },
        { name: 'Paneer Tikka', price: 3, description: 'Grilled cottage cheese cubes with spices' },
        { name: 'Veg 65', price: 4, description: 'Crispy fried vegetables with South Indian spices' },
        { name: 'Aloo Chilli', price: 7, description: 'Spicy potato cubes with onions' },
        { name: 'Masala Papad', price: 8, description: 'Crispy papad topped with spices and onions' },
      ]
    },
    MainCourse: {
      icon: Utensils,
      color: 'red',
      items: [
        { name: 'Paneer Butter Masala', price: 12, description: 'Cottage cheese in creamy tomato gravy' },
        { name: 'Paneer Tikka Masala', price: 14, description: 'Grilled cottage cheese in rich curry' },
        { name: 'Veg Kolhapuri', price: 15, description: 'Spicy mixed vegetables from Kolhapur' },
        { name: 'Veg Jaipuri', price: 10, description: 'Royal vegetable curry with rich gravy' },
        { name: 'Veg Handi', price: 11, description: 'Mixed vegetables cooked in traditional handi' },
      ]
    },
    Desserts: {
      icon: Cake,
      color: 'pink',
      items: [
        { name: 'Strawberry CheeseCake', price: 6, description: 'Fresh strawberry topped cheesecake' },
        { name: 'Biscoff Cheesecake', price: 4, description: 'Creamy cheesecake with biscoff crunch' },
        { name: 'Biscoff Doughnut', price: 5, description: 'Soft doughnut with biscoff glaze' },
        { name: 'Nutella Crepe', price: 7, description: 'Thin crepe filled with Nutella' },
        { name: 'BlueBerry Cheesecake', price: 8, description: 'Classic cheesecake with blueberry topping' },
      ]
    },
    Beverages: {
      icon: Coffee,
      color: 'blue',
      items: [
        { name: 'Soda', price: 2, description: 'Refreshing carbonated drink' },
        { name: 'Coke', price: 3, description: 'Classic Coca-Cola' },
        { name: 'Water', price: 5, description: 'Premium mineral water' },
        { name: 'Shake', price: 4, description: 'Thick milkshake with flavors' },
        { name: 'Coffee', price: 6, description: 'Freshly brewed coffee' },
      ]
    },
    Specials: {
      icon: Star,
      color: 'yellow',
      items: [
        { name: 'Brownie', price: 20, description: 'Warm chocolate brownie with ice cream' },
        { name: 'Pulao', price: 25, description: 'Fragrant rice with mixed vegetables' },
        { name: 'Dal Khichdi', price: 30, description: 'Comforting rice and lentil porridge' },
        { name: 'Garlic Bun', price: 22, description: 'Soft buns with garlic butter' },
        { name: 'Chaap', price: 28, description: 'Soy protein curry with spices' },
      ]
    },
  };

  const [openCategory, setOpenCategory] = useState(null);

  const handleAddToOrder = (item) => {
    onOrderChange([...order, item]);
  };

  const handleRemoveFromOrder = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    onOrderChange(newOrder);
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="card">
      <div className="card-title">Our Menu</div>
      <p className="card-subtitle">Explore our delicious offerings</p>
      {table && (
        <div style={{ marginTop: '12px', display: 'inline-block' }}>
          <span className="status-badge status-available">Serving Table {table.tableId}</span>
        </div>
      )}
      
      <div>
        {Object.entries(menuCategories).map(([category, data]) => {
          const Icon = data.icon;
          const isOpen = openCategory === category;
          
          return (
            <div key={category} className="menu-category">
              <button
                onClick={() => setOpenCategory(isOpen ? null : category)}
                className="menu-category-header"
              >
                <div className="menu-category-info">
                  <div className="menu-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="menu-category-title">{category}</h3>
                    <p className="menu-category-count">{data.items.length} delicious items</p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              
              {isOpen && (
                <div className="menu-items">
                  {data.items.map((item, index) => (
                    <div key={index} className="menu-item">
                      <div className="menu-item-info">
                        <h4>{item.name}</h4>
                        <p className="menu-item-description">{item.description}</p>
                        <p className="menu-item-price">${item.price}</p>
                      </div>
                      <button
                        onClick={() => handleAddToOrder(item)}
                        className="btn btn-secondary"
                      >
                        <Plus size={16} />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="order-summary">
        <div className="order-summary-header">
          <div className="order-summary-icon">
            <ShoppingCart size={20} />
          </div>
          <h3 className="order-summary-title">Order Summary</h3>
          {order.length > 0 && (
            <span className="status-badge status-available">{order.length} items</span>
          )}
        </div>
        
        {order.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <ShoppingCart size={32} />
            </div>
            <h3 className="empty-title">No Items in Order</h3>
            <p className="empty-description">Your order is empty. Add items from menu above.</p>
          </div>
        ) : (
          <div>
            {order.map((item, index) => (
              <div key={index} className="order-item">
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-price">${item.price}</div>
                <button
                  onClick={() => handleRemoveFromOrder(index)}
                  style={{ background: 'none', border: 'none', color: '#f56565', cursor: 'pointer', padding: '4px' }}
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
            <div className="order-total">
              <div className="order-total-label">Total:</div>
              <div className="order-total-amount">${calculateTotal()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSystem;

