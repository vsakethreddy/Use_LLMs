<template>
  <v-card class="mx-0" width="300" title="Output">
    <template v-slot:prepend>
      <v-icon color="primary" class="mdi-rotate-180">mdi-import</v-icon>
    </template>
    <template v-slot:append>
      <v-icon color="primary">mdi-close-circle</v-icon>
    </template>
    <v-card-text class="pa-0 text-left">
      <div class="bg-light-blue-lighten-4 pl-4 py-2">
        Click on run button to get Output
      </div>
      <div class="pa-3">
        <p class="pb-2">Output</p>
        <v-textarea
          v-model="appStore.outputData"
          placeholder="Output Response"
          row-height="25"
          rows="1"
          variant="outlined"
          auto-grow
          shaped
          :readonly="true"
        ></v-textarea>
      </div>
    </v-card-text>
  </v-card>
  <Handle type="target" :position="Position.Left" />
</template>
<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";

import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();
</script>
<style>
.vue-flow__node-output,
.vue-flow__node-output.selected {
  border: none;
  padding: 0;
}
</style>
