"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var food_route_1 = __importDefault(require("./routes/food.route"));
var app = express_1.default();
typeorm_1.createConnection();
//middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(food_route_1.default);
app.set("port", process.env.PORT || 3001);
// app.listen(3001);
app.listen(process.env.PORT || 3001, function () {
    console.log("Server on port " + app.get("port"));
});
