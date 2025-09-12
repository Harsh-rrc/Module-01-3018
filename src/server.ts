import express from 'express';

const app = express();
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

export default app;