import { Image } from "../components/ImageInput/ImageInput";
import { Ingredient, InstructionStep, Time } from "./recipeFormDataTypes";

export interface ValidationRules<
  T =
    | Ingredient
    | Ingredient[]
    | InstructionStep
    | InstructionStep[]
    | Time
    | Image[]
    | string
    | string[]
    | number
> {
  required?: boolean | string;
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: T) => boolean | string;
}

export interface TimeValidationRules {
  hours?: ValidationRules;
  minutes?: ValidationRules;
}
