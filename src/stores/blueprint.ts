import { defineStore } from "pinia";
import { ref } from "vue";

import type { INode, ISceneNode } from "@/interfaces/blueprint";

export const useBlueprintStore = defineStore("blueprint", () => {
	const availableNodes = ref<INode[]>([
		{
			type: "number",
		},
		{
			type: "string",
		},
	]);

	const firstNodeId = self.crypto.randomUUID();
	const secondNodeId = self.crypto.randomUUID();

	const sceneNodes = ref<ISceneNode[]>([
		{
			id: firstNodeId,
			type: "number",
			x: 150,
			y: 150,
			out: secondNodeId,
		},
		{
			id: secondNodeId,
			type: "number",
			x: 350,
			y: 350,
			in: firstNodeId,
		},
	]);

	const draggedNewNode = ref<INode | null>(null);

	return { availableNodes, sceneNodes, draggedNewNode };
});
