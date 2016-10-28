
/**
 * This file holds code related to a quiz results message for use in all quizzes.
 */

/**
 * Interface to identify a results message type
 */
export interface IResultsMessageType {
  name: string;
  style: any;
}

/**
 * Encapsulates the type of quiz results message.
 */
export const ResultsMessageType: any = {
  success: {name: "success", style: {color: '#0f0'}}, // green
  failure: {name: "failure", style: {color: '#f00'}}, // red
  warning: {name: "warning", style: {color: '#ff0'}}, // yellow
  info: {name: "info", style: {color: '#00f'}}, // blue
  normal: {name: "normal", style: {color: '#000'}}, // black
};

/**
 * Encapsulates quiz results message data
 * @title message title
 * @messageType message type including CSS styling info
 * @content optional content of the message
 */
export class ResultsMessage {

  constructor(private title: string, private messageType: IResultsMessageType, private content?: any[]) {
    this.title = title || "";
    this.messageType = messageType || ResultsMessageType.normal;
    this.content = content || [];
  }

   toString(): string {
     return `
      title: ${this.title},
      messageType: ${this.messageType.name},
      content: ${this.content}
     `;
   }
}


