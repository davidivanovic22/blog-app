import { Category } from "../models/category";

export const isNumeric = (str: string | number) => {
  if (typeof str != 'string') return false;
  return !isNaN(str as any) && !isNaN(parseFloat(str));
};


export const categoryRender = (categories: Category[], categoryId: number, property: string) => {
    return categories.map((category) => {
      if (category.id === categoryId) {
        let type: any = category;
        return type ? type[property] : '';
      } 
      return ''
    }).join('')
  }