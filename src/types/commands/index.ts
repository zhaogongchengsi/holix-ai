import { ChatCommands } from "./chat";
import { SendMessage } from "./message";

export type Commands = ChatCommands | SendMessage;

export type CommandBatch = Commands[];

export type CommandNames = Commands["name"];