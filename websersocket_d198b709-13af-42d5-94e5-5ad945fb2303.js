
import {
    f_websersocket_serve,
    f_v_before_return_response__fileserver
} from "https://deno.land/x/websersocket@0.2/mod.js"

let s_path_file_current = new URL(import.meta.url).pathname;
let s_path_folder_current = s_path_file_current.split('/').slice(0, -1).join('/');
// console.log(s_path_folder_current)
const b_deno_deploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;


let f_handler = async function(o_request){

    let o_url = new URL(o_request.url);
    let o_request_data = null;


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
let s_name_host = (Deno.hostname() == '11235.ch') ? '188.166.95.225' : 'localhost';

await f_websersocket_serve(
    [
        {
            n_port: 8081,
            b_https: false,
            s_hostname: s_name_host,
            f_v_before_return_response: f_handler
        },
        ...[
            (!b_deno_deploy) ? {
                n_port: 8444,
                b_https: true,
                s_hostname: s_name_host,
                f_v_before_return_response: f_handler
            } : false
        ].filter(v=>v)
    ]
)