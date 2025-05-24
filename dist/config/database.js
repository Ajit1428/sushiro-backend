"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI ?? '';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('📦 Connected to MongoDB successfully');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});
process.on('SIGINT', async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    }
    catch (err) {
        console.error('Error during MongoDB disconnection:', err);
        process.exit(1);
    }
});
//# sourceMappingURL=database.js.map