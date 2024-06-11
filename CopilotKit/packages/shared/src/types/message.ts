export abstract class IMessage {
  abstract id: string;
  abstract isDoneStreaming: boolean;
  abstract createdAt: Date;
}

export type Role = "system" | "user" | "assistant";

interface TextMessageParams {
  id: string;
  isDoneStreaming?: boolean;
  role: Role;
  content: string;
  createdAt: Date;
}

export class TextMessage extends IMessage {
  id: string;
  isDoneStreaming: boolean;
  role: Role;
  content: string;
  createdAt: Date;

  constructor(params: TextMessageParams) {
    super();
    this.id = params.id;
    this.isDoneStreaming = params.isDoneStreaming ?? true;
    this.role = params.role;
    this.content = params.content;
    this.createdAt = params.createdAt;
  }
}

interface ActionExecutionMessageParams {
  id: string;
  isDoneStreaming?: boolean;
  name: string;
  arguments: string;
  scope: "client" | "server";
  createdAt: Date;
}

export class ActionExecutionMessage extends IMessage {
  id: string;
  isDoneStreaming: boolean;
  name: string;
  arguments: any;
  scope: "client" | "server";
  createdAt: Date;

  constructor(params: ActionExecutionMessageParams) {
    super();
    this.id = params.id;
    this.isDoneStreaming = params.isDoneStreaming ?? true;
    this.name = params.name;
    this.arguments = params.arguments;
    this.scope = params.scope;
    this.createdAt = params.createdAt;
  }
}

interface ResultMessageParams {
  id: string;
  isDoneStreaming?: boolean;
  actionExecutionId: string;
  result: string;
  createdAt: Date;
}

export class ResultMessage extends IMessage {
  id: string;
  isDoneStreaming: boolean;
  actionExecutionId: string;
  result: string;
  createdAt: Date;

  constructor(params: ResultMessageParams) {
    super();
    this.id = params.id;
    this.isDoneStreaming = params.isDoneStreaming ?? true;
    this.actionExecutionId = params.actionExecutionId;
    this.result = params.result;
    this.createdAt = params.createdAt;
  }

  static decodeResult(result: string): any {
    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  }

  static encodeResult(result: any): string {
    if (result === undefined) {
      return "";
    } else if (typeof result === "string") {
      return result;
    } else {
      return JSON.stringify(result);
    }
  }
}
