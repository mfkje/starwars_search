import React, { useReducer } from "react";

import userContext from "./userContext";
import userReducer from "./userReducer";

// We define the primary initial states (the characters to be listed and the gif to be displayed)
export default function UserState(props) {
  const initialState = {
    characters: "",
    selectedGif: "",
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Star wars api URL
  const SW_url = "https://swapi.dev/api/people/";

  //API Key y URL de la API de GIPHY
  const API_key = "UYB6O0WZSE4yARnLNytEMTHyeOOmliVd";
  const GIPHY_url = "https://api.giphy.com/v1/gifs/search";

  // Function that will call the API of the star wars characters
  async function callStarWarsApi(page, search = "") {
    // Auxiliary variable to clean up the payload
    const auxNull = null;

    try {
      // Every time the function is executed, the payload will be cleaned (
        //so that there is a feedback while changing the page since sometimes the API takes time to load)
      dispatch({
        type: "CALL_SW_API",
        payload: auxNull,
      });

      const res = await fetch(`${SW_url}?page=${page}&search=${search}`);
      const resJSON = await res.json();

      dispatch({
        type: "CALL_SW_API",
        // For some reason it doesn't work if I do setPeople(resJSON.results) and then send "people" in the payload, so I send the payload with the whole expression
        payload: resJSON,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function callGifAPI(parameter) {
    // Auxiliary variable to clean up the payload
    const varAux = null;

    try {
      // Every time a gif is searched, the payload will be cleaned to place a spinner
      dispatch({
        type: "CALL_GIF_API",
        payload: varAux,
      });

      const res = await fetch(`${GIPHY_url}?q=${parameter}&api_key=${API_key}`);
      const resJSON = await res.json();

      //I send to the payload only the first result (for now, I would like to put at least 5) 
      const result = resJSON.data[0];
      dispatch({
        type: "CALL_GIF_API",
        payload: result,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <userContext.Provider
      // Here are listed the functions and variables that you want to export through the context
      value={{
        characters: state.characters,
        selectedGif: state.selectedGif,
        callStarWarsApi,
        callGifAPI,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}
