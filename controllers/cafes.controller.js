const Cafe = require('../models/cafe.model');
const Dish = require('../models/dish.model');

module.exports = {
  getCafes: async (req, res) => {
    try {
      const cafes = await Cafe.find({});
      res.status(200).json(cafes);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },

  newCafe: async (req, res) => {
    try {
      const newCafe = new Cafe(req.body);
      const cafe = await newCafe.save();
      res.status(201).json('New cafe added');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },

  getCafe: async (req, res) => {
    try {
      const { cafeId } = req.params;
      const cafe = await Cafe.findById(cafeId);
      res.status(200).json(cafe);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },

  replaceCafe: async (req, res) => {
    try {
      const { cafeId } = req.params;
      const newCafe = req.body;
      const result = await Cafe.findByIdAndUpdate(cafeId, newCafe);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },

  getCafeDishes: async (req, res) => {
    try {
      const { cafeId } = req.params;
      const cafe = await Cafe.findById(cafeId).populate('dishes');
      res.status(200).json(cafe.dishes);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },

  newCafeDish: async (req, res) => {
    try {
      const { cafeId } = req.params;
      const newDish = new Dish(req.body);
      const cafe = await Cafe.findById(cafeId);
      //assign dish relevant to cafe
      newDish.cafes.push(cafe);
      await newDish.save();
      //assign cafe relevant to dish
      cafe.dishes.push(newDish);
      await cafe.save();
      res.status(201).json('New dish created', newDish);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },

  getDish: async (req, res) => {
    try {
      const { dishId } = req.params;
      const dish = await Dish.findById(dishId).populate('cafes');
      res.status(200).json(dish);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },
};
