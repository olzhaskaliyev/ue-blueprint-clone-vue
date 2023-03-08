import { defineStore } from "pinia";
import { ref } from "vue";

import type { Node } from "@/interfaces/blueprint";

export const useBlueprintStore = defineStore("blueprint", () => {
	const availableNodes = ref<Node[]>([
		{
			title: "Number",
		},
	]);

	const sceneNodes = ref<Node[]>([
		{
			title: "Number",
		},
	]);

	return { availableNodes, sceneNodes };
});
