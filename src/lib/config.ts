import type { ConfigData } from "@/node/platform/config";
import { kyInstance } from "./ky";


export async function getConfig() {
	return await kyInstance.get('config').json<ConfigData>()
}