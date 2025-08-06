import { deleteAPI } from "./action"
import URLConstant from "./urls"

export const deleteUser = (id?: any) => {
    return deleteAPI(URLConstant.pokemon, id);
}