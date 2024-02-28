import OpenAI from "openai";
import { f_a_o_model_pricing } from "./pricing.js";

const o_url_script = new URL(import.meta.url);
const s_path_abs_folder_current_script = o_url_script.pathname.split('/').slice(0,-1).join('/');    


const s_path_rel_file_config = `./o_config.gitignored.json`;
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

class O_tmp{
    constructor(
        s_uuidv4, 
        b_done,
        s_prompt, 
        s_model, 
        s_out_tmp,
        v_o_completion,
        n_ms_wpn
    ){
        this.s_uuidv4 = s_uuidv4
        this.b_done = b_done
        this.s_prompt = s_prompt
        this.s_model = s_model
        this.s_out_tmp = s_out_tmp,
        this.v_o_completion = v_o_completion
        this.n_ms_wpn = n_ms_wpn
    }
}
let a_o_tmp = [];

let f_o_completion_tmp = async function(
    s_uuidv4,
    s_prompt,
    s_model = 'gpt-4-1106-preview', 
){

    let o_tmp = a_o_tmp.find(
        o=>{
            return o.s_uuidv4 == s_uuidv4
        }
    );
    if(o_tmp){
        return o_tmp
    }
    o_tmp = new O_tmp(
        s_uuidv4,
        false,
        s_prompt,
        s_model,
        '',
        null, 
        window.performance.now()
    );
    a_o_tmp.push(o_tmp);
    let o_config = await f_o_config();

    const o_openai = new OpenAI(
        {
            apiKey: o_config.s_api_key
        }
    );

    o_openai.chat.completions.create({
        messages: [{ role: "system", content: s_prompt }],
        model: s_model,
        stream: true,
    }).then(async o_stream=>{
        for await (const chunk of o_stream) {
            // console.log(chunk)
            // Deno.stdout.write(new TextEncoder().encode(str))
            // console.log(o_tmp)
            o_tmp.s_out_tmp=chunk.choices[0]?.delta?.content
            // Deno.stdout.write(s_tmp)
            o_tmp.n_ms_wpn = window.performance.now()
        }
        o_tmp.b_done = true
    })
    return o_tmp
}

export {
    f_o_config,
    f_a_o_model,
    f_o_completion,
    f_o_completion_tmp
}