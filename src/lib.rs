use wasm_bindgen::prelude::*;

// Called when the wasm module is instantiated
#[wasm_bindgen(start)]
fn main() -> Result<(), JsValue> {
    Ok(())
}

#[wasm_bindgen]
pub fn process(input: String, extra_lines: bool) -> String {
    let lines: Vec<_> = input.lines().collect();
    let cleaned_input = lines.join("\n");

    let sections: Vec<_> = cleaned_input
        .split("\n\n")
        .flat_map(|section| section.lines().skip(2))
        .collect();

    match extra_lines {
        true => sections.join("\n\n"),
        false => sections.join("\n")
    }
    
}
