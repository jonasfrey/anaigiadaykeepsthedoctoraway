import { f_o_config } from "./functions.module.js";

let o_config = await f_o_config();
let o_resp = await fetch(
    'https://api.openai.com/v1/images/generations', 
    {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer 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`
        }, 
        body: JSON.stringify({
            model: "dall-e-3",
            prompt: "A cute otter", 
            n: 1, 
            size: "1024x1024"
        })
    }
)
console.log(await (o_resp.json()))