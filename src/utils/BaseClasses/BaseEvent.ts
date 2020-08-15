import StarrClient from './StarrClient'

export default abstract class BaseEvent {
  constructor(public name: string) {}


  abstract run(client: StarrClient, ...args: any): void;
}
