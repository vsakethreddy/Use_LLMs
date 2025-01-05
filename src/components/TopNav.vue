<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-img
        class="ml-8"
        src="../../public/Frame 1000003403.png"
        height="100"
        width="100"
        alt="Navigation Image"
      ></v-img>
    </template>
    <v-btn
      class="bg-grey-darken-4 mr-2 rounded-lg"
      @click="deploy"
      :disabled="appStore.disabled.deploy"
    >
      {{ isDeployed ? "Undeploy" : "Deploy" }}
    </v-btn>
    <v-btn
      prepend-icon="mdi-play-circle-outline"
      class="bg-green-darken-3 rounded-lg"
      @click="RunLLM"
      :disabled="appStore.disabled.run"
    >
      Run
    </v-btn>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useVueFlow } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";

import fetchData from "@/utilities/callEndPoints";
import { useAppStore } from "@/stores/appStore";

const { getNodes } = useVueFlow();
const vueFlow = useVueFlow();

const appStore = useAppStore();

const LLMDetails = {
  API_KEY: "",
  modelName: "",
  temperature: 0,
  max_tokens: 0,
};

const isDeployed = ref(false);

// Function to get connected nodes
const getPreviousConnectedNodes = (
  nodeId: string | Node<any, any, string>,
  type: string
) => {
  // Ensure nodeId is passed as a string to getConnectedEdges
  const nodeIdAsString = typeof nodeId === "string" ? nodeId : nodeId.id;

  // Get all edges connected to the specified node
  const edges = vueFlow.getConnectedEdges(nodeIdAsString);
  if (edges.length === 0) return;
  return edges.find((item) => {
    return item.sourceNode.type === type;
  })?.sourceNode;
};

const RunLLM = async () => {
  const OutputNode = getNodes.value.find((item) => {
    return item.type === "output";
  });
  if (OutputNode === undefined) {
    console.log("No Output Nodes");
    return;
  }

  let LLMNode, InputNode;
  if (OutputNode !== undefined) {
    LLMNode = getPreviousConnectedNodes(OutputNode?.id, "llm");
    if (LLMNode === undefined) {
      console.log("No LLM Nodes or LLM Nodes not connected to Output");
      return;
    }
    if (LLMNode !== undefined) {
      InputNode = getPreviousConnectedNodes(LLMNode?.id, "input");
      if (InputNode === undefined) {
        console.log("No InputNode or Input Node Not connected to LLM");
        return;
      }
    }
  }

  LLMDetails.modelName = LLMNode?.data.modelName;
  LLMDetails.API_KEY = LLMNode?.data.key;
  const content = InputNode?.data.value;
  LLMDetails.temperature = Number(LLMNode?.data.temperature);
  LLMDetails.max_tokens = Number(LLMNode?.data.tokens);

  await fetchData(
    LLMDetails.API_KEY,
    LLMDetails.modelName,
    content,
    LLMDetails.max_tokens,
    LLMDetails.temperature
  );
  appStore.disabled.deploy = false;
};

const deploy = () => {
  if (isDeployed.value === true) {
    isDeployed.value = !isDeployed.value;
    appStore.disabled.run = false;
    return;
  }
  appStore.disabled.run = true;

  const newRoute = `/model?API_KEY=${LLMDetails.API_KEY}&modelName=${LLMDetails.modelName}&max_tokens=${LLMDetails.max_tokens}&temperature=${LLMDetails.temperature}`;

  // Open the route in a new tab
  window.open(newRoute, "_blank");
  isDeployed.value = !isDeployed.value;
};
</script>
