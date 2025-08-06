import { getAPI } from "./action"
import URLConstant from "./urls"

export const getPokemonData = (params?: any) => {
    return getAPI(URLConstant.pokemon, params);
}