
import {
    f_websersocket_serve,
    f_v_before_return_response__fileserver
} from "https://deno.land/x/websersocket@0.2/mod.js"
import { f_a_o_model, f_a_o_model_info, f_o_completion, f_o_config, f_o_stream__o_completion } from "./functions.module.js";

let s_path_file_current = new URL(import.meta.url).pathname;
let s_path_folder_current = s_path_file_current.split('/').slice(0, -1).join('/');
// console.log(s_path_folder_current)
const b_deno_deploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;


let o_s_name_function_f__exposed = {
    f_s_json__a_o_model_info: async function(){
        return new Response(
            JSON.stringify(
                await f_a_o_model_info()
            ),
            {
                headers: {
                    'Content-type': "application/json"
                }
            }
        )
    },
    f_s_json__a_o_model: async function(){
        return new Response(
            JSON.stringify(
                await f_a_o_model()
            ),
            {
                headers: {
                    'Content-type': "application/json"
                }
            }
        )
    },
    f_o_stream__o_completion: async function(
        o_param
    ){
        let a_o_model_info = await f_a_o_model_info();
        let o_model_info = a_o_model_info.find(o=>o.s_name == o_param.s_name_model);
        if(!o_model_info){
            return new Response(
                JSON.stringify(
                    {
                        b_success: false, 
                        s_msg: `could not find o_model_info.s_name == '${o_param.s_name_model}'`
                    }
                ),
                {
                    headers: {
                        'Content-type': "application/json"
                    }
                }
            )
        }
        let o_req_data = Object.assign(
            {
                model: o_param.s_name_model, 
            },
            ...o_model_info.a_o_request_parameter.map(o=>{
                let v = (o_param[o.s_name])
                    ? o_param[o.s_name]
                    : o.v_default;
                return {
                    [o.s_name]: v
                }
            })
        )
        console.log(o_req_data)
        if([
            "gpt-4",
            "gpt-4-turbo-preview",
            "gpt-3.5-turbo-0613",
            "gpt-3.5-turbo-1106",
            "gpt-3.5-turbo-16k",
            "gpt-4-0613",
            "gpt-3.5-turbo-16k-0613",
            "gpt-4-0125-preview",
            "gpt-3.5-turbo-instruct-0914",
            "gpt-4-1106-preview",
            "gpt-3.5-turbo",
            "gpt-3.5-turbo-030"
        ].includes(o_param.s_name_model)){
            o_req_data.stream = true, 
            o_req_data.messages= [
                {
                    "role": "user",
                    "content": o_param.s_prompt
                }
            ]
        }
        let o_config = await f_o_config();
        let o_resp = await fetch(
            o_model_info.s_url_api_endpoint, 
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${o_config.s_api_key}`
                }, 
                body: JSON.stringify(o_req_data)
            }
        )
        return o_resp
        // return new Response(
        //     o_resp.body, {
        //     headers: {
        //       "content-type": "text/plain",
        //       "x-content-type-options": "nosniff",
        //     },
        //   });
        // console.log(o_resp)
        // return o_resp;
    }
}


let f_handler = async function(o_request){
    // important if the connection is secure (https),
    // the socket has to be opened with the wss:// protocol
    // from the client
    // for client: const socket = new WebSocket(`${window.location.protocol.replace('http', 'ws')}//${window.location.host}`);

    let o_url = new URL(o_request.url);
    let o_request_data = null;
    try {
        o_request_data = (await o_request.json())
    } catch (error) {
    }
    let a_s_name_funtion = Object.keys(o_s_name_function_f__exposed);
    if(o_request_data?.s_name_function){

        let f = o_s_name_function_f__exposed[o_request_data.s_name_function];
        if(!f){
            return new Response(
                JSON.stringify(
                    {
                        b_success: false, 
                        s_msg: `function '${o_request_data.s_name_function}' is not available , available are ${a_s_name_funtion.join(',')}`
                    }
                )
            )
        }
        if(f){
            return await f(o_request_data?.o_param)
        }
    }
    

    if(o_url.pathname == '/'){

        return new Response(
            await Deno.readTextFile(
                `${s_path_folder_current}/localhost/client.html`
            ),
            { 
                headers: {
                    'Content-type': "text/html"
                }
            }
        );
    }
    if(o_url.pathname == '/stream'){

        let timer = undefined;
        const body = new ReadableStream({
          start(controller) {
            timer = setInterval(() => {
              const message = `It is ${new Date().toISOString()}\n`;
              controller.enqueue(new TextEncoder().encode(message));
            }, 1000);
          },
          cancel() {
            if (timer !== undefined) {
              clearInterval(timer);
            }
          },
        });
        return new Response(body, {
          headers: {
            "content-type": "text/plain",
            "x-content-type-options": "nosniff",
          },
        });
        
    }


    return f_v_before_return_response__fileserver(
        o_request,
        `${s_path_folder_current}/localhost/`
    )
}
let s_name_host = (Deno.hostname() == '11235.ch') ? '188.166.95.225' : 'localhost';


await f_websersocket_serve(
    [
        {
            n_port: 8080,
            b_https: false,
            s_hostname: s_name_host,
            f_v_before_return_response: f_handler
        },
        ...[
            (!b_deno_deploy) ? {
                n_port: 8443,
                b_https: true,
                s_hostname: s_name_host,
                f_v_before_return_response: f_handler
            } : false
        ].filter(v=>v)
    ]
)