
import {
    f_o_js as f_o_js__tooltip
} from "https://deno.land/x/f_o_html_from_o_js@2.8/localhost/jsh_modules/tooltip/mod.js"

import {
    f_display_test_selection_or_run_selected_test_and_print_summary,
    f_o_test
} from "https://deno.land/x/deno_test_server_and_client_side@1.1/mod.js"

import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@1.1/mod.js"

import {
    O_vec2
} from "https://deno.land/x/vector@0.8/mod.js"

class O_message {
    constructor(
        n_ms_ts, 
        s_content,
        n_tokens_estimated,
        v_o_completion
    ){
        this.n_ms_ts = n_ms_ts, 
        this.s_content = s_content,
        this.n_tokens_estimated = n_tokens_estimated
        this.v_o_completion = v_o_completion
    }
}

o_variables.n_rem_font_size_base = 1.2 // adjust font size, other variables can also be adapted before adding the css to the dom
o_variables.n_rem_padding_interactive_elements = 0.6; // adjust padding for interactive elements 
f_add_css(
    `

    .o_message {
        position: relative;
        padding: .6rem;
        margin: .6rem;
        border: 2px solid rgb(132 130 130 / 85%);

        background: linear-gradient(45deg, #300000, #070b12);
        border-radius: 9px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .o_message.b_bot {
        background: linear-gradient(45deg, #070b12, #001331);
    }
    .a_o_message {
        overflow-y: scroll;
    }
    .inputs {
        display: flex;
        flex-direction: column;
    }

    /* CSS */
    :root {
        font-family: Inter, sans-serif;
        font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
    }
    @supports (font-variation-settings: normal) {
        :root { font-family: InterVariable, sans-serif; }
    }
    .app{
        max-width: 900px;
        margin: 0 auto;
        font-family: Inter, sans-serif;
        font-weight: 300;
        font-style: normal;
        line-height:150%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
    }
    .circular_clip{
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ${
        f_s_css_from_o_variables(
            o_variables
        )
    }
    `
);


import {
    f_o_html__and_make_renderable,
}
from 'https://deno.land/x/f_o_html_from_o_js@2.7/mod.js'

let f_s_time = function(n_ms_ts){
    let o_date = new Date(n_ms_ts);
    return [
        o_date.getHours().toString().padStart(2, '0'),
        o_date.getMinutes().toString().padStart(2, '0'),
        o_date.getMinutes().toString().padStart(2, '0'),
    ].join(':')
}

let n_port = 8080;
let s_url_api = `${window.location.protocol}//${window.location.hostname}:${n_port}`
let o_state = {
    o_message_out: null,
    o_tmp: null,
    n_id_wsi: 0,
    s_url_api: s_url_api,
    s_text: 'hello',
    a_o_model: await(
        await(fetch(
            s_url_api, 
            {
                method: "POST", 
                body: JSON.stringify(
                    {
                        s_name_function: 'f_s_json__a_o_model'
                    }
                )
            }
        ))
    ).json(), 
    o_model: null, 
    s_prompt: 'tell me a long joke!',
    a_o_message: []
}

window.o_state = o_state

o_state.o_model = o_state.a_o_model.find(
    o=>o.id == 'gpt-3.5-turbo'
);
console.log(o_state.o_model)
let f_sleep_n_ms = async function(n_ms){
    return new Promise((f_res)=>{
        window.setTimeout(()=>{
            return f_res(n_ms)
        },n_ms)
    })
}
// window.f_sleep_n_ms = f_sleep_n_ms
let f_scroll_down = function(){
    let o = document.querySelector('.a_o_message');
    if(o){
        o?.scrollTo(0, o?.scrollHeight)
    }
}
let f_n_tokens_from_s = function(s){
    // https://platform.openai.com/tokenizer
    // A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text. This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).
    return s.length/4
}

let f_s_css_clip_path_arc_circle_polygon = function(
    n_radians_nor_max,
    n_points = 32, 
){
    console.log(n_radians_nor_max)
    return `polygon(${[
        new Array(n_points).fill(0).map((n, n_idx)=>{
            let n_radians_nor = (1./n_points)*parseFloat(n_idx);
            if(n_radians_nor > n_radians_nor_max){
                return `50% 50%`
            }
            let n_radians = Math.PI*2*n_radians_nor;
            return `${parseInt((Math.sin(n_radians)*.5+.5)*100)}% ${parseInt((Math.cos(n_radians)*.5+.5)*100)}%`
        }).join(',')
    ]})`
    // clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
}

let f_a_o_js_coins__from_n = function(n_cent){

    let n_len = parseInt(Math.ceil(parseFloat(n_cent)));
    
    return new Array(n_len)
     .fill(0)
     .map((n2, n_idx)=>{
         return {
             style: [
                 'width: 5rem', 
                 'aspect-ratio: 1/1',
                 `background-image: url(${'./US_One_Cent_Obv.png'})`,
                 'background-size: 100%', 
                 ((parseInt(n_idx) == (n_len-1))
                    ? `clip-path:${f_s_css_clip_path_arc_circle_polygon(parseFloat(n_cent)%1)}`
                    : false
                 ),
                
             ].filter(v=>v).join(';')
         }
     })
}
document.body.appendChild(
    await f_o_html__and_make_renderable(
        {
            class: "app",
            a_o: [
                Object.assign(
                    o_state,
                    {
                        o_js__s_output: {
                            f_o_jsh: ()=> {
                                return {
                                    class: "a_o_message",
                                    a_o:[
                                        ...o_state.a_o_message.map(o=>{
                                            let b_bot = o.v_o_completion != null;

                                            return {
                                                class: [
                                                    (b_bot) ? "b_bot": '', 
                                                    'o_message'
                                                ].join(' '),
                                                style: [
                                                    `display: flex`,
                                                    `flex-direction:column`,
                                                    `justify-content: ${(b_bot) ? 'start' : 'end'}`,
                                                    `align-items: ${(b_bot) ? 'start' : 'end'}`,
                                                ].join(';'),
                                                a_o : [
                                                    {
                                                        style: [
                                                            `font-size: .5rem`,
                                                            `color: rgb(132 130 130 / 85%)`,
                                                        ].join(';'),
                                                        innerText: `${
                                                            (b_bot) 
                                                                ? o.v_o_completion.model
                                                                : 'User'
                                                        } - ${f_s_time(o.n_ms_ts)}`
                                                    }, 
                                                    {
                                                        style: [
                                                            'max-width: 90%', 
                                                        ].join(';'),
                                                        innerText: o.s_content
                                                    }
                                                ]
                                            }
                                        })
                                    ]
                                }
                            }
                        }
                    }
                ).o_js__s_output, 
                {
                    class: "inputs", 
                    a_o : [
                        Object.assign(
                            o_state,
                            {
                                o_js__a_o_model: {
                                    f_o_jsh: ()=> {
                                        return {
                                            s_tag: "select", 
                                            a_o: [
                                                ...o_state?.a_o_model.map(o=>{
                                                    return {
                                                        s_tag: 'option', 
                                                        selected: o == o_state.o_model,
                                                        value: o?.id,
                                                        innerText: o?.id
                                                    }
                                                })
                                            ], 
                                            onchange: (o_e)=>{
                                                o_state.o_model = o_state?.a_o_model.find(o=>o.id == o_e.target.value)
                                                o_state?.o_js__price_estimation?._f_render();
                                            }
                                        }
                                    }
                                }
                            }
                        ).o_js__a_o_model,
                        Object.assign(
                            o_state,
                            {
                                o_js__s_input: {
                                    f_o_jsh: ()=> {
                                        return {
                                            s_tag: "textarea", 
                                            rows: 5,
                                            value: o_state.s_prompt,
                                            oninput: (o_e)=>{
                                                o_state.s_prompt = o_e.target.value;
                                                o_state?.o_js__price_estimation?._f_render();
                                            }
                                        }
                                    }
                                }
                            }
                        ).o_js__s_input, 
                        Object.assign(
                            o_state,
                            {
                                o_js__price_estimation: {
                                    f_o_jsh: ()=> {
                                        let n_tokens_input = f_n_tokens_from_s(o_state.s_prompt);
                                        let n_cents_input = n_tokens_input * o_state.o_model?.o_model_pricing?.o_input?.n_price_cents_per_token
                                        return {
                                            a_o: [
                                                {
                                                    s_tag: "h2", 
                                                    innerText: "Estimated costs"
                                                },
                                                {
                                                    a_o: [
                                                        {
                                                            innerText: "Input"
                                                        },
                                                        (
                                                            (o_state.o_model?.o_model_pricing?.o_input?.n_price_cents_per_token)
                                                                ? {
                                                                    style: "display:flex",
                                                                    a_o:f_a_o_js_coins__from_n(n_cents_input)
                                                                }
                                                                : {innerText: 'No costs defined (check total costs (in and output))'}
                                                        ),
                                                        {
                                                            innerText: `${n_cents_input} cents`
                                                        }
                                                    ]
                                                }
        
                                            ].filter(v=>v)
                                        }
                                    }
                                }
                            }
                        ).o_js__price_estimation,
                        {
                            s_tag: "button",
                            innerText: "send", 
                            onclick:async  ()=>{
                                if(o_state.s_prompt.trim()!=''){
                                    let o_message_in = new O_message(
                                        new Date().getTime(), 
                                        o_state.s_prompt, 
                                        f_n_tokens_from_s(o_state.s_prompt)
                                    );
                                    o_state.o_tmp = await(
                                        await(fetch(
                                            o_state.s_url_api,
                                            {
                                                method: "POST", 
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                                },
                                                body: JSON.stringify({
                                                    s_name_function: 'f_s_json__o_completion',
                                                    a_v_arg: [
                                                        crypto.randomUUID(),
                                                        o_state.s_prompt, 
                                                        o_state.o_model.id, 
                                                    ]
                                                }),
                                            }
                                        ))
                                    ).json()
                                    let s_out = o_state.o_tmp.s_out_tmp
                                    o_state.o_message_out = new O_message(
                                        new Date().getTime(),
                                        s_out, 
                                        f_n_tokens_from_s(s_out),
                                        o_state.o_tmp
                                    );
        
                                    o_state.a_o_message.push(o_message_in);
                                    o_state.a_o_message.push(o_state.o_message_out);
        
                                    o_state.s_prompt = '';
                                    await Promise.all(
                                        [
                                            o_state?.o_js__price_estimation?._f_render(),   
                                            o_state.o_js__s_input._f_render(),
                                            o_state.o_js__s_output._f_render(),
                                        ]
                                    )
                                    f_scroll_down();
                                    let f_update = async function(){
                                        let o_tmp = await(
                                            await(fetch(
                                                o_state.s_url_api,
                                                {
                                                    method: "POST", 
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                                    },
                                                    body: JSON.stringify({
                                                        s_name_function: 'f_s_json__o_completion',
                                                        a_v_arg: [
                                                            o_state.o_tmp.s_uuidv4,
                                                        ]
                                                    }),
                                                }
                                            ))
                                        ).json()
                                        console.log(o_tmp);
                                        console.log(o_state.o_tmp);
                                        if(o_tmp.n_ms_wpn != o_state.o_tmp.n_ms_wpn){
                                            o_state.o_tmp = o_tmp
                                            let s_out = o_state.o_message_out.s_content+o_state.o_tmp.s_out_tmp
                                            o_state.o_message_out.s_content = s_out;
                                            o_state.o_message_out.n_tokens_estimated = f_n_tokens_from_s(s_out);
                                            console.log({n_id: o_state.n_id_wsi})
    
                                            await Promise.all(
                                                [
                                                    o_state?.o_js__price_estimation?._f_render(),   
                                                    o_state.o_js__s_input._f_render(),
                                                    o_state.o_js__s_output._f_render(),
                                                ]
                                            )
                                            f_scroll_down();
                                        }
                                        await f_sleep_n_ms(1000)
                                        if(!o_state.o_tmp.b_done){
                                            await f_update()
                                        }
                                    }
                                    f_update();



                                }
                            }
                        },
                    ]
                }
            ]
        }
    )
);
