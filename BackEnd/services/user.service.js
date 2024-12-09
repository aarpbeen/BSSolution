"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
// get user by id
const getUserById = async (userId, res) => {
    const user = await user_model_1.default.findById(userId);
    if (user) {
        res.status(201).json({
            success: true,
            user,
        });
    }
};
exports.getUserById = getUserById;
