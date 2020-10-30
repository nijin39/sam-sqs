let response;
var AWS = require("aws-sdk");
AWS.config.update({ region: "REGION" });
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

exports.lambdaHandler = async (event, context) => {
  var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 10,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "The Whistler",
      },
      Author: {
        DataType: "String",
        StringValue: "John Grisham",
      },
      WeeksOn: {
        DataType: "Number",
        StringValue: "6",
      },
    },
    MessageBody:
      "Information about current NY Times fiction bestseller for week of 12/11/2016.",
      QueueUrl: "https://sqs.ap-northeast-2.amazonaws.com/256010096758/lambda-sqs-SimpleQueue-1FKISI61P8EN7"
  };

  try {
    sqs.sendMessage(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
