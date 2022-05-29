import {TITLES} from "../constants";

export type IngredientTypes = keyof typeof TITLES;

export type IngredientType = {
    _id: string;
    name: string;
    type: IngredientTypes;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    unique: number;
}

export type Profile = {
    email: string;
    name: string;
    password: string;
}

export type OrderNewDetails = {
    orderNumber: number | null;
}

export type UserType = {
    email: string;
    name: string;
}

export type OrderDetailsType = {
    orderNumber: number | null;
}

export type FeedOrderType = {
    _id: string;
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: 'created' | 'pending' | 'done';
    updatedAt: string;
}
