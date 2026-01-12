import React, { useState } from 'react';

const OrderSystem = ({ table, order, onOrderChange }) => {
  const menuCategories = {
    Starters: [
      { name: 'Paneer Chilli ', price: 5, description: ' Description: Item 1' },
      { name: 'Paneer Tikka ', price: 3, description: ' Description: Item 2' },
      { name: 'Veg 65 ', price: 4, description:  ' Description: Item 3' },
      { name: 'Aloo Chilli ', price: 7, description: ' Description: Item 4' },
      { name: 'Masala Papad ', price: 8, description: ' Description: Item 5' },
    ],
    MainCourse: [
      { name: 'Paneer Butter Masala ', price: 12, description: ' Description: Item 6' },
      { name: 'Paneer Tikka Masala ', price: 14, description: ' Description: Item 7' },
      { name: 'Veg Kolhapuri ', price: 15, description: ' Description: Item 8' },
      { name: 'Veg Jaipuri ', price: 10, description: ' Description: Item 9' },
      { name: 'Veg Handi ', price: 11, description:' Description: Item 10' },
    ],
    Desserts: [
      { name: 'Strawberry CheeseCake ', price: 6, description: ' Description: Item 11' },
      { name: 'Biscoff Cheesecake ', price: 4, description: ' Description: Item 12' },
      { name: 'Biscoff Doughnut ', price: 5, description: ' Description: Item 13' },
      { name: 'Nutella Crepe ', price: 7, description: ' Description: Item 14' },
      { name: 'BlueBerry Cheesecake ', price: 8, description: ' Description: Item 15' },
    ],
    Beverages: [
      { name: 'Soda ', price: 2, description: ' Description: Item 16' },
      { name: 'Coke ', price: 3, description: ' Description: Item 17' },
      { name: 'Water ', price: 5, description: ' Description: Item 18' },
      { name: 'Shake ', price: 4, description: ' Description: Item 19' },
      { name: 'Coffee ', price: 6, description: ' Description: Item 20' },
    ],
    Specials: [
      { name: 'Brownie ', price: 20, description: ' Description: Item 21' },
      { name: 'Pulao ', price: 25, description: ' Description: Item 22' },
      { name: 'Dal Khichdi ', price: 30, description: ' Description: Item 23' },
      { name: 'Garlic Bun ', price: 22, description: ' Description: Item 24' },
      { name: 'Chaap ', price: 28, description: ' Description: Item 25' },
    ],
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
    <div>
      <h2>Menu</h2>
      {Object.keys(menuCategories).map((category) => (
        <div key={category} style={{ marginBottom: '10px' }}>
          <button
            onClick={() => setOpenCategory(openCategory === category ? null : category)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#f3e48dff',
              border: '1px solid #110101ff',
              borderRadius: '5px',
              textAlign: 'left',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {category} {openCategory === category ? '-' : '+'}
          </button>

          {openCategory === category && (
            <ul style={{ marginTop: '5px', paddingLeft: '15px' }}>
              {menuCategories[category].map((item, index) => (
                <li key={index} style={{ margin: '5px 0' }}>
                  <div>
                    <strong>{item.name}</strong> <b>-</b> $<strong>{item.price}</strong>
                    <strong>{item.description}</strong>
                    <br />
                    <button onClick={() => handleAddToOrder(item)}>Add</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h3>Order Summary</h3>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => handleRemoveFromOrder(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: ${calculateTotal()}</strong></p>
    </div>
  );
};

export default OrderSystem;

