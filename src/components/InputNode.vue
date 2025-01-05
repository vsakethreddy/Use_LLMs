<template>
  <v-card
    class="mx-0"
    prepend-icon="mdi-import"
    append-icon="mdi-open-in-new"
    width="300"
    title="Input"
  >
    <template v-slot:append>
      <v-icon color="primary">mdi-close-circle</v-icon>
    </template>
    <v-card-text class="pa-0 text-left">
      <div class="bg-light-blue-lighten-4 pl-4 py-2">
        Write the input/ question you want to ask
      </div>
      <div class="pa-3">
        <p class="pb-2">Input</p>
        <v-textarea
          v-model="value"
          placeholder="Type Something.."
          row-height="25"
          rows="1"
          variant="outlined"
          auto-grow
          shaped
          clearable
        ></v-textarea>
      </div>
    </v-card-text>
  </v-card>
  <Handle type="source" :position="Position.Right" />
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Handle, Position, useVueFlow } from "@vue-flow/core";

const props = defineProps(["id", "data"]);

const { updateNodeData } = useVueFlow();

const value = computed({
  get: () => props.data.value,
  set: (newValue) => updateNodeData(props.id, { value: newValue }),
});
</script>

<style>
.vue-flow__node-input,
.vue-flow__node-input.selected {
  border: none !important;
  padding: 0 !important;
}
.vue-flow__node {
  width: auto;
}
.v-card-item__content {
  text-align: start;
  padding-left: 3px;
}
.text-primary {
  color: black !important;
}
</style>
