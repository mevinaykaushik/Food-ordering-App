const mongoose = require('mongoose');
const uri = 'mongodb+srv://vinayfood:vinayfood@clusterfood.3luasme.mongodb.net/FoodApp?retryWrites=true&w=majority';

const connectAndFetchData = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');

    // Use async/await to fetch the entire "foodCategory" collection directly
    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    
    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;
    
    
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = connectAndFetchData;
