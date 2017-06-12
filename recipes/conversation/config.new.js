/*
User-specific configuration
    ** IMPORTANT NOTE ********************
    * Please ensure you do not interchange your username and password.
    * Hint: Your username is the lengthy value ~ 36 digits including a hyphen
    * Hint: Your password is the smaller value ~ 12 characters
*/ 

exports.conversationWorkspaceId = ''; // replace with the workspace identifier of your conversation

// Create the credentials object for export
exports.credentials = {};

// Watson Conversation
// https://www.ibm.com/watson/developercloud/conversation.html
exports.credentials.conversation = {
	"username": "",
	"password": ""
};

// Watson Speech to Text
// https://www.ibm.com/watson/developercloud/speech-to-text.html
exports.credentials.speech_to_text = {
    password: '',
    username: ''
};

exports.credentials.text_to_speech = {
    password: '',
    username: ''
};

exports.conversationWorkspaceId = ''

exports.robot = {}
exports.robot.gender = ''
exports.robot.name = ''

exports.listen = {}
exports.listen.language = ''

exports.speak = {}
exports.speak.language = ''

