
console.log("This is service worker");

//TIMER
let defualtDuration = 30.0;
function CreateAlrm() 
{
    chrome.alarms.create("this is a alarm", { delayInMinutes: defualtDuration });
}

//alarm api useed
chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log(alarm);
    chrome.notifications.create(
      "My Notification",
      {
        type: "basic",
        iconUrl: "logo.png",
        title: "Ur doing Great 👍",
        message: "Ur time is UP! Take some rest",
      },
      function (notificationID) {
          console.log("Displayed the notification")
      }
    );
  });

// ###########################################


// MUSIC
async function createOffscreen() 
{
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "testing",
    });
  }
  
  //Listen for messages
chrome.runtime.onMessage.addListener(async (msg, sender, response) => 
{
  await createOffscreen();
  if (msg.name == "sw-playTrack") {
    console.log("sw-playTrack", msg);
    CreateAlrm();
    chrome.runtime.sendMessage({ name: "playTrack", track: msg.track });
  }

  if (msg.name == "sw-pauseTrack") {
    chrome.runtime.sendMessage({ name: "pauseTrack" });
  }
});

//#######################################################



