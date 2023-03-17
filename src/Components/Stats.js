import React from "react";
import * as whatsapp from "whatsapp-chat-parser";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";

const emojiRegex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + 1 + ")"
  );
}
function generateAllMonthsInMap(map, firstMonth, lastMonth) {
  let temp = firstMonth.split(",");
  let ind = months.indexOf(firstMonth.split(",")[0]);
  let curr = firstMonth;
  let year = parseInt(temp[1].substring(1));
  while (curr !== lastMonth) {
    // console.log(curr);
    if (!map.has(curr)) {
      map.set(curr, 0);
    }
    ind++;
    if (ind == 12) {
      ind = 0;
      year++;
    }
    curr = months[ind] + ", " + year;
  }
}
function makeArrayAndSortWithKey(map) {
  let arr = [];
  for (let [key, value] of map) {
    arr.push([key, value]);
  }
  arr.sort(function (a, b) {
    let ai = a[0].indexOf(",");
    let bi = b[0].indexOf(",");
    let ayear = a[0].substring(ai + 1);
    let amonth = a[0].substring(0, ai);
    let byear = b[0].substring(bi + 1);
    let bmonth = b[0].substring(0, bi);

    if (ayear !== byear) {
      return parseInt(ayear) - parseInt(byear);
    } else {
      return months.indexOf(amonth) - months.indexOf(bmonth);
    }
  });
  return arr;
}

function makeArrayAndSortWithValues(map) {
  let arr = [];
  for (let [key, value] of map) {
    arr.push([key, value]);
  }
  arr.sort(function (a, b) {
    return b[1] - a[1];
  });
  return arr;
}
function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export const Stats = (props) => {
  const file = props.fileContent;
  let messageWhole = whatsapp.parseString(file);
  let messagesChunks = sliceIntoChunks(messageWhole, 3000);
  //   console.log(messagesChunks);
  let alldone = false;
  //All Stats Variables
  let userStats = new Map();
  let users = [];
  const userColors = [];
  const wordsperuser = {
    labels: [],
    values: [],
  };
  const letterperuser = {
    labels: [],
    values: [],
  };
  const linksperuser = {
    labels: [],
    values: [],
  };
  const messagesperuser = {
    labels: [],
    values: [],
  };
  const WordFreqObj = {
    labels: [],
    values: [],
  };
  const linkFreqObj = {
    labels: [],
    values: [],
  };
  const allMonthsWithFreqObj = {
    labels: [],
    values: [],
  };
  let emojiFreqPerUser = [];
  let emojiFreqPerUserObjArray = []; //contains objs for each user with labels and values
  let linkFreqPerUser = [];
  let linkFreqPerUserObjArray = []; //contains objs for each user with labels and values
  let weekWiseMessage = [0, 0, 0, 0, 0, 0, 0];
  let messagesPerHour = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];
  let allMonthsWithFreqMap = new Map();
  let wordsFreqMap = new Map();
  let linkFreqMap = new Map();
  let totalMessages = 0;
  let totalWords = 0;
  let totalLinks = 0;
  let totalFiles = 0;
  let totalEmojis = 0;
  let firstMonth = "";
  let lastMonth = "";
  ///////

  //actual processing of all chunks
  for (let chunk = 0; chunk < messagesChunks.length; chunk++) {
    // setTimeout(processData(messagesChunks[chunk]), 2);
    processData(messagesChunks[chunk]);
    if (chunk === messagesChunks.length - 1) {
      finalizeData();
    }
  }

  function processData(messages) {
    if (messages.length > 0) {
      //processData
      for (let i = 0; i < messages.length; i++) {
        let msgobj = messages[i];
        if (msgobj.author == null) continue;
        if (!userStats.has(msgobj.author)) {
          let obj = {
            messages: 0,
            words: 0,
            letters: 0,
            files: 0,
            emojis: 0,
            links: 0,
            mostUsedWords: new Map(),
            mostUsedLinks: new Map(),
            mostUsedEmojis: new Map(),
            //time: msgobj.date ,later time ka
          };
          userStats.set(msgobj.author, obj);
        }

        let date = new Date(msgobj.date);
        if (totalMessages == 0) {
          //it is the first message, load the first month date
          firstMonth = months[date.getMonth()] + ", " + date.getFullYear();
        }
        lastMonth = months[date.getMonth()] + ", " + date.getFullYear();
        // console.log(date.getDay() + " " + date.getUTCMonth() + " "+date.getUTCFullYear());
        //weekmsg++
        weekWiseMessage[date.getDay()]++;
        messagesPerHour[date.getHours()]++;

        //monthYear ++
        let monthString = months[date.getMonth()] + ", " + date.getFullYear();
        if (!allMonthsWithFreqMap.has(monthString)) {
          allMonthsWithFreqMap.set(monthString, 0);
        }
        allMonthsWithFreqMap.set(
          monthString,
          allMonthsWithFreqMap.get(monthString) + 1
        );

        let authorStats = userStats.get(msgobj.author); //for easy

        authorStats.messages += 1;
        totalMessages++;
        if (msgobj.message === "<Media omitted>") {
          totalFiles++;
          authorStats.files += 1;
          continue;
        }
        let wordsThisMessage = msgobj.message.trim().split(" ");
        wordsThisMessage = wordsThisMessage.filter((word) => word !== ""); //filtering strings like '   i  am    dhruv'
        // setTimeout(0);
        //traverse each word in message
        for (let w = 0; w < wordsThisMessage.length; w++) {
          let word = wordsThisMessage[w];

          let isLink = true;

          // is a link
          try {
            //
            let theUrl = new URL(word);
            if (theUrl.protocol === "https:" || theUrl.protocol === "http:") {
              //
              let domain = theUrl.hostname.replace("www.", "");
              authorStats.links += 1;
              // mostUsedLinks set for this user object
              if (!authorStats.mostUsedLinks.has(domain)) {
                authorStats.mostUsedLinks.set(domain, 0);
              }
              authorStats.mostUsedLinks.set(
                domain,
                authorStats.mostUsedLinks.get(domain) + 1
              );

              //mostUsedLinks setting up for all
              if (!linkFreqMap.has(domain)) {
                linkFreqMap.set(domain, 0);
              }
              linkFreqMap.set(domain, linkFreqMap.get(domain) + 1);

              // console.log(domain+" -> "+word);

              totalLinks++;
            } else {
              isLink = false;
            }
          } catch (e) {
            isLink = false;
          }
          if (!isLink) {
            let wordL = word.toLowerCase();
            // is a normal word
            for (let j = 0; j < wordL.length; j++) {
              let c = wordL.charAt(j);

              if (c.match(/[a-z]/i)) {
                //letter
                authorStats.letters += 1;
              }
            }

            //check for emojis
            const arrayofEmojis = [...word.matchAll(emojiRegex)];
            arrayofEmojis.forEach((arr) => {
              const emoji = arr[0];
              authorStats.emojis += 1;
              if (!authorStats.mostUsedEmojis.has(emoji)) {
                authorStats.mostUsedEmojis.set(emoji, 0);
              }
              authorStats.mostUsedEmojis.set(
                emoji,
                authorStats.mostUsedEmojis.get(emoji) + 1
              );
              totalEmojis++;
            });

            //words frq map is word freq map irrespective of author
            if (wordL.length > 3) {
              if (!wordsFreqMap.has(wordL)) {
                wordsFreqMap.set(wordL, 0);
              }
              wordsFreqMap.set(wordL, wordsFreqMap.get(wordL) + 1);
            }
            totalWords++;
            authorStats.words += 1; //set word count for this author

            //words Freq for this author
            if (!authorStats.mostUsedWords.has(wordL)) {
              authorStats.mostUsedWords.set(wordL, 0);
            }
            authorStats.mostUsedWords.set(
              wordL,
              authorStats.mostUsedWords.get(wordL) + 1
            );
          }
        }
      }
    }
  }

  function finalizeData() {
    //traversing authors in map
    for (let [key, value] of userStats) {
      // console.log(value);
      //messages per user
      messagesperuser.labels.push(key);
      messagesperuser.values.push(value.messages);

      //words per user
      wordsperuser.labels.push(key);
      wordsperuser.values.push(value.words);

      //letters per user
      letterperuser.labels.push(key);
      letterperuser.values.push(value.letters);

      //links per user
      linksperuser.labels.push(key);
      linksperuser.values.push(value.links);

      emojiFreqPerUser.push(makeArrayAndSortWithValues(value.mostUsedEmojis));

      //initialize emoji array obj with users size
      emojiFreqPerUserObjArray.push({
        labels: [],
        values: [],
      });

      linkFreqPerUser.push(makeArrayAndSortWithValues(value.mostUsedLinks));

      //initialize Links Array obj with users size
      linkFreqPerUserObjArray.push({
        labels: [],
        values: [],
      });

      //make random color for each user
      userColors.push(random_rgba());
      users.push(key);
    }

    //calc wordsFreqMap irrespective of user, ie all words freq
    let wordFreqArray = makeArrayAndSortWithValues(wordsFreqMap);

    for (let k = 0; k < 25; k++) {
      let arr = wordFreqArray[k];
      WordFreqObj.labels.push(arr[0]);
      WordFreqObj.values.push(arr[1]);
    }

    //calc linkFreqArray irrespective of user, ie all links freq
    let linkFreqArray = makeArrayAndSortWithValues(linkFreqMap);
    for (let k = 0; k < Math.min(35, linkFreqArray.length); k++) {
      let arr = linkFreqArray[k];
      linkFreqObj.labels.push(arr[0]);
      linkFreqObj.values.push(arr[1]);
    }

    //calc emoji per user
    for (let u = 0; u < emojiFreqPerUser.length; u++) {
      for (let ku = 0; ku < Math.min(10, emojiFreqPerUser[u].length); ku++) {
        emojiFreqPerUserObjArray[u].labels.push(emojiFreqPerUser[u][ku][0]);
        emojiFreqPerUserObjArray[u].values.push(emojiFreqPerUser[u][ku][1]);
      }
    }
    //calc links per user
    for (let u = 0; u < linkFreqPerUser.length; u++) {
      for (let ku = 0; ku < Math.min(6, linkFreqPerUser[u].length); ku++) {
        linkFreqPerUserObjArray[u].labels.push(linkFreqPerUser[u][ku][0]);
        linkFreqPerUserObjArray[u].values.push(linkFreqPerUser[u][ku][1]);
      }
    }

    //add those months also which are not in txt file because of zero messages in that month
    generateAllMonthsInMap(allMonthsWithFreqMap, firstMonth, lastMonth);

    //calc all months messages frequency
    let allMonthsWithFreqArray = makeArrayAndSortWithKey(allMonthsWithFreqMap);
    for (let k = 0; k < allMonthsWithFreqArray.length; k++) {
      let arr = allMonthsWithFreqArray[k];
      allMonthsWithFreqObj.labels.push(arr[0]);
      allMonthsWithFreqObj.values.push(arr[1]);
    }

    alldone = true;
  }

  let uid = 0;
  let uid2 = 0;

  return (
    <>
      {
        <>
          {alldone && (
            <div className="container px-100 mx-auto text-center w-1/2">
              <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Overall:
              </h2>
              <span class=" text-center font-semibold text-gray-900 dark:text-white">
                {totalMessages}
              </span>{" "}
              is the total number of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                Messages
              </span>{" "}
              in the conversation
              <br />
              <span class=" text-center font-semibold text-gray-900 dark:text-white">
                {totalWords}
              </span>{" "}
              is the total number of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                Words
              </span>{" "}
              in the conversation
              <br />
              <span class="text-center font-semibold text-gray-900 dark:text-white">
                {totalEmojis}
              </span>{" "}
              is the total number of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                Emojis
              </span>{" "}
              in the conversation
              <br />
              <span class="text-center font-semibold text-gray-900 dark:text-white">
                {totalFiles}
              </span>{" "}
              is the total number of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                Files
              </span>{" "}
              in the conversation
              <br />
              <span class="text-center font-semibold text-gray-900 dark:text-white">
                {totalLinks}
              </span>{" "}
              is the total number of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                Links
              </span>{" "}
              in the conversation
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 container mx-auto px-100 grid-cols-1">
            <div className="grid content-center">
              <BarChart
                data={messagesperuser}
                userColors={userColors}
                title={"Messages Per User"}
                label={"Messages"}
              />
              <BarChart
                data={wordsperuser}
                userColors={userColors}
                title={"Words Per User"}
                label={"Words"}
              />
            </div>
            <div className="grid content-center">
              <BarChart
                data={linksperuser}
                userColors={userColors}
                title={"Links Per User"}
                label={"Links"}
              />
              <BarChart
                data={letterperuser}
                userColors={userColors}
                title={"Letters Per User"}
                label={"Letters"}
              />
            </div>
          </div>
          <div className="container mx-auto px-100 content-center">
            <BarChart
              data={WordFreqObj}
              userColors={["rgba(255,0,0,1)"]}
              title={"Most Used Words"}
              label={"Word Frequency"}
            />

            <div className="grid md:grid-cols-2 gap-3 container mx-auto px-100 grid-cols-1">
              {emojiFreqPerUserObjArray.map((obj) => {
                return (
                  <div className="content-center">
                    <BarChart
                      data={obj}
                      userColors={userColors[uid]}
                      title={"Most Used Emojis - " + users[uid++]}
                      label={"Emoji Frequency"}
                      key={uid}
                    />
                  </div>
                );
              })}
            </div>
            <div className="grid md:grid-cols-2 gap-3 container mx-auto px-100 grid-cols-1">
              <div>
                <LineChart
                  data={{
                    labels: [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    values: weekWiseMessage,
                  }}
                  userColors={["rgba(255,0,255,1)"]}
                  title={"Weekly Messages"}
                  label={"Weekly Messages"}
                />
              </div>
              <div>
                <LineChart
                  data={{
                    labels: [
                      0,
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      19,
                      20,
                      21,
                      22,
                      23,
                    ],
                    values: messagesPerHour,
                  }}
                  userColors={["rgba(0,0,255,1)"]}
                  title={"Messages Per Hour of the day"}
                  label={"Messages per hour"}
                />
              </div>
            </div>

            <LineChart
              data={allMonthsWithFreqObj}
              userColors={["rgba(0,255,0,1)"]}
              title={"Montly Messages"}
              label={"Monthly Messages"}
            />
            <BarChart
              data={linkFreqObj}
              userColors={["rgba(0,0,255,1)"]}
              title={"Most Linked Websites"}
              label={"Links Frequency"}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-1 container mx-auto px-100 grid-cols-1">
            {linkFreqPerUserObjArray.map((obj) => {
              if (obj.labels.length === 0) {
                uid2++;
                return <></>;
              }
              return (
                <div className="content-center">
                  <BarChart
                    data={obj}
                    userColors={userColors[uid2]}
                    title={"Most Shared Websites by - " + users[uid2++]}
                    label={"Link Frequency"}
                    key={uid2}
                  />
                </div>
              );
            })}
          </div>
        </>
      }
    </>
  );
};
