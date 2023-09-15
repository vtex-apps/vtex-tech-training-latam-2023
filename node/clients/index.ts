import { IOClients } from "@vtex/api";
import { SqsClient } from "./events";

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {

  public get sendEvents() {
    return this.getOrSet('sqsClient', SqsClient)
  }

}
