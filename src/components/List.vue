<template>
  <div class="w-full lg:w-[400px]">
    <h1 class="text-2xl font-semibold text-center mb-6">
      List of specifications
    </h1>

    <ul>
      <li
        class="mb-4"
        v-for="(specification, index) in specifications"
        :key="index"
      >
        <div
          class="header cursor-pointer bg-gray-200 px-3 py-2 border border-gray-500 text-center"
          :class="
            selectedCarSpecificationId === index
              ? 'rounded-t-md border-b-0'
              : 'rounded-md'
          "
          @click="selectSpecification(index)"
        >
          {{ specification.name }}
        </div>

        <div
          class="content text-center py-2 border border-dashed border-gray-500"
          v-if="selectedCarSpecificationId === index"
        >
          <p>Engine - {{ specification.engine.name || "N/A" }}</p>
          <p>Color - {{ specification.exterior.color.name || "N/A" }}</p>
          <p>Paint Type - {{ specification.exterior.color.type || "N/A" }}</p>
          <p>
            Interior Material -
            {{ specification.interiorMaterial.name || "N/A" }}
          </p>
          <p>Wheel rims - {{ specification.exterior.wheel.rims || "N/A" }}</p>
          <p>Wheel model - {{ specification.exterior.wheel.model || "N/A" }}</p>
        </div>
      </li>
    </ul>

    <div class="text-center mt-8">
      <button
        class="bg-green-500 text-white rounded-lg px-4 py-2"
        @click="selectSpecification(-1)"
      >
        + Make new specification
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import { Specification } from "../models/Specification";

interface ListProps {
  selectedCarSpecificationId: number;
  specifications: Specification[];
}
interface ListEmits {
  (e: "update:selected-car-specification-id", id: number): void;
}

const props = defineProps<ListProps>();
const emit = defineEmits<ListEmits>();

const selectSpecification = async (id: number = 0) =>
  emit(
    "update:selected-car-specification-id",
    id === props.selectedCarSpecificationId ? -1 : id
  );
</script>
