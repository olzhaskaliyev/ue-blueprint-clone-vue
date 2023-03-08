<script setup lang="ts">
	import { ref } from "vue";
	import { storeToRefs } from "pinia";
	import { useBlueprintStore } from "@/stores/blueprint";
	import type { INode } from "@/interfaces/blueprint";
	import NodeItem from "@/components/NodeItem.vue";

	const blueprintStore = useBlueprintStore();
	const { sceneNodes, draggedNewNode } = storeToRefs(blueprintStore);
	const draggedSceneNode = ref<INode | null>(null);
	const dragEntered = ref(false);
	let draggedSceneNodeCursorX: number, draggedSceneNodeCursorY: number;

	function dragStart(node: INode, e: DragEvent) {
		draggedSceneNode.value = node;
		draggedSceneNodeCursorX = e.offsetX;
		draggedSceneNodeCursorY = e.offsetY;
	}

	function dragEnter() {
		dragEntered.value = true;
	}

	function dragOver(e: DragEvent) {
		e.preventDefault();
	}

	function dragLeave() {
		dragEntered.value = false;
	}

	function drop(e: DragEvent) {
		e.preventDefault();

		dragEntered.value = false;

		if (draggedSceneNode.value) {
			draggedSceneNode.value.posX = e.offsetX - draggedSceneNodeCursorX;
			draggedSceneNode.value.posY = e.offsetY - draggedSceneNodeCursorY;
			draggedSceneNode.value = null;
		}

		if (draggedNewNode.value) {
			draggedNewNode.value.posX = e.offsetX;
			draggedNewNode.value.posY = e.offsetY;
			sceneNodes.value.push({ ...draggedNewNode.value });
		}
	}
</script>

<template>
	<div
		class="relative overflow-auto"
		@dragenter="dragEnter"
		@dragover="dragOver"
		@dragleave="dragLeave"
		@drop="drop"
	>
		<NodeItem
			v-for="node in sceneNodes"
			:key="node.title"
			:node="node"
			:style="{ left: node.posX + 'px', top: node.posY + 'px' }"
			:data-posX="node.posX"
			class="absolute cursor-grab"
			draggable="true"
			@dragstart="dragStart(node, $event)"
		/>
	</div>
</template>
