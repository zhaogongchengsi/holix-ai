import type { CreateChatEnvelope } from "./chat";
import type { WindowUpdateEnvelope } from "./system";
import type { ChatUpdateEnvelope } from "./message";

export type Update = CreateChatEnvelope | WindowUpdateEnvelope | ChatUpdateEnvelope;

export type UpdateNames = Update["name"];