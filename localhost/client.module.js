
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


o_variables.n_rem_font_size_base = 1.2 // adjust font size, other variables can also be adapted before adding the css to the dom
o_variables.n_rem_padding_interactive_elements = 0.6; // adjust padding for interactive elements 
f_add_css(
    `
    .app{
        display: flex;
        flex-direction:column;
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



let o_state = {
    s_text: 'hello',
    a_o_model: await(
        await(fetch(
            '/a_o_model'
        ))
    ).json(), 
    o_model: null, 
    s_prompt: '',
    a_o_completion: [], 
    a_s_in_out_put: []
}

window.o_state = o_state

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
                        o_js__a_o_model: {
                            f_o_jsh: ()=> {
                                return {
                                    s_tag: "select", 
                                    a_o: [
                                        ...o_state?.a_o_model.map(o=>{
                                            return {
                                                s_tag: 'option', 
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
                            let o_completion = await(
                                await(fetch(
                                    '/o_completion', 
                                    {
                                        method: "POST", 
                                        headers: {
                                            "Content-Type": "application/json",
                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        body: JSON.stringify({
                                            s_prompt: o_state.s_prompt, 
                                            s_model: o_state.o_model.id
                                        }),
                                    }
                                ))
                            ).json()
                            o_state.a_o_completion.push(o_completion);
                            o_state.a_s_in_out_put.push(o_state.s_prompt);
                            o_state.a_s_in_out_put.push(o_completion?.choices?.[0]?.message.content);
                            o_state.s_prompt = '';
                            await Promise.all(
                                [
                                    o_state?.o_js__price_estimation?._f_render(),   
                                    o_state.o_js__s_input._f_render(),
                                    o_state.o_js__s_output._f_render(),
                                ]
                            )
                        }
                    }
                },
                Object.assign(
                    o_state,
                    {
                        o_js__s_output: {
                            f_o_jsh: ()=> {
                                return {
                                    a_o:[
                                        ...o_state.a_s_in_out_put.map(s=>{
                                            return {
                                                innerText: s
                                            }
                                        })
                                    ]
                                }
                            }
                        }
                    }
                ).o_js__s_output, 

            ]
        }
    )
);
