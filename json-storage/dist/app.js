"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.collections = exports.connectToDatabase = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoDB = __importStar(require("mongodb"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use("/", routes_1.router);
const port = process.env.PORT;
function connectToDatabase() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const url = (_a = process.env.DB_CONN_STRING) !== null && _a !== void 0 ? _a : 'url default';
        const client = new mongoDB.MongoClient(url);
        yield client.connect();
        const db = client.db(process.env.DB_NAME);
        const dataCollection = db.collection((_b = process.env.DATA_COLLECTION_NAME) !== null && _b !== void 0 ? _b : 'data default');
        exports.collections.data = dataCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${dataCollection.collectionName}`);
    });
}
exports.connectToDatabase = connectToDatabase;
connectToDatabase();
exports.collections = {};
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
