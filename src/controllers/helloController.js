
const helloManager = require('../managers/helloManager');

const getHello = async (req, res) => {
  try {
    const message = await helloManager.getHelloMessage();
    res.send(message);
  } catch (error) {
    console.error('Error getting hello message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getHello,
};
