import Orders from '../../models/Orders';
import User from '../../models/User';
import checkAuth from '../../utils/checkAuth';
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    async getOrders() {
      try {
        const orders = await Orders.find({});
        return orders;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getOrder(_, { orderId }) {
      try {
        const order = await Orders.findById(orderId);
        if (order) return order;
        else throw new Error('Order Not Found');
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addOrder(
      _,
      {
        orderInput: {
          orderName,
          orderCategory,
          orderGeneratedBy,
          orderItems,
          points,
        },
      },
      context,
      info,
    ) {
      const user = await User.findOne({ orderGeneratedBy });
      const authUser = checkAuth(context);
      if (!authUser) {
        throw new AuthenticationError(
          'You are not authorized to make this order',
        );
      }
    },
  },
};
