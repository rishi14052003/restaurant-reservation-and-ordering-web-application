import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingCart, Utensils, Coffee, Cake, Star } from 'lucide-react';
import '../../index.css';

const OrderSystem = ({ table, order, onOrderChange }) => {
  const menuCategories = {
    Starters: {
      icon: Utensils,
      color: 'orange',
      items: [
        { name: 'Paneer Chilli', price: 180, description: 'Spicy cottage cheese with bell peppers' },
        { name: 'Paneer Tikka', price: 220, description: 'Grilled cottage cheese cubes with spices' },
        { name: 'Veg 65', price: 160, description: 'Crispy fried vegetables with South Indian spices' },
        { name: 'Aloo Chilli', price: 140, description: 'Spicy potato cubes with onions' },
        { name: 'Masala Papad', price: 80, description: 'Crispy papad topped with spices and onions' },
      ]
    },
    MainCourse: {
      icon: Utensils,
      color: 'red',
      items: [
        { name: 'Paneer Butter Masala', price: 280, description: 'Cottage cheese in creamy tomato gravy' },
        { name: 'Paneer Tikka Masala', price: 320, description: 'Grilled cottage cheese in rich curry' },
        { name: 'Veg Kolhapuri', price: 350, description: 'Spicy mixed vegetables from Kolhapur' },
        { name: 'Veg Jaipuri', price: 380, description: 'Royal vegetable curry with rich gravy' },
        { name: 'Veg Handi', price: 340, description: 'Mixed vegetables cooked in traditional handi' },
      ]
    },
    Desserts: {
      icon: Cake,
      color: 'pink',
      items: [
        { name: 'Strawberry CheeseCake', price: 180, description: 'Fresh strawberry topped cheesecake' },
        { name: 'Biscoff Cheesecake', price: 200, description: 'Creamy cheesecake with biscoff crunch' },
        { name: 'Biscoff Doughnut', price: 120, description: 'Soft doughnut with biscoff glaze' },
        { name: 'Nutella Crepe', price: 160, description: 'Thin crepe filled with Nutella' },
        { name: 'BlueBerry Cheesecake', price: 220, description: 'Classic cheesecake with blueberry topping' },
      ]
    },
    Beverages: {
      icon: Coffee,
      color: 'blue',
      items: [
        { name: 'Soda', price: 60, description: 'Refreshing carbonated drink' },
        { name: 'Coke', price: 80, description: 'Classic Coca-Cola' },
        { name: 'Water', price: 40, description: 'Premium mineral water' },
        { name: 'Shake', price: 150, description: 'Thick milkshake with flavors' },
        { name: 'Coffee', price: 120, description: 'Freshly brewed coffee' },
      ]
    },
    Specials: {
      icon: Star,
      color: 'yellow',
      items: [
        { name: 'Brownie', price: 180, description: 'Warm chocolate brownie with ice cream' },
        { name: 'Pulao', price: 220, description: 'Fragrant rice with mixed vegetables' },
        { name: 'Dal Khichdi', price: 200, description: 'Comforting rice and lentil porridge' },
        { name: 'Garlic Bun', price: 80, description: 'Soft buns with garlic butter' },
      ]
    },
  };

  const [openCategory, setOpenCategory] = useState(null);

  const handleAddToOrder = (item) => {
    const existingItemIndex = order.findIndex(orderItem => orderItem.name === item.name);
    if (existingItemIndex !== -1) {
      // Item already exists, increase quantity
      const newOrder = [...order];
      newOrder[existingItemIndex] = { ...newOrder[existingItemIndex], quantity: (newOrder[existingItemIndex].quantity || 1) + 1 };
      onOrderChange(newOrder);
    } else {
      // New item, add with quantity 1
      onOrderChange([...order, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromOrder = (index) => {
    const newOrder = [...order];
    if (newOrder[index].quantity > 1) {
      // Decrease quantity
      newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity - 1 };
    } else {
      // Remove item completely
      newOrder.splice(index, 1);
    }
    onOrderChange(newOrder);
  };

  const handleIncreaseQuantity = (index) => {
    const newOrder = [...order];
    newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity + 1 };
    onOrderChange(newOrder);
  };

  const handleDecreaseQuantity = (index) => {
    const newOrder = [...order];
    if (newOrder[index].quantity > 1) {
      newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity - 1 };
      onOrderChange(newOrder);
    }
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
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
                        <div className="menu-item-header">
                          <h4>{item.name}</h4>
                          <p className="menu-item-price">₹{item.price}</p>
                        </div>
                        <p className="menu-item-description">{item.description}</p>
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
                <div className="order-item-info">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-details">
                    <span className="order-item-price">₹{item.price} x {item.quantity || 1}</span>
                    <span className="order-item-subtotal">₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                </div>
                <div className="order-item-controls">
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    className="quantity-btn quantity-decrease"
                    disabled={(item.quantity || 1) <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-display">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    className="quantity-btn quantity-increase"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="order-total">
              <div className="order-total-label">Total:</div>
              <div className="order-total-amount">₹{calculateTotal()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSystem;

