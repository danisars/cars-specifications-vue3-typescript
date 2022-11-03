<template>
  <div class="form-group mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface FormGroupProps {
  label?: string;
}

defineProps<FormGroupProps>();
</script>
