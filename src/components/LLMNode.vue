<template>
  <v-card
    class="mx-0"
    prepend-icon="mdi-memory"
    append-icon="mdi-open-in-new"
    width="300"
    title="LLM Engine"
  >
    <template v-slot:append>
      <v-icon color="primary">mdi-close-circle</v-icon>
    </template>
    <v-card-text class="pa-0 text-left">
      <div class="bg-light-blue-lighten-4 pl-4 py-2">
        Enter the model details
      </div>
      <div class="pa-3">
        <p class="pb-2">Model Name</p>
        <v-autocomplete
          v-model="modelName"
          clearable
          chips
          label="Select Model"
          variant="outlined"
          :items="[
            'gpt-4o-mini',
            'gpt-4',
            'gpt-4-turbo',
            'gpt-3.5-turbo',
            'gpt-3.5-turbo-instruct',
          ]"
        ></v-autocomplete>
        <p class="pb-2">OpenAI Key</p>
        <v-textarea
          v-model="key"
          placeholder="Type Something"
          row-height="25"
          rows="1"
          variant="outlined"
          auto-grow
          shaped
          clearable
        ></v-textarea>
        <p class="pb-2">Max tokens</p>
        <v-textarea
          type="number"
          v-model="tokens"
          placeholder="Type Something"
          row-height="25"
          rows="1"
          variant="outlined"
          auto-grow
          shaped
          clearable
        ></v-textarea>
        <p class="pb-2">Temperature</p>
        <input
          type="number"
          placeholder="Temperature"
          v-model="temperature"
          class="pa-4 border flex-1-1 w-100 number-input"
        />
      </div>
    </v-card-text>
  </v-card>

  <Handle type="target" :position="Position.Left" />
  <Handle type="source" :position="Position.Right" />
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Handle, Position, useVueFlow } from "@vue-flow/core";

const props = defineProps(["id", "data"]);

const { updateNodeData } = useVueFlow();

const modelName = computed({
  get: () => props.data.modelName,
  set: (newValue) => updateNodeData(props.id, { modelName: newValue }),
});
const key = computed({
  get: () => props.data.key,
  set: (newValue) => updateNodeData(props.id, { key: newValue }),
});
const tokens = computed({
  get: () => props.data.tokens,
  set: (newValue) => updateNodeData(props.id, { tokens: newValue }),
});
const temperature = computed({
  get: () => props.data.temperature,
  set: (newValue) => updateNodeData(props.id, { temperature: newValue }),
});
</script>
<style scoped>
.number-input {
  color: inherit;
  letter-spacing: 0.009375em;
  font-size: medium;
  color: rgb(103, 102, 102);
  font-family: "Roboto", sans-serif;
}
</style>
