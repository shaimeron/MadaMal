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
test("Test createMessage", async () => {
     const socketIOController = new SocketIOController();
     socketIOController.newMessage({message, userId: "123"}).then((response) => {
            expect(response.message).toEqual(message);
     });
});

test("Test chatHistory", async () => {
     const socketIOController = new SocketIOController();
     socketIOController.getChetHistory().then((response) => {
            expect(response[0].message).toEqual(message);
     });
});
});
