/**
 * Holds code related to a quiz results message for use in all quizzes.
 */

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
 * @content content of the message 
 */	
export class ResultsMessage {
	constructor(title='', messageType=ResultsMessageType.normal, content='') {
		this.title = title;
		this.messageType = messageType;
		this.content = content;		
	}
	
}


