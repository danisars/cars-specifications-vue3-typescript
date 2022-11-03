<template>
  <input
    :value="modelValue"
    @input="onInput"
    class="block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm"
  />
</template>

<script lang="ts" setup>
interface FormInputProps {
  modelValue?: string;
}
interface FormInputEmits {
  (e: "update:modelValue", value: string): void;
}

defineProps<FormInputProps>();
const emit = defineEmits<FormInputEmits>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
