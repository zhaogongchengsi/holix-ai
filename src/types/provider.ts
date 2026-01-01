export interface AIProvider {
	name: string;
	baseUrl: string;
	apiKey: string;
	models: string[];
	enabled: boolean;
}
