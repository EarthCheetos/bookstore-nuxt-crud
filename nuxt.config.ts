// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  css:['~/pages/assets/main.css'],
  vite:{
    plugins:[tailwindcss()]
  }
});
