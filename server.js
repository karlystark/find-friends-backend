const express = require('express');
const cors = require('cors');
const connectDB = require('./db_connection');
const Friend = require('./models/Friend');

const app = express();
const port = process.env.PORT || 4001;

connectDB();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

// API endpoints
app.get('/api/friends', async (req, res) => {
  try {
    const friends = await Friend.find();
    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/friends', async (req, res) => {
    try {
      const newFriend = new Friend(req.body);
      const savedFriend = await newFriend.save();
      res.status(201).json(savedFriend);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.get('/api/friends/:id', async (req, res) => {
    try {
      const friend = await Friend.findById(req.params.id);
      if(!friend){
        return res.status(404).json({message: "Friend not found"});
      }
      res.json(friend);
    } catch(error){
      console.error("Error fetching friend:", error);
      res.status(500).json({message: 'Server Error'});
    }
  })

  app.patch('/api/friends/:id', async (req, res) => {
    try {
      const friend = await Friend.findById(req.params.id);
      console.log("friend=", friend);
      const updates = req.body;

      if(!friend){
        return res.status(404).json({ message: "Friend not found"});
      }

      if(updates.locations){
        friend.locations = [...friend.locations, ...updates.locations];
      }

      Object.assign(friend, updates);

      const updatedFriend = await friend.save();

      res.json(updatedFriend);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.delete('/api/friends/:id', async (req, res) => {
    try {
      await Friend.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
