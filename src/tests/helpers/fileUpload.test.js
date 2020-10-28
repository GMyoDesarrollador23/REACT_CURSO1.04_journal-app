import cloudinary from "cloudinary";
import "@testing-library/jest-dom";

import { fileUpload } from "../../helpers/fileUpload";

// **************************************************************
describe("pruebas en fieUpload", () => {
   // ---------------------------------------------------------------
   cloudinary.config({
      cloud_name: "gmyodesarrollador23",
      api_key: "457328796371657",
      api_secret: "ByAkPiWbNk4tv1Fu1LJGMRm-WLE",
   });

   // ---------------------------------------------------------------
   test("debe de cargar un archvo y retornar el url", async (done) => {
      const resp = await fetch(
         "https://images.wikia.com/oficialnaruto/es/images/7/7b/Naruto-imagen.jpg"
      );

      const blob = await resp.blob();
      const file = new File([blob], "foto.png");
      let url = "";
      url = await fileUpload(file);

      expect(typeof url).toBe("string");

      //   borrando la imagen
      const secments = url.split("/");
      const imgId = secments[secments.length - 1].replace(
         ".jpg",
         ""
      );
      cloudinary.v2.api.delete_resources(imgId, {}, () => {
         done();
      });
   });

   // ---------------------------------------------------------------
   test("debe de retornar un null", async () => {
      const file = new File([], "foto.png");
      const url = await fileUpload(file);
      expect(url).toBe(null);
   });
   // ---------------------------------------------------------------
});
