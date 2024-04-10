import $ from 'jquery';

// Initialize a variable to keep track of the number of seconds passed
let secondsPassed = 0;

// Update the secondsPassed variable every second
setInterval(() => {
  secondsPassed++;
  // console.log(secondsPassed + " seconds passed");
  $('#main').html(`You've been on this page for ${secondsPassed} seconds.`);
}, 1000); // 1000 milliseconds = 1 second
