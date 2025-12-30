import { Command } from "./base";

export type SendMessage = Command<"message.send", {
	content: string;
}>;