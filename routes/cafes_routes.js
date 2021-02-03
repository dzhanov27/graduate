const router = require('express').Router();

const CafesController = require('../controllers/cafes.controller');

/*
for verify token on route use
.get(verify function, controller function)
*/

router.route('/').get(CafesController.getCafes).post(CafesController.newCafe);

router
  .route('/:cafeId')
  .get(CafesController.getCafe)
  .put(CafesController.replaceCafe);

router
  .route('/:cafeId/dishes')
  .get(CafesController.getCafeDishes)
  .post(CafesController.newCafeDish);

router.route('/:cafeId/dishes/:dishId').get(CafesController.getDish);

module.exports = router;
