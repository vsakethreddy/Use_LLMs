<script lang="ts" setup>
import { ref } from "vue";
import type { Node, Edge } from "@vue-flow/core";

// @ts-ignore
import { Background } from "@vue-flow/background";
import { VueFlow } from "@vue-flow/core";
// @ts-ignore
import { MiniMap } from "@vue-flow/minimap";

const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);

// @ts-ignore
import useDragAndDrop from "../utilities/useDnD";

import { useVueFlow } from "@vue-flow/core";

const { onConnect, addEdges, getNodes } = useVueFlow();

const { onDragOver, onDrop, onDragLeave } = useDragAndDrop();

onConnect(addEdges);
</script>

<template>
  <v-layout class="rounded rounded-md">
    <TopNav />
    <LeftNav />
    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 100vh; --v-layout-left: 0px"
      @drop="onDrop"
    >
      <VueFlow
        class="math-flow"
        :nodes="nodes"
        :edges="edges"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        fit-view-on-init
        :default-viewport="{ zoom: 0.2 }"
        :min-zoom="0.2"
        :max-zoom="6"
      >
        <Background :size="2" pattern-color="#aaa" :gap="16" />
        <MiniMap />
        <div
          class="overlay d-flex align-center justify-center h-100 ml-16"
          v-if="getNodes.length === 0"
        >
          <img src="../../public/Frame 1000003288.png" alt="Drag and Drop" />
        </div>

        <template #node-input="props">
          <InputNode :id="props.id" :data="props.data" />
        </template>

        <template #node-llm="props">
          <LLMNode :id="props.id" :data="props.data" />
        </template>

        <template #node-output="props">
          <OutputNode :id="props.id" :data="props.data" />
        </template>
      </VueFlow>
    </v-main>
  </v-layout>
</template>

<style></style>
