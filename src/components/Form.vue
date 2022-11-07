<template>
  <div class="mt-6 lg:mt-0 w-full lg:w-[500px]">
    <h1 class="text-2xl font-semibold text-center mb-6">
      {{ title }}
    </h1>

    <form-group v-for="field in specification.fields" :label="field.label">
      <form-input v-if="field.type === FieldType.Input" v-model="field.value" />
      <form-select
        v-else-if="field.type === FieldType.Select"
        :options="field.options"
        v-model="field.value"
      />
    </form-group>

    <div class="flex gap-x-4 justify-between text-center mt-8">
      <button
        class="bg-blue-500 text-white rounded-lg px-4 py-2"
        @click="toggleModal"
      >
        + New configuration option
      </button>
      <button
        class="bg-green-500 text-white rounded-lg px-4 py-2"
        @click="onSubmit"
      >
        {{ submitCaption }}
      </button>
    </div>

    <div
      v-if="isModalActive"
      class="absolute top-0 left-0 z-50  h-screen w-screen flex justify-center items-center"
    >
      <div
        class="fixed w-full h-full bg-black/[0.5] -z-10"
        @click="toggleModal"
      />
      <div class="w-[300px] min-h-[300px] bg-white p-5 flex flex-col">
        <form @submit.prevent class="flex-auto">
          <form-group label="Label">
            <form-input
              v-model="configurationOption.label"
              placeholder="Enter label"
            />
          </form-group>
          <form-group label="Type">
            <form-select
              v-model="configurationOption.type"
              :options="fieldTypeOptions"
            />
          </form-group>

          <div
            v-if="configurationOption.type === FieldType.Select"
            class="mb-5"
          >
            <div class="grid grid-cols-2 gap-3">
              <template
                v-for="option in configurationOption.typeInstance.options"
              >
                <form-group label="Label">
                  <form-input v-model="option.label" />
                </form-group>
                <form-group label="Value">
                  <form-input v-model="option.value" />
                </form-group>
              </template>
              <form-group label="Label">
                <form-input v-model="selectOption.label" />
              </form-group>
              <form-group label="Value">
                <form-input v-model="selectOption.value" />
              </form-group>
            </div>
            <div class="flex justify-end">
              <button
                class="inline-block text-green-400"
                @click="onAddSelectOption"
              >
                + Add new option
              </button>
            </div>
          </div>
        </form>
        <button
          class="bg-green-400 rounded-md py-2 text-white"
          @click="onClickAddConfigurationOption"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import FormGroup from "./ui/form/FormGroup.vue";
import FormInput from "./ui/form/FormInput.vue";
import FormSelect from "./ui/form/FormSelect.vue";
import { SelectOption } from "../interface/select";
import _ from "lodash";

import {
  FieldType,
  InputField,
  NewSpecification,
  SelectField
} from "../models/new/Configurator";
import {
  configuration,
  selectedSpecificationIndex
} from "../store/configuration";

const isModalActive = ref(false);
const toggleModal = () => (isModalActive.value = !isModalActive.value);

const specification = ref(new NewSpecification());
watch(
  () => selectedSpecificationIndex.value,
  index => {
    if (index < 0) {
      specification.value = new NewSpecification();
      return;
    }

    const selectedSpecification = configuration.findSpecificationByIndex(index);

    if (!selectedSpecification) return;

    specification.value = _.cloneDeep(selectedSpecification);
  }
);

const configurationOption = reactive<Record<string, any>>({
  label: "",
  type: "",
  typeInstance: null
});
const selectOption = reactive({
  label: "",
  value: ""
});
watch(
  () => configurationOption.type,
  type => {
    if (type === FieldType.Select)
      configurationOption.typeInstance = new SelectField(
        configurationOption.label
      );
    else
      configurationOption.typeInstance = new InputField(
        configurationOption.label
      );
  }
);
const onAddSelectOption = () => {
  configurationOption.typeInstance.addOption(
    JSON.parse(JSON.stringify(selectOption))
  );
  selectOption.label = selectOption.value = "";
};
const onClickAddConfigurationOption = () => {
  specification.value.fieldBuilder.addField(configurationOption.typeInstance);
  configurationOption.label = configurationOption.type = selectOption.value = selectOption.label =
    "";
  configurationOption.typeInstance = null;
};
const convertEnumToSelectOptions = (
  object: Record<string, string>
): SelectOption[] =>
  Object.entries(object).map(([label, value]) => ({ label, value }));

const fieldTypeOptions = convertEnumToSelectOptions(FieldType);

const title = computed(() =>
  selectedSpecificationIndex.value >= 0
    ? "Update specification"
    : "Add new specification"
);
const submitCaption = computed(() =>
  selectedSpecificationIndex.value >= 0 ? "Update" : "Create"
);

const onSubmit = () => {
  selectedSpecificationIndex.value >= 0
    ? configuration.updateSpecification(
        selectedSpecificationIndex.value,
        specification.value as NewSpecification
      )
    : configuration.addSpecification(specification.value as NewSpecification);

  specification.value = new NewSpecification();
};
</script>
