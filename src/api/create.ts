import { postAPI } from "./action"
import URLConstant from "./urls"

export const createUser = (values: any) => {
    return postAPI(URLConstant.pokemon, values);
}