<script setup lang="ts">
	import NodesList from "@/components/NodesList.vue";
	import BlueprintScene from "@/components/BlueprintScene.vue";
</script>

<template>
	<div class="flex bg-neutral-900 text-neutral-100">
		<aside class="w-80 bg-neutral-800">
			<NodesList />
		</aside>

		<BlueprintScene class="h-screen flex-grow" />
	</div>
</template>
