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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userManagementCRUD_1 = __importDefault(require("../userManagementCRUD"));
class userManagementRoutes {
    constructor(db) {
        // JWT middleware to authenticat token 
        this.const = function authenticateToken(req, res, next) {
            var _a;
            let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('')[1];
            if (!token) {
                return res.status(401).json({ message: `Tokem not authorised` });
            }
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: `Token not found` });
                }
                req.user = decoded;
                next();
            });
        };
        this.userManagement = new userManagementCRUD_1.default(db);
    }
    // register the user 
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let username = req.body;
                let password = req.body;
                //  Check if the input fields are not empty 
                if (!username || !password) {
                    res.status(400).json({ message: `Username and Password are required` });
                }
                // Check if username already exists in the dta base 
                let existingUser = yield this.userManagement.userLogin(username, password);
                if (existingUser) {
                    res.status(400).json({ message: `Username already registered, go to login` });
                }
                const hashPassword = yield bcrypt_1.default.hash(password, 10);
                let user = this.userManagement.userRegistration(username, hashPassword);
                res.status(201).json({ message: `Registration successful!` });
            }
            catch (error) {
                console.error(`Error registering user`, error);
                next(error);
            }
        });
    }
    // Route logic for the login endpoint 
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let username = req.body;
                let password = req.body;
                // login the user 
                let existingUser = yield this.userManagement.userLogin(username, password);
                if (!existingUser) {
                    res.status(400).json({ message: `Username not found, go to register` });
                }
                else {
                    //Check if password matches the users's password
                    let validatePassword = yield bcrypt_1.default.compare(password, existingUser.password);
                    if (!validatePassword) {
                        res.status(400).json({ message: `Password incorrect` });
                    }
                    // get a token for the user 
                    let token = jsonwebtoken_1.default.sign({ id: existingUser.id, username: existingUser.username, password: existingUser.password }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    res.status(201).json({ message: `Login successful!`, token });
                }
            }
            catch (error) {
                console.error(`Login failed`, error);
                next(error);
            }
        });
    }
    //  View the tasls by the logged in user
    viewTasksByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.user.id;
                //get the tasks by user 
                let tasks = yield this.userManagement.viewUserTasks(userId);
                if (tasks.length <= 0) {
                    return res.status(401).json({ message: `No tasks found` });
                }
                else {
                    return res.status(400).json({ message: `Taks found`, tasks });
                }
            }
            catch (error) {
                console.error(`Error fetching tasks`, error);
            }
        });
    }
}
exports.default = userManagementRoutes;
