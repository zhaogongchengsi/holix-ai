import { StartChatCommand } from "./chat";
import { SendMessage } from "./message";


export type Commands = StartChatCommand | SendMessage;

export type CommandBatch = Commands[];

export type CommandNames = Commands["name"];