"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({ users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user)
        res.json({ user });
    else
        res.status(404).json({
            msg: `The user with id ${id} was not found`
        });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const emailExsts = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExsts)
            return res.status(400).json({
                msg: `The email ${body.email} has been taken`
            });
        //Create and save new model
        const user = yield user_1.default.create(body);
        // await user.save();
        return res.json({ user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error, please contact server admin"
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user)
            return res.status(400).json({
                msg: `The user with id ${id} was not found`
            });
        //Verify non duplicate emails      
        if (body.email) {
            const userFound = yield user_1.default.findOne({
                where: {
                    email: body.email
                }
            });
            if (userFound && (user.getDataValue('id') != userFound.getDataValue('id')))
                return res.status(400).json({
                    msg: `The email ${body.email} has been taken`
                });
        }
        //Update user
        yield user.update(body);
        return res.status(200).json({ user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error, please contact server admin"
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `The user with id ${id} was not found`
            });
        }
        //Phsycal elimination
        // await user.destroy();
        //Logical elimination
        yield user.update({ status: false });
        return res.status(200).json({
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error, please contact server admin"
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map