import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { createHighlighter, createOnigurumaEngine } from "shiki";


export const shiki = await createHighlighter({
	themes: ["github-dark", "github-light"],
	langs: [
		"ts",
		"tsx",
		"js",
		"json",
		"bash",
		"go",
		"rust",
		"python",
		"java",
		"css",
		"html",
		"markdown",
	],
	engine: createOnigurumaEngine(() => import('shiki/wasm'))

});


export const rehypeShiki = [
	rehypeShikiFromHighlighter,
	shiki,
	{
		themes: {
			light: "github-light",
			dark: "github-dark",
		},
	}
] as const;