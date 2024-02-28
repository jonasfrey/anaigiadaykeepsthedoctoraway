// https://openai.com/pricing
import {
    f_o_html__from_s_url
} from "https://deno.land/x/handyhelpers@3.5/mod.js";
import { f_o_config } from "./functions.module.js";

import {
    O_pricing
} from "./classes.module.js"

const o_url_script = new URL(import.meta.url);
const s_path_abs_folder_current_script = o_url_script.pathname.split('/').slice(0,-1).join('/');    

const s_path_rel_file_o__cached = `./o_pricing.json`;
const s_path_abs_file_o__cached = `${s_path_abs_folder_current_script}/${s_path_rel_file_o__cached}`;


function f_o_price_and_tokens(priceString) {
    const pricePattern = /\$(\d+\.\d+)/; // Pattern to match the price
    const tokenPattern = /(\d+)(K)? tokens/; // Pattern to match the token quantity, including 'K' for thousands

    const priceMatch = priceString.match(pricePattern);
    const tokenMatch = priceString.match(tokenPattern);

    let price = null;
    let tokens = null;

    if (priceMatch) {
        price = parseFloat(priceMatch[1]);
    }

    if (tokenMatch) {
        tokens = parseInt(tokenMatch[1], 10);
        if (tokenMatch[2] === 'K') { // If 'K' is present, multiply by 1000 to convert to an integer
            tokens *= 1000;
        }
    }

    return { 
        n_price_dollars: price,
        n_tokens: tokens, 
        n_price_dimes_per_token: (price*10)/tokens,
        n_price_cents_per_token: (price*100)/tokens,
        n_price_dollars_per_token: price/tokens
     };
}


let f_a_o_section_from_o_doc = function(o_doc){

    // if(window.document){
    //     o_doc = document
    // }

    let a_o_section = Array.from(o_doc.querySelectorAll('.container')).map(o_el_container=>{
        let o_section = {};
        o_section.s_inner_text = o_el_container.innerText
        o_section.s_heading = o_el_container?.querySelector('h3')?.innerText;
        o_section.a_o_table = Array.from(o_el_container.querySelectorAll('table')).map(o_el_table =>{
            
            let a_o_row = Array.from(o_el_table.querySelectorAll('tr'));
    
            let a_s_prop = Array.from(a_o_row[0].querySelectorAll('td')).map(o_el_tr=>{return o_el_tr?.innerText});
            // console.log(a_s_prop)
            let a_o_entry = a_o_row.slice(1).map(
                o_el_tr=>{
                    let a_s_val = Array.from(o_el_tr.querySelectorAll('td')).map(o_el_tr=>{return o_el_tr?.innerText});
                    return Object.assign(
                        {}, 
                        ...a_s_prop.map(
                            (s,n_idx)=>{
                                let o = {}
                                if(['Input'].includes(s)){
                                    Object.assign(
                                        o, 
                                        {
                                            o_input: f_o_price_and_tokens(a_s_val[n_idx])
                                        }
                                    )
                                }
                                if(['Output'].includes(s)){
                                    Object.assign(
                                        o, 
                                        {
                                            o_output: f_o_price_and_tokens(a_s_val[n_idx])
                                        }
                                    )
                                }
                                if(['Usage'].includes(s)){
                                    Object.assign(
                                        o, 
                                        {
                                            o_usage: f_o_price_and_tokens(a_s_val[n_idx])
                                        }
                                    )
                                }
                                if(['Training'].includes(s)){
                                    Object.assign(
                                        o, 
                                        {
                                            o_usage: f_o_price_and_tokens(a_s_val[n_idx])
                                        }
                                    )
                                }
                                return Object.assign(
                                    o,
                                    {
                                        [s]: a_s_val[n_idx]
                                    }
                                )
                            }
                        )
                    )
                }
            )
            return {a_o_entry}
            
        })
        return o_section;
    })
    return a_o_section
}


let f_o = async function(
    b_force_refetch_and_overwrite = false
){
    let n_ms_ts_fetched = new Date().getTime()
    let o_config = await f_o_config();
    let o = {}
    try {
        o = JSON.parse(
            await Deno.readTextFile(
                s_path_abs_file_o__cached
            )
        );
        if(Math.abs(n_ms_ts_fetched - o?.n_ms_ts_fetched) > o_config.o_pricing__n_ms_ts_fetched_max){
            b_force_refetch_and_overwrite = true
        }
    } catch (error) {
        b_force_refetch_and_overwrite = true
    }
    if(b_force_refetch_and_overwrite){
        let o_doc = await f_o_html__from_s_url('https://openai.com/pricing')

        o = new O_pricing(
            o_doc.innerHTML, 
            f_a_o_section_from_o_doc(o_doc),
            n_ms_ts_fetched
        );
        await Deno.writeTextFile(
            s_path_abs_file_o__cached,
            JSON.stringify(o,null, 4)
        )
    }
    return o

}
let f_a_o_model_pricing = async function(
    b_force_refetch_and_overwrite = false
){
    let o_pricing = await f_o(b_force_refetch_and_overwrite)
    let a_o_entry = [
      o_pricing.a_o_section.map(o=>{
        return o?.a_o_table.map(o_table=>{
          return o_table.a_o_entry
        })
      })
    ].flat(3)
    // console.log(a_o_entry)
    return a_o_entry
}

export {
    f_o,
    f_a_o_model_pricing
}