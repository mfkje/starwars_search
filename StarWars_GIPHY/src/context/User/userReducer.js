import { CALL_SW_API, CALL_GIF_API} from "../types";


export default function payloader(state, action) {
  const { payload, type } = action;

  switch (type) {
    case CALL_SW_API:
      return {
        ...state,

      
        characters: payload,
      };
    case CALL_GIF_API:
      return {
        ...state,
      
        selectedGif: payload,
      };
    default:
      return state;
  }
}
