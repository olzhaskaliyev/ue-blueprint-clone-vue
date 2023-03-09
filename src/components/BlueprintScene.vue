<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { storeToRefs } from "pinia";
	import { useBlueprintStore } from "@/stores/blueprint";
	import type { ISceneNode } from "@/interfaces/blueprint";
	import NodeItem from "@/components/NodeItem.vue";

	const blueprintStore = useBlueprintStore();
	const { sceneNodes, draggedNewNode } = storeToRefs(blueprintStore);

	const draggedSceneNode = ref<ISceneNode | null>(null);

	let draggedSceneNodeCursorX: number, draggedSceneNodeCursorY: number;

	let canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null;

	onMounted(() => {
		canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

		if (canvas?.parentElement) {
			canvas.width = canvas.parentElement.offsetWidth - 1;
			canvas.height = canvas.parentElement.offsetHeight - 1;
		}

		if (canvas?.getContext) {
			ctx = canvas.getContext("2d");
			drawLines();
		}
	});

	function drawLines() {
		if (canvas && ctx) {
			ctx.beginPath();
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			sceneNodes.value.forEach((n) => {
				if (n.out) {
					const nodeElem = document.getElementById(n.id);
					const nodeElemToOut = document.getElementById(n.out);
					const nodeToOut = sceneNodes.value.find((sn) => n.out === sn.id);

					if (
						ctx &&
						n.x &&
						n.y &&
						nodeElem &&
						nodeToOut?.x &&
						nodeToOut?.y &&
						nodeElemToOut
					) {
						ctx.moveTo(
							n.x + nodeElem.offsetWidth,
							n.y + nodeElem.offsetHeight / 2
						);
						ctx.bezierCurveTo(
							n.x + nodeElem.offsetWidth + 80,
							n.y + nodeElem.offsetHeight / 2,
							nodeToOut.x - 80,
							nodeToOut.y + nodeElemToOut.offsetHeight / 2,
							nodeToOut.x,
							nodeToOut.y + nodeElemToOut.offsetHeight / 2
						);
						ctx.lineWidth = 1;
						ctx.strokeStyle = "#525252";
						ctx.stroke();
					}
				}
			});
		}
	}

	function dragStart(node: ISceneNode, e: DragEvent) {
		draggedSceneNode.value = node;
		draggedSceneNodeCursorX = e.offsetX;
		draggedSceneNodeCursorY = e.offsetY;
	}

	function dragOver(e: DragEvent) {
		e.preventDefault();
	}

	function drop(e: DragEvent) {
		e.preventDefault();

		if (draggedSceneNode.value) {
			draggedSceneNode.value.x = e.offsetX - draggedSceneNodeCursorX;
			draggedSceneNode.value.y = e.offsetY - draggedSceneNodeCursorY;
			draggedSceneNode.value = null;
		}

		if (draggedNewNode.value) {
			sceneNodes.value.push({
				...draggedNewNode.value,
				id: self.crypto.randomUUID(),
				x: e.offsetX,
				y: e.offsetY,
			});
		}

		drawLines();
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
		<!-- TODO: change to svg for interactivity -->
		<canvas id="canvas" ref="canvas" class="absolute"></canvas>

		<NodeItem
			v-for="node in sceneNodes"
			:key="node.id"
			:id="node.id"
			:node="node"
			:style="{ left: node.x + 'px', top: node.y + 'px' }"
			class="absolute cursor-grab"
			draggable="true"
			@dragstart="dragStart(node, $event)"
		/>
	</div>
</template>
