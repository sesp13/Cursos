"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = express_1.Router();
router.get('/', userController_1.getUsers);
router.get('/:id', userController_1.getUser);
router.post('/', userController_1.postUser);
router.put('/:id', userController_1.putUser);
router.delete('/:id', userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map