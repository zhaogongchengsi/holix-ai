import type { Chat } from "@/node/database/schema/chat";
import type { EventEnvelope } from "./base";

export type CreateChatEnvelope = EventEnvelope<"chat.create", Chat>;
