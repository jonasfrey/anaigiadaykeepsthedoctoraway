
import {
    f_websersocket_serve,
    f_v_before_return_response__fileserver
} from "https://deno.land/x/websersocket@0.2/mod.js"
import { f_a_o_model, f_o_completion } from "./functions.module.js";

let s_path_file_current = new URL(import.meta.url).pathname;
let s_path_folder_current = s_path_file_current.split('/').slice(0, -1).join('/');
// console.log(s_path_folder_current)
const b_deno_deploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;


let f_handler = async function(o_request){
    // important if the connection is secure (https),
    // the socket has to be opened with the wss:// protocol
    // from the client
    // for client: const socket = new WebSocket(`${window.location.protocol.replace('http', 'ws')}//${window.location.host}`);

    let o_url = new URL(o_request.url);
    
    if(o_url.pathname == '/a_o_model'){
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
    }
    if(o_url.pathname == '/o_completion'){
        let o_request_data =   (await o_request.json())
        return new Response(
            JSON.stringify(
                await f_o_completion(o_request_data.s_prompt, o_request_data.s_model)
            ),
            {
                headers: {
                    'Content-type': "application/json"
                }
            }
        )
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