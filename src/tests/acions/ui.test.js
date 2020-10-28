import "@testing-library/jest-dom";

import {
   setError,
   removeError,
   startLoading,
   finishLoading,
} from "../../actions/ui";
import { types } from "../../types/types";
// ******************************************************

describe("Prubas en el uiAction", () => {
   // -----------------------------------------------------
   test("todas las pruebas deben de funcionar", () => {
      const action = setError("help");
      const removeErrorAction = removeError();
      const startLoadingAction = startLoading();
      const finishLoadingAction = finishLoading();

      expect(action).toEqual({
         type: types.uiSetError,
         payload: "help",
      });
      expect(removeErrorAction).toEqual({
         type: types.uiRemoveError,
      });
      expect(startLoadingAction).toEqual({
         type: types.uiStartLoading,
      });
      expect(finishLoadingAction).toEqual({
         type: types.uiFinishLoading,
      });
   });
   // -----------------------------------------------------
});
