
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
from 'https://deno.land/x/f_o_html_from_o_js@2.7/mod.js'

let f_s_time = function(n_ms_ts){
    let o_date = new Date(n_ms_ts);
    return [
        o_date.getHours().toString().padStart(2, '0'),
        o_date.getMinutes().toString().padStart(2, '0'),
        o_date.getMinutes().toString().padStart(2, '0'),
    ].join(':')
}

let s_port = window.location.port;
let s_url_api = `${window.location.protocol}//${window.location.hostname}:${s_port}`
let o_state = {
    b_display_settings: false, 
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
    s_prompt: 'make a text with the most common markdown elements that i can use to test my markdown to html script toghteher with my css styling',
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
                                                        style: [
                                                            'max-width: 90%', 
                                                        ].join(';'),
                                                        
                                                        innerHTML:  marked.parse(
                                                        // innerHTML:  o_showdown_md_to_html_converter.makeHtml(
                                                            o.s_content
                                                        )
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

                                    o_state.o_message_out = new O_message(
                                        new Date().getTime(),
                                        '', 
                                        f_n_tokens_from_s(''),
                                        o_state.o_tmp
                                    );
        
                                    o_state.a_o_message.push(o_message_in);
                                    o_state.a_o_message.push(o_state.o_message_out);
                                    let s_tmp = '';

                                    let f_processChunk = function(chunkStr) {
                                    s_tmp += chunkStr;
                                    let delimiterIndex;
                                    // Assuming SSE-like messages end with double newlines
                                    while ((delimiterIndex = s_tmp.indexOf('\n\n')) !== -1) {
                                        const message = s_tmp.substring(0, delimiterIndex);
                                        s_tmp = s_tmp.substring(delimiterIndex + 2);

                                        if (message.startsWith('data: ')) {
                                        const data = message.substring(6);
                                        // Process the data portion here
                                        }
                                    }
                                    }
                                    let o_reader = null;
                                    let f_process_a_n_u8 = function(v){
                                        console.log(v)
                                        // console.log(
                                        //     {
                                        //         a_n_u8, 
                                        //         s: new TextDecoder.decode(a_n_u8)
                                        //     }
                                        // )
                                        // if()
                                    }

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
                                                a_v_arg: [
                                                    o_state.s_prompt, 
                                                    o_state.o_model.id,
                                                ]
                                            }),
                                        }
                                    )
                                    .then(async o_response => {
                                        if(!o_response.ok){
                                            throw new Error(`HTTP error! status: ${o_response.status}`);
                                        }
                                        o_reader = o_response.body.getReader();
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

                                                return o
                                            });

                                            await o_state.o_js__s_output._f_render(),
                                            f_scroll_down();
                                        }

                                        // o_reader.read().then(function f_process_read_returnvalue({ done, value }) {
                                        //     // Result objects contain two properties:
                                        //     // done  - true if the stream has already given you all its data.
                                        //     // value - some data. Always undefined when done is true.
                                        //     if (done) {
                                        //       console.log("Stream complete");
                                        //       return;
                                        //     }
                                        //     let a_n_u8 = value;
                                        //     let s = new TextDecoder().decode(a_n_u8);
                                        //     console.log(s)
                                        
                                        //     // Read some more, and call this function again
                                        //     return o_reader.read().then(f_process_read_returnvalue);
                                        //   });

                                    })
                                    // .then(stream => {
                                    //   console.log(stream)
                                    //     // The new stream can be consumed directly
                                    //   return new Response(stream).text();
                                    // })
                                    // .then(text => {
                                    //     console.log(text)
                                    //   console.log(text);
                                    //   // Process the text
                                    // })
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
