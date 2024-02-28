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


    let v = await( await fetch(
        `https://api.openai.com/v1/models`, 
        {
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${o_config.s_api_key}`
            }, 
        }
    )).json();

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

    let o_resp = await fetch(
        `https://api.openai.com/v1/chat/completions`, 
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${o_config.s_api_key}`
            }, 
            body: JSON.stringify({
                // stream: true, 
                model: s_model, 
                messages: [
                    {
                        "role": "user",
                        "content": s_prompt
                    }
                ]
            })
        }
    )

    return o_resp.json()
}



let f_o_stream__o_completion = async function(
    s_prompt,
    s_model = 'gpt-4-1106-preview', 
){

    let o_config = await f_o_config();

    const o_openai = new OpenAI(
        {
            apiKey: o_config.s_api_key
        }
    );

    return o_openai.chat.completions.create({
        messages: [{ role: "system", content: s_prompt }],
        model: s_model,
        stream: true,
    })
    // .then(async o_stream=>{
    //     for await (const chunk of o_stream) {
    //         // console.log(chunk)
    //         // Deno.stdout.write(new TextEncoder().encode(str))
    //         // console.log(o_tmp)
    //         o_tmp.s_out_tmp=chunk.choices[0]?.delta?.content
    //         // Deno.stdout.write(s_tmp)
    //         o_tmp.n_ms_wpn = window.performance.now()
    //     }
    //     o_tmp.b_done = true
    // })
    // return o_tmp
}

export {
    f_o_config,
    f_a_o_model,
    f_o_completion,
    f_o_stream__o_completion
}