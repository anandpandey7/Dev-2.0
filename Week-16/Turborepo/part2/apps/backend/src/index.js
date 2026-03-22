"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', function (req, res) {
    try {
        res.status(200).json({
            success: "true",
            message: "hello from express"
        });
    }
    catch (err) {
        res.status(500).json({
            success: "false",
            message: "Internal server error"
        });
    }
});
app.listen(3003, function () {
    console.log("Server is running ✅");
});
