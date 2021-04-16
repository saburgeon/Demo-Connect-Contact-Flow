'use strict';

const _ = require('lodash');

const AWS = require('aws-sdk');

const vanityMatrixObject = {
  '1': 1,
  '2':[
    'A',
    'B',
    'C'
  ],
  '3':[
    'D',
    'E',
    'F'
  ],
  '4':[
    'G',
    'H',
    'I'
  ],
  '5':[
    'J',
    'K',
    'L'
  ],
  '6':[
    'M',
    'N',
    'O'
  ],
  '7':[
    'P',
    'Q',
    'R',
    'S'
  ],
  '8':[
    'T',
    'U',
    'V' 
  ],
  '9':[
    'W',
    'X',
    'Y',
    'Z'
  ],
  '0': 0
}

function calculateTheVanityNumber(phoneNumber) {

  return phoneNumber.split('').map((singleNumber) => {
    if (singleNumber === '0' || singleNumber === '1') {
      return singleNumber
    }
    else {
      return _.sample(vanityMatrixObject[singleNumber], 1);
    }
  }).join('');

};

function generateNVanityNumbers(phoneNumber, repeatNTimes, numberHaveNoCallerId = false) {
  let vanityNumberArr = [];

  if (numberHaveNoCallerId === false) {
  
  for (var i = 0; i < repeatNTimes; i++) {
    let vanityNumber;
    
    vanityNumber = calculateTheVanityNumber(phoneNumber);

    //`+${vanityNumber.match(/.{1,3}/g).join('-')}`

    vanityNumberArr.push(vanityNumber);
  
  };

}

  return vanityNumberArr;
};

async function storeDataInTheDynamoDb(vanityNumbers, number, numberHaveNoCallerId = false) {
  AWS.config.update({
    region: 'us-east-1'
  });

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.DYNAMODB_BEST_VANITY_NUMBER_TABLE,
    Item: {
      phoneNumber: numberHaveNoCallerId ? `${number}_${Date.now()}` : number,
      createdAt: Date.now(),
      vanityNumbers: vanityNumbers,
      isNumberAnonymous: numberHaveNoCallerId
    },
  }

  console.log(`Item Params based on which the object will be created is : ${JSON.stringify(params)}`);

  return await dynamoDb.put(params).promise();
}

module.exports.main = async (event) => {
  console.log(`Event : ${JSON.stringify(event, null, 2)}`);
  
  const number = event['Details']['ContactData']['CustomerEndpoint']['Address'];

  let vanityNumbers;

  let isNumberAnonymous = false;

  if (event && number && number.includes('+')) { 
    let tempNumber = number.split('+');
    vanityNumbers = generateNVanityNumbers(tempNumber[1], 5, false);
  }
  else if (event && number && number.includes('Anonymous')) {
    vanityNumbers = generateNVanityNumbers(number, 5, true);
    isNumberAnonymous = true;
  }

  try {
    
    await storeDataInTheDynamoDb(vanityNumbers, number, isNumberAnonymous);

    return vanityNumbers && vanityNumbers.length > 0 ? {
      vanityNumber1: vanityNumbers[0],
      vanityNumber2: vanityNumbers[1],
      vanityNumber3: vanityNumbers[2]
    } 
    : 
    {
      vanityNumber1: '',
      vanityNumber2: '',
      vanityNumber3: ''
    };

  } catch (error) {
    console.error(`Error putting data in the dynamoDb table : ${error}`);

    return error;
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
