/*
 * Example smart contract written in JavaScript
 *
 */

import { NearContract, NearBindgen, near, call, view } from 'near-sdk-js'

// Define the default message
const DEFAULT_MESSAGE: string = "Hello";

// Define the contract structure
@NearBindgen
class Contract extends NearContract {
    message: string;

    // Define the constructor, which sets the message equal to the default message.
    constructor() {
        super()
        this.message = DEFAULT_MESSAGE;
    }

    @call
    // Public method - accepts a greeting, such as "howdy", and records it
    set_greeting({ message }: { message: string }) {
        near.log(`Saving greeting ${message}`)
        this.message = message;
    }
    
    @view
    // Public method - returns the greeting saved, defaulting to DEFAULT_MESSAGE
    get_greeting(): string {
        return this.message;
    }
}