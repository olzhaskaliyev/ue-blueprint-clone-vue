import { defineStore } from "pinia";
import { ref } from "vue";

import type { INode } from "@/interfaces/blueprint";

export const useBlueprintStore = defineStore("blueprint", () => {
	const availableNodes = ref<INode[]>([
		{
			title: "Number",
		},
		{
			title: "String",
		},
	]);

	const sceneNodes = ref<INode[]>([
		{
			title: "Number",
			posX: 250,
			posY: 250,
		},
	]);

	const draggedNewNode = ref<INode | null>(null);

	return { availableNodes, sceneNodes, draggedNewNode };
});
