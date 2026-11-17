export interface Course {
  id: string;
  name: string;
  /** file name (without .jpg) in /img */
  photo: string;
  placeholder: string;
}

export interface EventInfo {
  title: string;
  date: string;
  time?: string;
  place?: string;
}

export interface Dish {
  id: string;
  courseId: string;
  dish: string;
  name: string;
  note?: string | null;
  clientId?: string | null;
  createdAt?: string | null;
}

export type DishInput = Pick<Dish, 'courseId' | 'dish' | 'name' | 'note' | 'clientId'>;
export type DishPatch = Pick<Dish, 'dish' | 'name' | 'note'>;
