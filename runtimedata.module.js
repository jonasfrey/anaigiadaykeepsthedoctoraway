
// let s_text = '🔠'
// let s_speak = '🗣️'
// let s_image = '🖼️'
// let s_to = '👉'
// let f_s_chars = function(s_input){
//     s_input = s_input.replaceAll('')
// }

import { f_a_o_model_pricing, f_o as f_o_pricing } from "./pricing.js";

class O_model_info {
    constructor(
        s_name,
        a_o_type_input,
        a_o_type_output,
        a_o_request_parameter,
        v_o_pricing, 
        s_url_api_endpoint
    ) {
        this.s_name = s_name,
        this.a_o_type_input = a_o_type_input
        this.a_o_type_output = a_o_type_output
        this.a_o_request_parameter = (a_o_request_parameter) ? a_o_request_parameter : []
        this.v_o_pricing = v_o_pricing
        this.s_url_api_endpoint = s_url_api_endpoint
    }
}
class O_request_parameter {
    constructor(
        s_name,
        v_default,
        a_v_available_for_select, 
        n_min__for_number, 
        n_max__for_number, 
        n_step__for_number, 
        n_min__for_tokens,
        n_max__for_tokens,
        v, 
    ) {
        this.s_name = s_name
        this.v_default = v_default
        this.a_v_available_for_select = a_v_available_for_select, 
        this.n_min__for_number = n_min__for_number, 
        this.n_max__for_number = n_max__for_number
        this.n_step__for_number = n_step__for_number
        this.n_min__for_tokens = n_min__for_tokens,
        this.n_max__for_tokens = n_max__for_tokens
        this.v = v
    }
}
class O_type {
    constructor(
        a_s_name,
        a_s_emoji
    ) {
        this.a_s_name = a_s_name
        this.a_s_emoji = a_s_emoji
    }
}
let o_type_text = new O_type(
    ['text'],
    ['🔠']
)
let o_type_image = new O_type(
    ['image'],
    ['🖼️']
)
let o_type_audio = new O_type(
    ['audio'],
    ['🗣️']
)

let o_request_parameter__prompt = new O_request_parameter(
    "prompt",
    "",
    null, 
    null, 
    null, 
    null,
    1, 
    4096
);

let a_o_model_info = [
    new O_model_info(
        'gpt-4-vision-preview', 
        [o_type_text], 
        [o_type_image]
    ),
    new O_model_info(
        'dall-e-3', 
        [o_type_text], 
        [o_type_image], 
        [

            new O_request_parameter(
                "size",
                "1024x1024",
                [
                    "1024x1024",
                    "1024x1792",
                    "1792x1024"
                ]
            ),
            new O_request_parameter(
                "quality", 
                "standard", 
                [
                    "hd", 
                    "standard"
                ]
            ),
            new O_request_parameter(
                "n",
                1,
                null, 
                1, 
                1, 
                1,
            ),
            o_request_parameter__prompt,

        ]
    ),
    new O_model_info(
        'dall-e-2', 
        [o_type_text], 
        [o_type_image],
        [
            new O_request_parameter(
                "size",
                "1024x1024",
                [
                    "1024x1024",
                    "1024x1792",
                    "1792x1024"
                ]
            ),
            new O_request_parameter(
                "n",
                1,
                null, 
                1, 
                10, 
                1,
            ),
            o_request_parameter__prompt,
        ]
    ),
    new O_model_info(
        'gpt-4', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-4-turbo-preview', 
        [o_type_text], 
        [o_type_text], 
    ),
    new O_model_info(
        'gpt-3.5-turbo-0613', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-3.5-turbo-1106', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-3.5-turbo-16k', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-4-0613', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-3.5-turbo-16k-0613', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-4-0125-preview', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-3.5-turbo-instruct-0914', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-4-1106-preview', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-3.5-turbo-0125', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-3.5-turbo', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'gpt-3.5-turbo-0301', 
        [o_type_text], 
        [o_type_text]
    ),
    new O_model_info(
        'whisper-1', 
        [o_type_text],
         [o_type_audio]
    ),
    new O_model_info(
        'tts-1', 
        [o_type_text],
         [o_type_audio]
    ),
    new O_model_info(
        'tts-1-1106', 
        [o_type_text],
         [o_type_audio]
    ),
    new O_model_info(
        'text-embedding-3-large', 
        [],
         []
    ),
    new O_model_info(
        'tts-1-hd-1106', 
        [],
         []
    ),
    new O_model_info(
        'tts-1-hd', 
        [],
         []
    ),
    new O_model_info(
        'babbage-002', 
        [],
         []
    ),
    new O_model_info(
        'gpt-3.5-turbo-instruct', 
        [],
         []
    ),
    new O_model_info(
        'davinci-002', 
        [],
         []
    ),
    new O_model_info(
        'text-embedding-ada-002', 
        [],
         []
    ),
    new O_model_info(
        'text-embedding-3-small', 
        [],
         []
    ),
]

a_o_model_info.forEach(o=>{
    if(
        [
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
        ].includes(o.s_name)
    ){

        o.a_o_request_parameter.push(
            o_request_parameter__prompt
        )
        o.s_url_api_endpoint = 'https://api.openai.com/v1/chat/completions'
    }
})

a_o_model_info.forEach(o=>{
    if(
        [
            "dall-e-3",
            "dall-e-2"
        ].includes(o.s_name)
    ){
        o.s_url_api_endpoint = 'https://api.openai.com/v1/images/generations'
    }
})
export {
    a_o_model_info
}