//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  runtimeConfig:{
    NEON_URI:''
  },
  devServer:{
    port: 3001
  }
});
