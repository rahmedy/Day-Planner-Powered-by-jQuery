// function to update local storage for saved values
$(document).ready(function () {

  var scheduledHours = [];
  var availableHours = {};
  var m = moment();
  var newDay = moment().hour(0);
  var currentTime = m.hour();








  // adding clock to currentDay id, also yeilds the date.
  function clock() {
    var dateString = moment().format('MMMM Do YYYY, h:mm:ss a');
    $('#currentDay').html(dateString);
  }

  setInterval(clock, 1000);
  // varablie workDay which contains each hour of the work day.
  let workDay = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
    "5 PM": "",
  };





  if (!localStorage.getItem('workDay')) {
    updateCalendarTasks(workDay);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
  }


  $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

  let counter = 1;
  for (const property in workDay) {
    let textEntry = "#text-entry" + counter;
    $(textEntry).text(workDay[property]);
    let timeId = "#time" + counter;
    let presentHour = moment().hour();
    let timeString = $(timeId).text();
    let timeNumber = hourNumberFromHourString(timeString);
    if (timeNumber < presentHour) {
      $(textEntry).addClass("past-hour");
    } else if (timeNumber > presentHour) {
      $(textEntry).addClass("future-hour");
    } else {
      $(textEntry).addClass("present-hour");
    }
    counter++;
  }

  $("button").click(function () {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();

    saveSchedule(hourString, value);
  });

  function hourNumberFromHourString(hourString) {
    switch (hourString) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }
  // 
  function loadCorrectDataset() {
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
  }

  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };

  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }

  function saveSchedule(hourString, val) {
    if (!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }

    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hourString] = val

    saveToLocalStorage(workHours);
  }
  // function created for 

  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function (index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }

  function color() {

    console.log(currentTime)

    $(".col-md-10").each(function () {

      if (currentTime == $(this).attr("id")) {

        $(this).addClass("present");
      } else if (currentTime < $(this).attr("id")) {
        $(this).addClass("future");
      } else {
        $(this).addClass("past");
      }
    })


  }

  color();
})