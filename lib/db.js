"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serverless_1 = require("@neondatabase/serverless");
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}
var sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
exports.default = sql;
