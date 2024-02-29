
import {
    f_o_js as f_o_js__tooltip
} from "https://deno.land/x/f_o_html_from_o_js@2.8/localhost/jsh_modules/tooltip/mod.js"

import {
    f_display_test_selection_or_run_selected_test_and_print_summary,
    f_o_test
} from "https://deno.land/x/deno_test_server_and_client_side@1.1/mod.js"

// import showdown from './showdownjs-showdown-7cbadb8/dist/showdown.min.js';
let o_showdown_md_to_html_converter = new showdown.Converter();
// console.log(showdown)
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@1.1/mod.js"

import {
    O_vec2
} from "https://deno.land/x/vector@0.8/mod.js"

let s_to = '👉'

class O_message {
    constructor(
        n_ms_ts, 
        s_content,
        n_tokens_estimated,
        v_o_completion,
        v_s_url_image
    ){
        this.n_ms_ts = n_ms_ts, 
        this.s_content = s_content,
        this.n_tokens_estimated = n_tokens_estimated
        this.v_o_completion = v_o_completion
        this.v_s_url_image = v_s_url_image
    }
}

o_variables.n_rem_font_size_base = 1.2 // adjust font size, other variables can also be adapted before adding the css to the dom
o_variables.n_rem_padding_interactive_elements = 0.6; // adjust padding for interactive elements 
f_add_css(
    `
    img{
        max-width: 100%;
    }
    /* Style for code blocks */
    pre code {
        display: block;
        padding: 0.5em;
        overflow-x: auto;
        background-color: #f6f8fa; /* Light grey background */
        border: 1px solid #ccc; /* Border around the code block */
        border-radius: 4px; /* Rounded corners */
    }
    
    /* Style for inline code */
    code {
        padding: 0.2em 0.4em;
        background-color: rgba(27,31,35,0.05); /* Light grey background */
        border-radius: 3px; /* Rounded corners */
    }
    
    /* Ensure strong text is bold */
    strong {
        font-weight: bold;
    }
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
    h1, h2, h3, h4, h5, h6, p, li, div {
        line-height: 150% !important;
    }
    .app{
        max-width: 900px;
        margin: 0 auto;
        font-family: Inter, sans-serif;
        font-weight: 300;
        font-style: normal;
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
from 'https://deno.land/x/f_o_html_from_o_js@2.9/mod.js'

let f_s_time = function(n_ms_ts){
    let o_date = new Date(n_ms_ts);
    return [
        o_date.getHours().toString().padStart(2, '0'),
        o_date.getMinutes().toString().padStart(2, '0'),
        o_date.getMinutes().toString().padStart(2, '0'),
    ].join(':')
}

let s_port = window.location.port;
let s = window.location.hostname;
let s_url_api = `${window.location.protocol}//${window.location.hostname}:${s_port}`



let a_o_model_info = (await(
    await(fetch(
        s_url_api, 
        {
            method: "POST", 
            body: JSON.stringify(
                {
                    s_name_function: 'f_s_json__a_o_model_info'
                }
            )
        }
    ))
).json());
let o_state = {
    a_o_model_info: a_o_model_info,
    b_display_settings: false, 
    o_message_out: null,
    o_tmp: null,
    n_id_wsi: 0,
    s_url_api: s_url_api,
    s_text: 'hello',
    o_req_data: {},
    a_o_model: 
    (await(
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
    ).json()).map(o=>{    
        o.v_o_model_info = a_o_model_info.find(o2=>o2.s_name == o?.id);
        console.log(o)
        return o
    }).sort((o,o2)=>{
        let n_idx1 = a_o_model_info.map(o=>o.s_name).indexOf(o?.id);
        let n_idx2 = a_o_model_info.map(o=>o.s_name).indexOf(o2?.id);
        return n_idx1-n_idx2
    }),
    o_model: null, 
    s_prompt: 'geh du dies, geh du das',
    a_o_message: []
}

window.o_state = o_state

let o_model = o_state.a_o_model.find(
    o=>o.id == 'gpt-3.5-turbo-16k-0613'
);
if(o_model){
    o_state.o_model = o_model
}
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
    hljs.initHighlightingOnLoad({
        style: 'agate' // This will change the theme to Monokai
      });
    hljs.highlightAll();
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
                        o_js__settings: {
                            f_o_jsh: ()=>{
                                return {
                                    innerText: 'hi'
                                }
                            }
                        }      
                    }
                ).o_js__settings,
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
                                                        b_render: (o.s_content && o.s_content.trim() != ''),
                                                        style: [
                                                            'max-width: 90%', 
                                                        ].join(';'),
                                                        
                                                        innerHTML:  marked.parse(
                                                        // innerHTML:  o_showdown_md_to_html_converter.makeHtml(
                                                            o.s_content
                                                        )
                                                    },
                                                    {
                                                        b_render: (o.v_s_url_image),
                                                        s_tag: 'img', 
                                                        src: o.v_s_url_image
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
                                                    let s_icons = [
                                                        o?.v_o_model_info?.a_o_type_input.map(o2=>{
                                                            return o2.a_s_emoji[0]
                                                        }),
                                                        o?.v_o_model_info?.a_o_type_output.map(o2=>{
                                                            return o2.a_s_emoji[0]
                                                        })
                                                    ].join(s_to)
                                                    
                                                    return {
                                                        s_tag: 'option', 
                                                        selected: o == o_state.o_model,
                                                        value: o?.id,
                                                        innerText: [
                                                            o?.id, 
                                                            (
                                                                (s_icons) 
                                                                    ? s_icons
                                                                    : false
                                                            )
                                                        ].filter(v=>v).join(' - ')
                                                    }
                                                })
                                            ], 
                                            onchange: (o_e)=>{
                                                o_state.o_model = o_state?.a_o_model.find(o=>o.id == o_e.target.value)
                                                o_state?.o_js__price_estimation?._f_render();
                                                o_state?.o_js__input?._f_render();
                                            }
                                        }
                                    }
                                }
                            }
                        ).o_js__a_o_model,
                        Object.assign(
                            o_state,
                            {
                                o_js__input: {
                                    f_o_jsh: ()=> {
                                        console.log(
                                            o_state?.o_model?.v_o_model_info?.a_o_request_parameter
                                        )
                                        return {
                                            a_o: [
                                                ...[
                                                    (o_state?.o_model?.v_o_model_info?.a_o_request_parameter) 
                                                        ? o_state?.o_model?.v_o_model_info?.a_o_request_parameter?.map(
                                                            o2=>{
                                                                console.log(o2)
                                                                if(o2.a_v_available_for_select?.length > 0){
                                                                    return {
                                                                        s_tag: "select", 
                                                                        a_o: [
                                                                            ...o2.a_v_available_for_select.map(v=>{
                                                                                
                                                                                return {
                                                                                    s_tag: 'option', 
                                                                                    selected: v == o2.v,
                                                                                    value: v,
                                                                                    innerText: v
                                                                                }
                                                                            })
                                                                        ], 
                                                                        onchange: (o_e)=>{
                                                                            o2.v = o_e.target.value;
                                                                        }
                                                                    }
                                                                }
                                                                if(o2.n_min__for_tokens > 0){
                                                                    return {
                                                                        s_tag: "textarea", 
                                                                        value: o2.v,
                                                                        oninput: (o_e)=>{
                                                                            o_state.s_prompt = o_e.target.value;
                                                                            o2.v = o_e.target.value;
                                                                            o_state?.o_js__price_estimation?._f_render();
                                                                        }
                                                                    }
                                                                }
                                                                if(o2.n_min__for_number > 0){
                                                                    return {
                                                                        s_tag: "input",
                                                                        type: 'number',
                                                                        min:  o2.n_min__for_number, 
                                                                        max: o2.n_max__for_number,
                                                                        step: o2.n_step__for_number,
                                                                        value: (o2.v) ? o2.v : o2.v_default,
                                                                        oninput: (o_e)=>{
                                                                            let n = parseFloat(o_e.target.value); 
                                                                            o2.v = n;
                                                                        }
                                                                    }
                                                                }

                                                            }
                                                        )
                                                        : false
                                                ].filter(v=>v)
                                                
                                                // {   
                                                //     s_tag: "textarea", 
                                                //     rows: 5,
                                                //     value: o_state.s_prompt,
                                                //     oninput: (o_e)=>{
                                                //         o_state.s_prompt = o_e.target.value;
                                                //         o_state?.o_js__price_estimation?._f_render();
                                                //     }
                                                // }
                                            ]
                                        } 
                                    }
                                }
                            }
                        ).o_js__input, 
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

                                    o_state.o_message_out = new O_message(
                                        new Date().getTime(),
                                        '', 
                                        f_n_tokens_from_s(''),
                                        o_state.o_tmp
                                    );
        
                                    o_state.a_o_message.push(o_message_in);
                                    o_state.a_o_message.push(o_state.o_message_out);
                                    let s_tmp = '';

                                    let o_reader = null;


                                    fetch(
                                        o_state.s_url_api,
                                        {
                                            method: "POST", 
                                            headers: {
                                                "Content-Type": "application/json",
                                                // 'Content-Type': 'application/x-www-form-urlencoded',
                                            },
                                            body: JSON.stringify({
                                                s_name_function: 'f_o_stream__o_completion',
                                                o_param: Object.assign(
                                                    {
                                                        s_name_model: o_state?.o_model?.id,
                                                    },
                                                    ...o_state?.o_model?.v_o_model_info?.a_o_request_parameter.map(o=>{
                                                        if(!o.v){
                                                            return false
                                                        }
                                                        return {
                                                            [o.s_name] : o.v
                                                        }
                                                    }).filter(v=>v)
                                                )
                                            }),
                                        }
                                    )
                                    .then(async o_response => {
                                        const transferEncoding = o_response.headers.get('Transfer-Encoding');
                                        if (
                                            ![
                                                "dall-e-3",
                                                "dall-e-2"
                                            ].includes(o_state.o_model?.id)
                                            
                                            // transferEncoding && transferEncoding.includes('chunked')
                                            ) {
                                        //   console.log('Response is chunked.');

                                          o_reader = o_response.body.getReader();
                                          console.log(o_reader)
                                          let o = {done:false}
  
                                          while(!o.done){
                                              o = await o_reader.read();
                                              let a_n_u8 = o.value;
                                              let s = new TextDecoder().decode(a_n_u8);
                                              let a_o = s.split('\n\n').map(async s=>{
                                                  let s_json = s.substring('data: '.length);
                                                  if(['', '[DONE]'].includes(s_json.trim())){return false}
                                                  console.log(s_json)
                                                  let o = JSON.parse(s_json);
                                                  o_state.o_message_out.n_ms_ts = o.created*1000;
                                                  console.log(o_state.o_message_out.n_ms_ts)
                                                  o_state.o_message_out.v_o_completion = o;
                                                  if(o?.choices?.[0]?.delta?.content){
                                                      o_state.o_message_out.s_content += o.choices[0].delta.content
                                                  }
  
                                                  o_state.o_js__s_output._f_render()
                                                  f_scroll_down();
                                                  
                                                  return o
                                              });
  
                                             
                                          }

                                          
                                        } else {
                                            o_state.o_message_out.v_o_completion  = await o_response.json();
                                            o_state.o_message_out.v_s_url_image = o_state.o_message_out.v_o_completion?.data[0]?.url
                                            o_state.o_js__s_output._f_render()
                                            f_scroll_down();
                                        //   console.log('Response is not chunked.');
                                        }
                                        if(!o_response.ok){
                                            throw new Error(`HTTP error! status: ${o_response.status}`);
                                        }


                                    })

                                    .catch(error => {
                                      console.error('Fetch error:', error);
                                    });
                                    



        
                                    // o_state.s_prompt = '';

                                }
                            }
                        },
                    ]
                }
            ]
        }
    )
);
