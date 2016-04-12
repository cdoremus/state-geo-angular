
/**
 * This file holds code related to a quiz results message for use in all quizzes.
 */

/**
 * Interface to identify a results message type
 */
export interface IResultsMessageType {
  name: string;
  style: string;
}

/**
 * Encapsulates the type of quiz results message.
 */
export const ResultsMessageType = {
  success: {name:"success", style:"color:green"},
  failure: {name:"failure", style:"color:red"},
  warning: {name:"warning", style:"color:yellow"},
  info: {name:"info", style:"color:blue"},
  normal: {name:"normal", style:"color:black"}
};

/**
 * Encapsulates quiz results message data
 * @title message title
 * @messageType message type including CSS styling info
 * @content optional content of the message
 */
export class ResultsMessage {
  // content: any[];
  constructor(private title: string, private messageType: IResultsMessageType, private content?: any[]) {
    this.title = title || "";
    this.messageType = messageType || ResultsMessageType.normal;
    this.content = content || [];
  }

   toString() {
     return `
      title: ${this.title},
      messageType: ${this.messageType.name},
      content: ${this.content}
     `;
   }
}


