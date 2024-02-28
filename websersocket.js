
import {
    f_websersocket_serve,
    f_v_before_return_response__fileserver
} from "https://deno.land/x/websersocket@0.2/mod.js"
import { f_a_o_model, f_o_completion, f_o_config, f_o_stream__o_completion } from "./functions.module.js";

let s_path_file_current = new URL(import.meta.url).pathname;
let s_path_folder_current = s_path_file_current.split('/').slice(0, -1).join('/');
// console.log(s_path_folder_current)
const b_deno_deploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;


let o_s_name_function_f__exposed = {
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
    f_o_stream__o_completion: async function(){

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
                    stream: true, 
                    model: arguments[1], 
                    messages: [
                        {
                            "role": "user",
                            "content": arguments[0]
                        }
                    ]
                })
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
            return await f(...(o_request_data?.a_v_arg) ? o_request_data?.a_v_arg : [])
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

await f_websersocket_serve(
    [
        {
            n_port: 8080,
            b_https: false,
            s_hostname: 'localhost',
            f_v_before_return_response: f_handler
        },
        ...[
            (!b_deno_deploy) ? {
                n_port: 8443,
                b_https: true,
                s_hostname: 'localhost',
                f_v_before_return_response: f_handler
            } : false
        ].filter(v=>v)
        
    ]
)