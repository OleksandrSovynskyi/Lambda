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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("./app");
exports.router = express_1.default.Router();
exports.router.use(express_1.default.json());
exports.router.get("/[a-zA-Z0-9]+", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const url = req.url;
        const urlSplit = url.split("");
        urlSplit.shift();
        const route = urlSplit.join('');
        const findResult = (yield ((_a = app_1.collections === null || app_1.collections === void 0 ? void 0 : app_1.collections.data) === null || _a === void 0 ? void 0 : _a.find({ route: route }).toArray()));
        const result = findResult === null || findResult === void 0 ? void 0 : findResult.map(el => {
            return el.data;
        });
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.router.post('/[a-zA-Z0-9]+', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const url = req.url;
        const urlSplit = url.split("");
        urlSplit.shift();
        const route = urlSplit.join('');
        const newData = { route: route, data: req.body };
        const result = yield ((_b = app_1.collections === null || app_1.collections === void 0 ? void 0 : app_1.collections.data) === null || _b === void 0 ? void 0 : _b.insertOne(newData));
        result
            ? res.status(201).send(`Successfully created a new dataItem with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new dataItem.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
