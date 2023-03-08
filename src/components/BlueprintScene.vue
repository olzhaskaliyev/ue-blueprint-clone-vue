<script setup lang="ts">
	import { useBlueprintStore } from "@/stores/blueprint";
	import NodeItem from "@/components/NodeItem.vue";

	const { sceneNodes } = useBlueprintStore();
</script>

<template>
	<div class="relative">
		<NodeItem v-for="node in sceneNodes" :key="node.title" :node="node" />
	</div>
</template>
