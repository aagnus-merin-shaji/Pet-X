import React from 'react';

const Wishlist = () => {
  // Sample wishlist data
  const wishlistItems = [
    { id: 1, name: 'Product 1', price: '$29.99' },
    { id: 2, name: 'Product 2', price: '$49.99' },
    { id: 3, name: 'Product 3', price: '$19.99' },
  ];

  return (
    <div style={styles.wishlistContainer}>
      <h1 style={styles.heading}>My Wishlist</h1>
      <ul style={styles.list}>
        {wishlistItems.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemPrice}>{item.price}</span>
            <button style={styles.removeButton}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// CSS styles
const styles = {
  wishlistContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  itemName: {
    fontSize: '16px',
    color: '#555',
  },
  itemPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Wishlist;