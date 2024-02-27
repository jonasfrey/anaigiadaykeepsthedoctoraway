import {
  f_o_config
} from "./functions.module.js"

import { f_a_o_model_pricing, f_o as f_o_pricing } from "./pricing.js";

//npm install --save openai
// you can still run with 'deno run -A script.js' since deno is node compatible

const o_url_script = new URL(import.meta.url);
const s_path_abs_folder_current_script = o_url_script.pathname.split('/').slice(0,-1).join('/');    
let o_config = await f_o_config();

import OpenAI from "openai";

const openai = new OpenAI(
    {
        apiKey: o_config.s_api_key
    }
);
console.log(
  await openai.models.list()
  // openai.models//.Model.list()
)

// console.log(
//   await openai.usage;
//   // openai.usage.list()
// )
let s_model = "gpt-4-1106-preview" 
// let s_model = "gpt-3.5-turbo" 
let a_o_model_pricing = await f_a_o_model_pricing(true);
let o_model_pricing = a_o_model_pricing.find(o=>{
  return o?.Model == s_model
});
console.log(a_o_model_pricing);
console.log(o_model_pricing)

const completion = await openai.chat.completions.create({
  messages: [{ role: "system", content: "Give five sentances. Once upon a time..." }],
  model: s_model,
});


let o_cost = {
  o_input: {
    n_tokens_prompt: completion.usage?.prompt_tokens, 
    n_cost_cents: completion.usage?.prompt_tokens * o_model_pricing?.o_input?.n_price_cents_per_token
  },
  o_output: {
    n_tokens_completion: completion.usage?.completion_tokens, 
    n_cost_cents: completion.usage?.completion_tokens * o_model_pricing?.o_output?.n_price_cents_per_token
  },
  o_in_and_out_put: {
    n_tokens_completion: completion.usage?.prompt_tokens+completion.usage?.completion_tokens, 
    n_cost_cents: (
      completion.usage?.completion_tokens * o_model_pricing?.o_output?.n_price_cents_per_token
      + completion.usage?.prompt_tokens * o_model_pricing?.o_input?.n_price_cents_per_token
    )
  },
  o_usage: {
    n_tokens_completion: completion.usage?.prompt_tokens+completion.usage?.completion_tokens, 
    n_cost_cents: (
      (completion.usage?.prompt_tokens+completion.usage?.completion_tokens) * o_model_pricing?.o_usage?.n_price_cents_per_token
    )
  }
}
console.log(completion)
console.log(completion.choices[0]?.message.content);
console.log({
  o_cost_estimated: o_cost
})

// const stream = await openai.chat.completions.create({
//   model: 'gpt-4',
//   messages: [{ role: 'user', content: 'Tell me a short joke' }],
//   stream: true,
// });
// console.log(stream)
// for await (const chunk of stream) {
//   console.log(chunk)
//   // Deno.stdout.write(new TextEncoder().encode(str))
//   Deno.stdout.write(
//     new TextEncoder().encode(
//       chunk.choices[0]?.delta?.content || ''
//     )
//   )
// }
// console.log(stream)