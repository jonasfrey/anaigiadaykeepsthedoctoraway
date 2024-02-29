
import {
    f_o_js as f_o_js__tooltip
} from "https://deno.land/x/f_o_html_from_o_js@2.8/localhost/jsh_modules/tooltip/mod.js"
import {
    f_o_html__and_make_renderable,
}
from 'https://deno.land/x/f_o_html_from_o_js@2.9/mod.js'
import {
    f_display_test_selection_or_run_selected_test_and_print_summary,
    f_o_test
} from "https://deno.land/x/deno_test_server_and_client_side@1.1/mod.js"

// console.log(showdown)
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@1.1/mod.js"

import {
    f_s_ymd__from_n_ts_ms_utc
} from "https://deno.land/x/date_functions@1.4/mod.js"


let f_s_date = function(n_ms_ts){

    let o_date = new Date(n_ms_ts);
    const a_s_day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const a_s_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const s_day_of_week = a_s_day[o_date.getDay()];
    const n_day_of_month = o_date.getDate();
    const s_month = a_s_month[o_date.getMonth()];
    const n_year = o_date.getFullYear();
    
    return `${s_day_of_week}, ${n_day_of_month} ${s_month} ${n_year}`;
}
let n = 0.7
o_variables.o_hsla__fg.n_x = n + (Math.random()*(1.-n))
o_variables.o_hsla__fg.n_y = n + (Math.random()*(1.-n))
o_variables.o_hsla__fg.n_z = n + (Math.random()*(1.-n))
o_variables.o_hsla__fg.n_w = 0.9
o_variables.n_rem_font_size_base = 1.2 // adjust font size, other variables can also be adapted before adding the css to the dom
o_variables.n_rem_padding_interactive_elements = 0.6; // adjust padding for interactive elements 
f_add_css(
    `
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
    .tooltip {
        background: rgba(0,0,0,0.78);
        padding: 0.3rem;
        border-radius: 3px;
    }
    .app{
        overflow:hidden;
        min-height:100vh;
        max-height:100vh;
        min-width:100vw;
        max-width:100vw;
        display: flex;
        align-items:center;
        justify-content: space-between;
        flex-direction: column;
    }
    .flexcenter{
        display: flex;
        align-items:center;
        justify-content: center;
        flex-direction: column;
    }
    .bgimg{
        height: 100vh;
        width: 100vw;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    
    }
    .text{
        padding: 0.6rem;
        margin: 0.6rem 0;
        background-color: rgba(0,0,0,0.7);
        border-radius: 9px;
        max-width: 900px;
    }
    ${
        f_s_css_from_o_variables(
            o_variables
        )
    }
    `
);

let s_ymd = f_s_ymd__from_n_ts_ms_utc(new Date().getTime(), 'UTC');
let s_domain = 'localhost';
if(window.location.href.includes('deno.dev')){
    s_domain = 'thisisaweb.site'
}
let s_url_api = `http://${s_domain}:8080/cors_allowed/${s_ymd}`
let s_url_file_json_ymd = `${s_url_api}/o_generation_info_${s_ymd}.json`
let s_url_file_wav_ymd = `${s_url_api}/generation${s_ymd}.wav`
let s_url_file_png_ymd = `${s_url_api}/generation${s_ymd}.png`

var o_el_link = document.querySelector("link[rel~='icon']");
if (!o_el_link) {
    o_el_link = document.createElement('link');
    o_el_link.rel = 'icon';
    document.head.appendChild(o_el_link);
}
o_el_link.href = s_url_file_png_ymd;

let o_state = {
    o_generation_info: await(await(fetch(
        s_url_file_json_ymd
    ))).json(), 
    s_ymd,
    s_url_api,
    s_url_file_json_ymd,
    s_url_file_wav_ymd,
    s_url_file_png_ymd,
    o_state__tooltip: {}
}
window.o_state = o_state
document.body.appendChild(
    await f_o_html__and_make_renderable(
        {
            class: "app",
            a_o : [
                f_o_js__tooltip(o_state.o_state__tooltip),
                {
                    class: "bgimg",
                    style: [
                        `background-image: url(${o_state.s_url_file_png_ymd})`
                    ].join(';')
                },
                //
                {
                    class: 'flexcenter',
                    a_o: [
                        {
                            class: 'text',
                            s_tag: "h1", 
                            innerText: "An AIGI a day, keeps the doctor away!",
                        },
                        {
                            class: 'text',
                            s_tag: "h2",
                            innerText: f_s_date(new Date().getTime())
                        }, 
                    ]
                },
                {
                    class: 'flexcenter',
                    a_o: [

                        {
                            data_tooltip: 'This audio was also generated by AI',
                            s_tag: "audio", 
                            controls:true,
                            autoplay: true, 
                            muted: true,
                            loop: true,
                            a_o:[
                                {
                                    s_tag: 'source',
                                    src: o_state.s_url_file_wav_ymd
                                }, 
                                {
                                    class: 'text',
                                    innerText: "This browser does not support the audio element."
                                }
                            ]
                        },
                        {
                            data_tooltip: 'This was the input prompt used to generate the image.',
                            class: 'text',
                            s_tag: 'h2',
                            innerText: o_state?.o_generation_info?.o_generation_image?.o_request_data?.prompt
                        }
                    ]
                },
                

            ]
        }
    )
);
