const express = require("express")
// const CronJob = require('cron').CronJob;
const app = express();

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
const token = "xoxb-401428056419-1412228129808-ki9RGJzmaTiQo7tvziBf53jk";

const web = new WebClient(token);



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
                (response, idx) => console.log(channels[idx].name, response)
            ));
    })
}
const getChannelsUsingCursor = async (channels, cursor) => {
    channels = channels || [];
    let payload = {};
    if (cursor)
        payload.cursor = cursor;
    let res = await web.conversations.list(payload);
    channels = channels.concat(res.channels);
    if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor.length) {
        return getChannelsUsingCursor(channels, res.response_metadata.next_cursor);
    }
    return channels;

}


const getAllMembersUsingCursor = async (channel, members, cursor) => {
    // web.conversations.members({ channel: channel.id }));
    members = members || [];
    let payload = {};
    if (cursor)
        payload.cursor = cursor;
    let res = await web.conversations.members({ channel, payload })
    members = members.concat(res.members);
    console.log(res, payload)
    // if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor.length) {
    //     return getAllMembersUsingCursor(channel, members, res.response_metadata.next_cursor);
    // }
    return members;
}

const run = async () => {
    const channels = await getChannelsUsingCursor();
    console.log(channels)
    const members = await getAllMembersUsingCursor('CBT9CGUBE');
    console.log(members.length)
}

// const getChannels = async (channels, cursor) => {
//     channels = channels || []

//     let payload = {}
//     if (cursor) payload.cursor = cursor
//     let result = await callAPIMethodPost('users.conversations', payload)
//     channels = channels.concat(result.channels)
//     if (result.response_metadata && result.response_metadata.next_cursor && result.response_metadata.next_cursor.length)
//         return getChannels(channels, result.response_metadata.next_cursor)

//     return channels
// }
// getChannelsUsingCursor();
// getChannels();
// getChannelsUsingCursor();
// getAllMembersUsingCursor('CBT9CGUBE')
// getChannelWithMembers();
run();
app.listen(4000, () => {
    console.log("Server started");
});