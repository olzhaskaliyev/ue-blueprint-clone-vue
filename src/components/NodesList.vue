<script setup lang="ts">
	import { useBlueprintStore } from "@/stores/blueprint";

	const { availableNodes } = useBlueprintStore();
</script>

<template>
	<ul class="flex-col gap-2 p-4">
		<li
			v-for="node in availableNodes"
			:key="node.title"
			class="cursor-grab rounded-lg border border-neutral-600 px-4 py-2"
			draggable="true"
		>
			{{ node.title }}
		</li>
	</ul>
</template>
