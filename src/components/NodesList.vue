<script setup lang="ts">
	import { useBlueprintStore } from "@/stores/blueprint";
	import type { INode } from "@/interfaces/blueprint";

	const blueprintStore = useBlueprintStore();

	function dragStart(node: INode) {
		blueprintStore.draggedNewNode = node;
	}

	function dragEnd() {
		blueprintStore.draggedNewNode = null;
	}
</script>

<template>
	<ul class="flex flex-col gap-4 p-4">
		<li
			v-for="node in blueprintStore.availableNodes"
			:key="node.title"
			class="cursor-grab rounded-lg border border-neutral-600 px-4 py-2"
			draggable="true"
			@dragstart="dragStart(node)"
			@dragend="dragEnd"
		>
			{{ node.title }}
		</li>
	</ul>
</template>
