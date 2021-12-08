
export interface HelperEnum {
  id: HelperType;
  title: 'حذف یک گزینه ' | 'شانس دوباره' | 'زمان اضافه';
  cost: number;
}

export const enumDictionary: any = {
  // 1
  "DeleteFalseOption": "حذف یک گزینه",
  // 2
  "AgainRound": "شانس دوباره",
  // 3
  "AddLifeTime": "زمان اضافه",
}

export enum HelperType {
  bomb = 1,
  duplex = 2,
  time = 3
}