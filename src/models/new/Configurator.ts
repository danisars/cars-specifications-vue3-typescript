import {
  CarColor,
  CarEngine,
  CarInterior,
  CarModel,
  CarRims
} from "../../interface/car";
import _ from "lodash";
import { SelectOption } from "../../interface/select";

const convertEnumToSelectOptions = (
  object: Record<string, string>
): SelectOption[] =>
  Object.entries(object).map(([, label]) => ({ label, value: label }));

const engineOptions = convertEnumToSelectOptions(CarEngine);
const colorOptions = convertEnumToSelectOptions(CarColor);
const interiorOptions = convertEnumToSelectOptions(CarInterior);
const rimsOptions = convertEnumToSelectOptions(CarRims);
const modelOptions = convertEnumToSelectOptions(CarModel);
const colorTypeOptions = convertEnumToSelectOptions(CarColor);

export enum FieldType {
  Select = "select",
  Input = "input"
}

export class Field {
  public value: string;

  constructor(public label: string, public type: string) {
    this.value = "";
  }
}

interface SelectFieldOption {
  label: string;
  value: string;
}
export class SelectField extends Field {
  private readonly _options: SelectFieldOption[];

  constructor(label: string, options: SelectFieldOption[] = []) {
    super(label, FieldType.Select);
    this._options = options;
  }

  get options() {
    return this._options;
  }

  addOption(option: SelectFieldOption) {
    this._options.push(option);
  }
}
export class InputField extends Field {
  constructor(label: string) {
    super(label, FieldType.Input);
  }
}

export class FieldBuilder {
  private readonly _fields: Field[];

  constructor(fields: Field[] = []) {
    this._fields = fields;
  }

  get fields() {
    return this._fields;
  }

  addField(field: Field) {
    this._fields.push(_.cloneDeep(field));
  }

  getFieldByLabel(label: string) {
    return this.fields.find(field => field.label === label);
  }
}

export class NewSpecification {
  private readonly _fieldBuilder: FieldBuilder;

  constructor() {
    this._fieldBuilder = new FieldBuilder([
      new InputField("Name of specification"),
      new SelectField("Engine", engineOptions),
      new SelectField("Color", colorOptions),
      new SelectField("Color Type", colorTypeOptions),
      new SelectField("Interior Material", interiorOptions),
      new SelectField("Wheel Rims", rimsOptions),
      new SelectField("Wheel Model", modelOptions)
    ]);
  }

  get fieldBuilder() {
    return this._fieldBuilder;
  }

  get fields() {
    return this.fieldBuilder.fields;
  }

  get name() {
    return this.fieldBuilder.getFieldByLabel("Name of specification")?.value;
  }
}

export class NewConfigurator {
  private _specifications: NewSpecification[] = [];

  get specifications() {
    return this._specifications;
  }

  set specifications(value) {
    this._specifications = value;
  }

  private findSpecificationByName(findSpecification: NewSpecification) {
    return this.specifications.find(specification => {
      console.log(specification.name, findSpecification.name);
      return specification.name === findSpecification.name;
    });
  }

  findSpecificationByIndex(index: number): NewSpecification | null {
    if (this.isValidSpecificationIndex(index)) return null;

    return this.specifications[index];
  }

  private isValidSpecificationIndex(index: number) {
    return index < 0 || index >= this.specifications.length;
  }

  addSpecification(specification: NewSpecification) {
    if (this.findSpecificationByName(specification))
      throw new Error("Specification already exist with this name.");

    this.specifications.push(_.cloneDeep(specification));

    return this;
  }

  updateSpecification(index: number, updatedSpecification: NewSpecification) {
    if (this.isValidSpecificationIndex(index)) throw new Error("Invalid index");

    this.specifications.splice(index, 1, _.cloneDeep(updatedSpecification));
  }

  getSpecifications() {
    return this.specifications;
  }
}
