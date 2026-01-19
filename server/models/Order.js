class Order {
  constructor() {
    this.orders = []; // In-memory storage (in production, use database)
    this.orderIdCounter = 1;
  }

  // Create a new order
  create(orderData) {
    const order = {
      id: this.orderIdCounter++,
      userId: orderData.userId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod,
      status: 'completed', // pending, processing, completed, cancelled
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.push(order);
    return order;
  }

  // Find orders by user ID
  findByUserId(userId) {
    return this.orders.filter(order => order.userId === userId);
  }

  // Find order by ID
  findById(id) {
    return this.orders.find(order => order.id === id);
  }

  // Get all orders (for admin purposes)
  findAll() {
    return this.orders;
  }

  // Update order status
  updateStatus(id, status) {
    const index = this.orders.findIndex(order => order.id === id);
    if (index !== -1) {
      this.orders[index] = {
        ...this.orders[index],
        status,
        updatedAt: new Date()
      };
      return this.orders[index];
    }
    return null;
  }

  // Delete order
  delete(id) {
    const index = this.orders.findIndex(order => order.id === id);
    if (index !== -1) {
      const deleted = this.orders[index];
      this.orders.splice(index, 1);
      return deleted;
    }
    return null;
  }

  // Get order count
  getCount() {
    return this.orders.length;
  }

  // Get orders by status
  findByStatus(status) {
    return this.orders.filter(order => order.status === status);
  }

  // Get orders by date range
  findByDateRange(startDate, endDate) {
    return this.orders.filter(order => 
      order.createdAt >= startDate && order.createdAt <= endDate
    );
  }

  // Get total revenue
  getTotalRevenue() {
    return this.orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.totalAmount, 0);
  }
}

module.exports = new Order();
