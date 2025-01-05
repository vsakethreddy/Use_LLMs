<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer class="position-fixed">
      <v-list>
        <v-list-item nav>
          <div class="d-flex justify-center mx-3">
            <v-img
              src="../../public/Frame 1000003403.png"
              height="45"
              width="100"
              alt="Navigation Image"
            ></v-img>
          </div>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="1" class="position-fixed">
      <div class="d-flex align-center">
        <img class="mx-auto" src="../../public/Title&Badge.png" alt="" />
        <b class="ml-2">AI Assistant</b>
      </div>
    </v-app-bar>
    <v-main class="d-flex flex-column">
      <!-- Virtual Scroll -->
      <v-virtual-scroll
        class="ml-10 mt-4"
        :items="scrollItems"
        style="max-height: calc(100vh - 170px)"
        :key="scrollItems.length"
        ref="virtualScroll"
      >
        <template v-slot:default="{ item, index }">
          <div :key="index">
            <!-- Render the message or card as usual for all items -->
            <div v-if="item.message" class="ma-3">
              <v-icon class="mdi-rotate-90">mdi-navigation</v-icon>
              {{ item.message }}
            </div>

            <!-- Only execute dynamic content rendering for the last item -->
            <v-card
              class="pa-2 rounded-xl"
              variant="tonal"
              v-else
              :key="item.outputData"
            >
              <div class="d-flex align-start">
                <img width="30" src="../../public/Title&Badge.png" alt="" />
                <div>
                  {{ item.outputData }}
                </div>
              </div>
            </v-card>
          </div>
          <v-card
            class="pa-2 rounded-xl"
            variant="tonal"
            v-if="showOutput && index === scrollItems.length - 1"
          >
            {{ appStore.outputData }}
          </v-card>
        </template>
      </v-virtual-scroll>

      <!-- Textarea -->
      <v-textarea
        v-model="message"
        class="position-fixed bottom-0 mx-6"
        label="Write your message"
        rows="1"
        variant="solo"
        style="width: -webkit-fill-available"
      >
        <template #append-inner>
          <img
            src="../../public/Group 1000003428.png"
            alt="send"
            @click="addIntoScroll"
            class="pointer"
          />
        </template>
      </v-textarea>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import fetchData from "@/utilities/callEndPoints";
import { useRoute } from "vue-router";

import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();

const route = useRoute();
const message = ref("");

interface ScrollItem {
  message?: string;
  outputData?: string;
}

const scrollItems = ref<ScrollItem[]>([]);
const showOutput = ref(true);

const addIntoScroll = async () => {
  if (!message.value.trim()) return;
  scrollItems.value.push({
    message: message.value,
  });
  showOutput.value = true;
  await fetchData(
    route.query.API_KEY as string,
    route.query.modelName as string,
    message.value,
    Number(route.query.max_tokens),
    Number(route.query.temperature)
  );
  message.value = "";
  showOutput.value = false;
  scrollItems.value.push({
    outputData: appStore.outputData,
  });
};
</script>

<style>
.width {
  width: -webkit-fill-available;
}

.pointer {
  cursor: pointer;
}

/* Webkit Browsers (Chrome, Edge, Safari) */
.v-virtual-scroll::-webkit-scrollbar {
  width: 3px;
  /* Ultra-thin scrollbar */
}

.v-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  /* Thumb color */
  border-radius: 10px;
  /* Rounded corners for a sleek look */
}

.v-virtual-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
  /* Darker color on hover */
}

/* Optional: Firefox Styling */
.v-virtual-scroll {
  scrollbar-width: thin;
  /* Thin scrollbar */
  scrollbar-color: #888 transparent;
  /* Thumb and track colors */
}

.v-toolbar__content {
  justify-content: center;
}
</style>
