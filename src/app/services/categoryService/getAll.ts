import { Category } from "../../entities/Category";
import { httpClient } from "../httpClient";

type GetAllCategoriesResponse = Category[];

export async function getAll() {
    const { data } = await httpClient.get<GetAllCategoriesResponse>('categories')

    return data;
}