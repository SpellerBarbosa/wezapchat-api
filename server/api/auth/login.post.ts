import { sql } from "#imports";
import { comparePassword } from "#imports";

export default defineEventHandler(async(event)=>{
    const { username, pasword  } = await readBody(event);

    if(!username || !pasword){
        throw createError({
            statusCode: 400,
            statusMessage: "Preencha todos os campos corretamente"
        })
    }

    try {
        
    } catch (error) {
        
    }
})