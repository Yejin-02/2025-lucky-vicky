export enum Category {
  Meal = 0,
  Drinks = 1,
  Cafe = 2,
}

export const INITIAL_SELECTED_CATEGORIES: Record<Category, boolean> = {
  [Category.Cafe]: true,
  [Category.Meal]: true,
  [Category.Drinks]: true,
};
