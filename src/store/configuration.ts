import { reactive, ref } from "vue";
import { NewConfigurator } from "../models/new/Configurator";

export const selectedSpecificationIndex = ref(-1);
export const configuration = reactive(new NewConfigurator());
