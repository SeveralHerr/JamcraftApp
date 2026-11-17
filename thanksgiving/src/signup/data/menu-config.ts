import type { Course, EventInfo } from '../entities/menu';

// To change the menu, edit this file and push: Amplify redeploys the branch.
export const EVENT: EventInfo = {
  title: 'Thanksgiving',
  date: 'Thursday, Nov 26',
};

export const COURSES: Course[] = [
  { id: 'appetizers', name: 'Appetizers', photo: 'cheese', placeholder: 'e.g. Cheese board' },
  { id: 'sides', name: 'Sides', photo: 'sides', placeholder: 'e.g. Sweet potato casserole' },
  { id: 'bread', name: 'Bread & Rolls', photo: 'bread', placeholder: 'e.g. Cornbread' },
  { id: 'desserts', name: 'Desserts', photo: 'pie', placeholder: 'e.g. Pecan pie' },
  { id: 'drinks', name: 'Drinks', photo: 'drinks', placeholder: 'e.g. Mulled cider' },
  { id: 'supplies', name: 'Plates, Napkins & Ice', photo: 'leaves', placeholder: 'e.g. Bag of ice' },
];
