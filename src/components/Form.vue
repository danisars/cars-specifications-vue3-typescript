<template>
  <div class="mt-6 lg:mt-0 w-full lg:w-[500px]">
    <h1 class="text-2xl font-semibold text-center mb-6">
      {{ title }}
    </h1>

    <form-group label="Name Of Specification*">
      <form-input v-model="formModel.name" />
    </form-group>

    <form-group label="Engine*">
      <form-select v-model="formModel.engine" :options="engineOptions" />
    </form-group>

    <form-group label="Color*">
      <form-select v-model="formModel.color" :options="colorOptions" />
    </form-group>

    <form-group label="Color Type">
      <form-select v-model="formModel.colorType" :options="colorTypeOptions" />
    </form-group>

    <form-group label="Interior Material">
      <form-select
        v-model="formModel.interiorMaterial"
        :options="interiorOptions"
      />
    </form-group>

    <form-group label="Wheel Rims">
      <form-select v-model="formModel.wheelRims" :options="rimsOptions" />
    </form-group>

    <form-group label="Wheel Model">
      <form-select v-model="formModel.wheelModel" :options="modelOptions" />
    </form-group>

    <div class="flex gap-x-4 justify-between text-center mt-8">
      <button
        class="bg-blue-500 text-white rounded-lg px-4 py-2"
        @click="$emit('update:showNewOption', true)"
        v-if="!showNewOption"
      >
        + New configuration option
      </button>
      <button
        class="bg-green-500 text-white rounded-lg px-4 py-2"
        :class="{ 'cursor-not-allowed bg-gray-200': !isFormValid }"
        :disabled="!isFormValid"
        @click="onSubmit"
      >
        {{ submitCaption }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from "vue";
import FormGroup from "./ui/form/FormGroup.vue";
import FormInput from "./ui/form/FormInput.vue";
import FormSelect from "./ui/form/FormSelect.vue";
import { SelectOption } from "../interface/select";
import {
  Car,
  CarColor,
  CarEngine,
  CarInterior,
  CarModel,
  CarRims
} from "../interface/car";
import { Specification } from "../models/Specification";
import { ColorType } from "../models/Color";

interface FormProps {
  activeSpecId: number;
  form: Record<string, string>;
  showNewOption: boolean;
}
interface FormEmits {
  (e: "create"): void;
  (e: "update", index: number): void;
  (e: "update:form", value: Record<string, string>): void;
  (e: "update:show-new-option", value: boolean): void;
}

const props = defineProps<FormProps>();
const emit = defineEmits<FormEmits>();

const formModel = computed({
  get() {
    return props.form;
  },
  set(value) {
    emit("update:form", value);
  }
});

const title = computed(() =>
  props.activeSpecId >= 0 ? "Update specification" : "Add new specification"
);
const submitCaption = computed(() =>
  props.activeSpecId >= 0 ? "Update" : "Create"
);

const convertEnumToSelectOptions = (
  object: Record<string, string>
): SelectOption[] =>
  Object.entries(object).map(([, label]) => ({ label, value: label }));

const engineOptions = convertEnumToSelectOptions(CarEngine);
const colorOptions = convertEnumToSelectOptions(CarColor);
const interiorOptions = convertEnumToSelectOptions(CarInterior);
const rimsOptions = convertEnumToSelectOptions(CarRims);
const modelOptions = convertEnumToSelectOptions(CarModel);
const colorTypeOptions = convertEnumToSelectOptions(ColorType);

const isFormValid = computed(() => {
  return props.form.name && props.form.engine && props.form.color;
});

const onSubmit = () => {
  if (!isFormValid) return;

  props.activeSpecId >= 0 ? emit("update", props.activeSpecId) : emit("create");
};
</script>
