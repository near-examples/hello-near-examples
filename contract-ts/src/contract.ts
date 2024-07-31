// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';
import * as borsh from 'borsh';

@NearBindgen({
  serializer(value) {
    return borsh.serialize(schema, value);
  },
  deserializer(value) {
    return borsh.deserialize(schema, value);
  },
})
class HelloNear {
  greeting: string = 'Hello';

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }
}

const schema = {
  struct: { greeting: 'string' },
};
