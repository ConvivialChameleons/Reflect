const request = require('request-promise-native');
const cron = require('node-cron');

module.exports = cron.schedule('* * * * * *', () => {

  //fetch text and entry ID from the entry_text database that have processed === false

  //call the watson api to get keywords and sentiment


  //save results in the sentiment table

}, false);
 
const sentimentCall = (text) => {
  const watsonRequestBody = {
    text,
    features: {
      categories: {},
      // concepts: {},
      emotion: {},
      entities: {},
      keywords: {},
      // semantic_roles: {},
      sentiment: {}
    },
    clean: false
  };

  const options = {
    method: 'POST',
    headers: {
      'X-Watson-Learning-Opt-Out': true
    },
    uri: 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze/?version=2017-02-27',
    auth: {
      username: process.env.SENTIMENT_USERNAME,
      password: process.env.SENTIMENT_PASSWORD
    },
    body: watsonRequestBody,
    json: true
  };

  request(options)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

// sentimentCall('I’m so upset!! I don’t even know where to begin! To start off, I think I completely failed my geometry quiz, which I know I should’ve studied more for...my dad’s not gonna be happy about that. :( Then, we had a pop quiz in history on the reading homework from last night, and I completely forgot most of what I read, which made me even more upset because I actually did the reading! But what really made me mad was the note that Sarah slipped into my locker during passing period. She said she was sad that I’ve been hanging out with Jane more lately and thinks that I don’t want to be her friend anymore. I can’t believe she thinks that, especially after talking with her on the phone for hours and hours last month while she was going through her breakup with Nick! Just because I’ve been hanging out with Jane a little more than usual doesn’t mean I’m not her friend anymore. She completely blew me off at lunch, and when I told Jane, she thought that Sarah was being a “drama queen.”\
//   This is just what I need! My parents are getting on my case about doing more extracurricular activities, I have a huge paper due for AP English soon, and I can’t understand a thing in advanced Spanish! The last thing I need is for my best friend to think I hate her and barely text me back anymore.\
//   Uggh! I can’t concentrate on anything right now because of it. I hope she gets over it!!!');

