<template>
  <div class="w-full lg:w-[400px]">
    <h1 class="text-2xl font-semibold text-center mb-6">
      List of specifications
    </h1>

    <ul>
      <li
        class="mb-4"
        v-for="(specification, index) in configuration.getSpecifications()"
        :key="index"
      >
        <div
          class="header cursor-pointer bg-gray-200 px-3 py-2 border border-gray-500 text-center"
          :class="
            selectedSpecificationIndex === index
              ? 'rounded-t-md border-b-0'
              : 'rounded-md'
          "
          @click="selectSpecification(index)"
        >
          {{ specification.name }}
        </div>

        <div
          class="content text-center py-2 border border-dashed border-gray-500"
          v-if="selectedSpecificationIndex === index"
        >
          <p v-for="field in specification.fields">
            {{ field.label }} - {{ field.value || "N/A" }}
          </p>
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
import {
  configuration,
  selectedSpecificationIndex
} from "../store/configuration";

const selectSpecification = async (id: number = 0) =>
  (selectedSpecificationIndex.value =
    id === selectedSpecificationIndex.value ? -1 : id);
</script>
