"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var food_controller_1 = require("../controllers/food.controller");
router.get('/', function (req, res) {
    res.send('Hola');
});
router.get('/foods', food_controller_1.getFoods);
router.get('/foods/:id', food_controller_1.getFood);
router.post('/foods', food_controller_1.createFood);
router.put('/foods/:id', food_controller_1.updateFood);
router.delete('/Foods/:id', food_controller_1.deleteFood);
exports.default = router;
