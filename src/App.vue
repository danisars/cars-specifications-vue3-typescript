<template>
  <div class="my-6 mx-auto px-4 lg:px-0 w-full ld:w-[1000px]">
    <div class="flex flex-col lg:flex-row gap-x-10 justify-center">
      <List
        v-model:selected-car-specification-id="selectedCarSpecificationId"
        :specifications="configuration.getSpecifications()"
      />

      <Form
        v-model:form="form"
        v-model:showNewOption="showNewOption"
        :activeSpecId="selectedCarSpecificationId"
        @create="createSpecification"
        @update="updateSpecification"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import List from "./components/List.vue";
import Form from "./components/Form.vue";
import { ref, watch } from "vue";
import {
  CarEngine,
  CarInterior
} from "./interface/car";
import { Specification } from "./models/Specification";
import { Exterior } from "./models/Exterior";
import { Color, ColorType } from "./models/Color";
import { Wheel, WheelModel, WheelRims } from "./models/Wheel";
import { EngineFactory } from "./models/Engine";
import { Configuration } from "./models/Configuration";
import { InteriorMaterialFactory } from "./models/InteriorMaterial";

//State
const selectedCarSpecificationId = ref(-1);

const showNewOption = ref<boolean>(false);

const form = ref({
  name: "",
  engine: "",
  color: "",
  colorType: "",
  interiorMaterial: "",
  wheelRims: "",
  wheelModel: ""
});

const configuration = ref(new Configuration());

const updateSelectedId = (index: number) => {
  if (index === -1) return resetFormData();

  form.value = configuration.value.getSpecificationFormByIndex(index);
};
watch(selectedCarSpecificationId, updateSelectedId);

const createSpecification = () => {
  configuration.value.addSpecification(
    new Specification(
      form.value.name,
      new Exterior(
        new Color(form.value.color, form.value.colorType as ColorType),
        new Wheel(
          form.value.wheelRims as WheelRims,
          form.value.wheelModel as WheelModel
        )
      ),
      EngineFactory.create(form.value.engine as CarEngine),
      InteriorMaterialFactory.create(form.value.interiorMaterial as CarInterior)
    )
  );
  selectedCarSpecificationId.value =
    configuration.value.getSpecifications().length - 1;
};

const updateSpecification = (index: number) => {
  configuration.value.updateSpecification(
    index,
    new Specification(
      form.value.name,
      new Exterior(
        new Color(form.value.color, form.value.colorType as ColorType),
        new Wheel(
          form.value.wheelRims as WheelRims,
          form.value.wheelModel as WheelModel
        )
      ),
      EngineFactory.create(form.value.engine as CarEngine),
      InteriorMaterialFactory.create(form.value.interiorMaterial as CarInterior)
    )
  );
};

const resetFormData = () => {
  form.value = {
    name: "",
    engine: "",
    color: "",
    interiorMaterial: "",
    wheelRims: "",
    wheelModel: ""
  };
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
