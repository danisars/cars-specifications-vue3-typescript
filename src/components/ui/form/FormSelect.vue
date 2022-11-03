<template>
  <select
    id="color"
    name="color"
    :value="modelValue"
    @change="onChange"
    class="mt-1 block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm"
  >
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { SelectOption } from "../../../interface/select";

interface FormSelectProps {
  options: SelectOption[];
  modelValue?: string;
}
interface FormSelectEmits {
  (e: "update:modelValue", value: string): void;
}
defineProps<FormSelectProps>();
const emit = defineEmits<FormSelectEmits>();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>
