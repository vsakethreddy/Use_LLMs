<template>
  <v-navigation-drawer
    class="ma-4 border-sm rounded-xl"
    style="height: calc(100% - 95px); width: auto"
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item title="Components" class="text-h6 text-center" nav>
      <template v-slot:append>
        <v-btn
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          @click.stop="rail = !rail"
        >
        </v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <v-list density="compact">
      <div
        :draggable="true"
        @dragstart="onDragStart($event, 'input')"
        class="border-md mx-3 my-2"
      >
        <v-tooltip>
          <template #activator="{ props }">
            <v-icon v-bind="props" class="ml-3 py-4">mdi-import</v-icon>
            <span class="mx-5">Input</span>
          </template>
          <span>Input Component</span>
        </v-tooltip>
      </div>
      <div
        :draggable="true"
        @dragstart="onDragStart($event, 'llm')"
        class="border-md mx-3 my-2"
      >
        <v-tooltip>
          <template #activator="{ props }">
            <v-icon v-bind="props" class="ml-3 py-4">mdi-memory</v-icon>
            <span class="mx-5">LLM Engine</span>
          </template>
          <span>LLM Engine Component</span>
        </v-tooltip>
      </div>
      <div
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        class="border-md mx-3 my-2"
      >
        <v-tooltip>
          <template #activator="{ props }">
            <v-icon class="mdi-rotate-180 ml-3 py-4" v-bind="props"
              >mdi-import</v-icon
            >
            <span class="mx-5">Output</span>
          </template>
          <span>Output Component</span>
        </v-tooltip>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import useDragAndDrop from "../utilities/useDnD";

const { onDragStart } = useDragAndDrop();
const rail = ref(false);
const drawer = ref(true);
</script>
