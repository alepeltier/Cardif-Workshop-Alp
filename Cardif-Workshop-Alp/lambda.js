let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);

exports.handler = async (event) => {
    debugger;

    let message = event['message']

    try {
        let result = await sqs.sendMessage({
            MessageBody: message,
            QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/message-queue-alp`,
            DelaySeconds: '0',
            MessageAttributes: {}
        }).promise();

        console.log("Successfully sent message", message);

        return {
            "message": message,
            "messageId": result.messageId
        }

    } catch (error) {
        console.log("Sending failed for message", message, error);
        return "Sending failed";
    }
};