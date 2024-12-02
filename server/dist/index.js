"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserManagementRoutes_1 = __importDefault(require("./Service/Routes/UserManagementRoutes"));
const db_1 = __importDefault(require("./db"));
//setting up express
const app = (0, express_1.default)();
const PORT = 3010;
// UserManagement endpoints 
const userRoutes = new UserManagementRoutes_1.default(db_1.default);
app.post('/register', userRoutes.registerUser);
app.post('login', userRoutes.loginUser);
app.get('/tasks/user', userRoutes.viewTasksByUser);
//Middleware 
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Endpoints 
app.listen(PORT, () => {
    console.log(`app started on ${PORT}!`);
});
