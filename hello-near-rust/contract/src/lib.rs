use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen};

const DEFAULT_MESSAGE: &str = "Hello";

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    greeting: String,
}

impl Default for Contract {
    // The default trait with which to initialize the contract
    fn default() -> Self {
        Self {
            greeting: DEFAULT_MESSAGE.to_string(),
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    // Public: Returns the stored greeting, defaulting to 'Hello'
    pub fn get_greeting(&self) -> String {
        return self.greeting.clone();
    }

    // Public: Takes a greeting, such as 'howdy', and records it
    pub fn set_greeting(&mut self, greeting: String) {
        // Record a log permanently to the blockchain!
        log!("Saving greeting {}", greeting);
        self.greeting = greeting;
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_default_greeting() {
        let contract = Contract::default();
        // this test did not call set_greeting so should return the default "Hello" greeting
        assert_eq!(contract.get_greeting(), "Hello".to_string());
    }

    #[test]
    fn set_then_get_greeting() {
        let mut contract = Contract::default();
        contract.set_greeting("howdy".to_string());
        assert_eq!(contract.get_greeting(), "howdy".to_string());
    }
}
