import type { CreateChatEnvelope } from "./chat";
import type { WindowUpdateEnvelope } from "./system";

export type Update = CreateChatEnvelope | WindowUpdateEnvelope;

export type UpdateNames = Update["name"];