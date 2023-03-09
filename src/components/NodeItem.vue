<script setup lang="ts">
	import type { ISceneNode } from "@/interfaces/blueprint";

	const props = defineProps<{
		node: ISceneNode;
	}>();
</script>

<template>
	<div
		class="rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-2 transition-shadow hover:shadow-md hover:shadow-neutral-700"
	>
		{{ props.node.type }}
	</div>
</template>
