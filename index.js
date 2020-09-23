
var channel = "bot-test";
// var SlackBot = require("slackbots");
// var bot = new SlackBot({
//     token: "xoxb-401428056419-1405682548464-f7cCISzdSSYJHqe6IDG5eq9Q",
//     name: "trialbot"
//     // token: "xoxb-401428056419-1366979354263-dkCXZvk4zCI5V646rgBsSEsp",
//     // name: "jokebot"
// });
// const channels = [];
// bot.on("start", function () {
//     bot.postMessageToChannel(channel, "Hello world!");
//     console.log("Hello world!");
//     bot.getChannels().then(function (data) {
//         const { channels } = data;
//         channels.forEach(channel => console.log(channel.id + ' ' + channel.name));
//     })


//     bot.getUsers().then(function (data) {
//         const { members } = data;
//         members.forEach(user => console.log(user.id + ' ' + user.name + ' ' + user.real_name + ' ' + user.tz));
//     })
// });



// const token = "xoxb-401428056419-1366979354263-dkCXZvk4zCI5V646rgBsSEsp"
// const Slack = require('slack')
// const bot = new Slack({ token })

// // logs {args:{hyper:'card'}}
// slack.channels.history({ token, channel })
// bot.api.test({ hyper: 'card' }).then(console.log)

// CBT9CGUBE general
// CBUHLH8TZ random
// CCKNFJM5E html-css
// CCLAMBM0B building-portfolio
// CCLJWU5HT javascript
// CDDDBAV0B bde_log
// CE0J37WUC front-end
// CEAV1UWDV coding-challenges
// CEK6ABXME datagov
// CF06LEM6D the-creatives
// CF0GV9VU2 build_hours
// CH5AL8EHW backend
// CJJA75Z1C batch
// CU3UW6H7Z batch-12
// CUG298HE1 public-notes
// C0183SD6LF3 job-readiness-challenge
// C01B8HWFN49 bot-test

const { WebClient } = require('@slack/web-api');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = "xoxb-401428056419-1366979354263-JxoaebBF45dbQuwDYYscX3RK";

const web = new WebClient(token);
// web.conversations.list().then(function (res) {
//     const { channels } = res;
//     channels.forEach(channel => console.log(channel.id + ' ' + channel.name));
//     let requests = channels.map(channel => web.conversations.members(channel.id)
//     );
// })


const getChannels = () => {
    web.conversations.list().then(function (res) {
        const { channels } = res;
        channels.forEach(channel => console.log(channel.id, channel.name, channel.is_archived, channel.num_members));

    })
}
const getChannelWithMembers = () => {
    web.conversations.list().then(function (res) {
        let { channels } = res;
        channels = channels.filter(channel => !channel.is_archived);
        channels.forEach(channel => console.log(channel.id + ' ' + channel.name));
        let requests = channels.map(channel => web.conversations.members({ channel: channel.id }));
        Promise.all(requests)
            .then(responses => responses.forEach(
                (response, idx) => console.log(channels[idx].name, response.members)
            ));
    })
}

const getChannelWithMemberDetails = () => {
    web.conversations.list().then(function (res) {
        let { channels } = res;
        channels = channels.filter(channel => !channel.is_archived);
        channels.forEach(channel => console.log(channel.id + ' ' + channel.name));
        let requests = channels.map(channel => web.conversations.members({ channel: channel.id }));
        Promise.all(requests)
            .then(responses => responses.forEach(
                (response, idx) => {
                    let tempRequests = response.members.map(member => web.users.info({ user: member }));
                    Promise.all(tempRequests).then(respons => respons.forEach(respon => console.log(member, respons.user.name)))
                    // console.log(channels[idx].name, response.members);
                }
            ));
    })
}
getChannels();
getChannelWithMembers();
getChannelWithMemberDetails();