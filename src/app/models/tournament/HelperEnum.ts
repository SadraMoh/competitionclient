import { Id } from "../Id";

export interface HelperEnum extends Id {
  title: 'حذف یک گزینه ' | 'شانس دوباره' | 'زمان اضافه';
  cost: number;
}

export const enumDictionary: any = {
  "DeleteOneOption": "حذف یک گزینه",
  "Again": "شانس دوباره",
  "AddLifeTime": "زمان اضافه",
}