<script setup lang="ts">
	import type { INode } from "@/interfaces/blueprint";

	const props = defineProps<{
		node: INode;
	}>();
</script>

<template>
	<div class="rounded-lg border border-neutral-600 px-4 py-2">
		{{ props.node.title }}
	</div>
</template>
