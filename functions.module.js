import OpenAI from "openai";
import { f_a_o_model_pricing } from "./pricing.js";

const o_url_script = new URL(import.meta.url);
const s_path_abs_folder_current_script = o_url_script.pathname.split('/').slice(0,-1).join('/');    


const s_path_rel_file_config = `./gitignored/o_config.json`;
const s_path_abs_file_config = `${s_path_abs_folder_current_script}/${s_path_rel_file_config}`;
let f_o_config = async function(){
  let o = JSON.parse(
    await Deno.readTextFile(s_path_abs_file_config)
  );
  return o
}


let f_a_o_model = async function(){
    let o_config = await f_o_config();

    const o_openai = new OpenAI(
        {
            apiKey: o_config.s_api_key
        }
    );
    let v = await o_openai.models.list()
    let a_o = v?.data;
    let a_o_model_pricing = await f_a_o_model_pricing(true);
    a_o.map(o=>{
        o.o_model_pricing = a_o_model_pricing.find(o_model_pricing=>{
            return o_model_pricing.Model == o.id
        })
        return o
    })
    return a_o
}




let f_o_completion = async function(
    s_prompt,
    s_model = 'gpt-4-1106-preview', 
){
    let o_config = await f_o_config();

    const o_openai = new OpenAI(
        {
            apiKey: o_config.s_api_key
        }
    );
    const o_completion = await o_openai.chat.completions.create({
        messages: [{ role: "system", content: s_prompt }],
        model: s_model,
    });

    return o_completion
}



export {
    f_o_config,
    f_a_o_model,
    f_o_completion
}