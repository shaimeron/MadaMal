import initApp from "../app";
import { Express } from "express";
import {SocketIOController} from "../controllers"; // Import your DTO interfaces

let app: Express;
const message = 'Test message';

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
});

describe("SocketIO tests", () => {

});
