<script setup lang="ts">
	import type { Node } from "@/interfaces/blueprint";

	const props = defineProps<{
		node: Node;
	}>();
</script>

<template>
	<div
		class="absolute cursor-grab rounded-lg border border-neutral-600 px-4 py-2"
		draggable="true"
	>
		{{ props.node.title }}
	</div>
</template>
