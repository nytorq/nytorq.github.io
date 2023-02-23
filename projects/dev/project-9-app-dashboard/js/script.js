/*jshint esversion: 6 */

// VARIABLES

const close_icons = document.getElementsByClassName('fa-times');
const submit_buttons = document.querySelectorAll("button[type='submit']");
const chartPeriodContainer = document.getElementsByClassName('chart__tab');
const unSelected = 'chart__period';
const selected = unSelected.concat('--selected');
const input = document.getElementById("messageForUser");
const search_inputs = document.querySelectorAll("input[type='search']");
const alertMenu = document.getElementById('alertMenu');
const bellButton = document.getElementById('notificationsButton');
const bellBubble = document.getElementById('bubble');
const timeZoneDropDown = document.getElementById('timezone_dropdown');
const timeZoneinput = document.getElementById('timezone_input');
const toggles = document.getElementsByClassName('track');
const emailNotifications = document.getElementById('emailNotifications');
const publicProfile = document.getElementById('publicProfile');
const members = [
  {
    "userID": 0,
    "firstName" : "Victoria",
    "lastName"  : "Chambers",
    "email"     : "vchambers@gmail.com",
    "joinDate"  : "10/15/15",
    "label"     : "Victoria Chambers"
  },
  {
    "userID": 1,
    "firstName" : "Dale",
    "lastName"  : "Byrd",
    "email"     : "dbyrd@gmail.com",
    "joinDate"  : "10/15/15",
    "label"     : "Dale Byrd"
  },
  {
    "userID": 2,
    "firstName" : "Dawn",
    "lastName"  : "Wood",
    "email"     : "dwood@hotmail.com",
    "joinDate"  : "10/15/15",
    "label"     : "Dawn Wood"
  },
  {
    "userID": 3,
    "firstName" : "Dan",
    "lastName"  : "Oliver",
    "email"     : "doliver@gmail.com",
    "joinDate"  : "10/15/15",
    "label"     : "Dan Oliver"
  },
  {
    "userID": 4,
    "firstName" : "Charlie",
    "lastName"  : "Prator",
    "email"     : "cprator@gmail.com",
    "joinDate"  : "12/09/13",
    "label"     : "Charlie Prator"
  }
];
const trafficData = [
  {
    "dataset" : 'hourly',
    "labels"  : ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00','24:00'],
    "array"   : [0, 750, 1250, 900, 485, 760, 1500, 293, 683]
  },
  {
    "dataset" : 'daily',
    "labels"  : ['Jan 26', 'Jan 26','Jan 27','Jan 28','Jan 29','Jan 30','Jan 31'],
    "array"   : [1000, 893, 235, 1000, 1500, 3825, 1500]
  },
  {
    "dataset" : 'weekly',
    "labels"  : ['Jan 1', 'Jan 6', 'Jan 11', 'Jan 16', 'Jan 21', 'Jan 26', 'Jan 31'],
    "array"   : [2953, 750, 999, 342, 1500, 2000, 362]
  },
  {
    "dataset" : 'monthly',
    "labels"  : ['Aug 2018', 'Sep 2018', 'Oct 2019', 'Nov 2018', 'Dec 2018', 'Jan 2019'],
    "array"   : [1999, 5230, 1250, 2385, 900, 1859]
  },
];

autocomplete({
    input: input,
    fetch: function(text, update) {
        text = text.toLowerCase();
        var suggestions = members.filter(n => n.firstName.toLowerCase().startsWith(text));
        update(suggestions);
    },
    onSelect: function(item) {
        input.value = item.label;
    },
    minLength: 0,
    emptyMsg: "Looks like there's no member with that name.",
    preventSubmit: true
});


// FUNCTION EXPRESSIONS

function removeParent(element) {
  let parent = element.parentElement;
  parent.remove();
}

function displayMessage(target) {
  let parent = returnForm(target);
  let errorMessage = parent.lastElementChild;
  let successMessage = parent.lastElementChild.previousElementSibling;
  const array = [];
  for (i=0; i < target.form.length - 1; i++) {
    let boolean =  target.form[i].value === "";
    array.push(boolean);
  }
  if (array.includes(true)) {
    // any one of the form elements has been found to be empty
    errorMessage.setAttribute("style", "display: inherit;");
    window.setTimeout(function() {errorMessage.style.opacity = 1;}, 200);
  } else {
    successMessage.setAttribute("style", "display: inherit;");
    window.setTimeout(function() {successMessage.style.opacity = 1;}, 200);
  }
}

function returnForm(e) {
  let currentNode = e;
  while (currentNode.tagName !== 'FORM') {
    currentNode = currentNode.parentNode;
  }
  return currentNode;
}

function close_element() {
  for (i=0 ; i < close_icons.length ; i++) {
    let icon = close_icons[i];
    icon.addEventListener('click', () => {
      removeParent(icon);
    });
  }
}

function submit_message() {
  for (i=0 ; i < submit_buttons.length ; i++) {
    let button = submit_buttons[i];
    button.addEventListener('click', () => {
      displayMessage(button);
    });
  }
}

function compare(a, b) {
  const lastNameA = a.lastName.toUpperCase();
  const lastNameB = b.lastName.toUpperCase();
  let comparison = 0;
  if (lastNameA > lastNameB) {
    comparison = 1;
  } else if (lastNameA < lastNameB) {
    comparison = -1;
  }
  return comparison;
}

function changeSelected(target)  {
  for (i=0 ; i < chartPeriodContainer[0].childNodes.length ; i++) {
    chartPeriodContainer[0].childNodes[i].className = unSelected;
  }
  let selectedPeriod = target.textContent.toLowerCase();
  let labels = [];
  let data = [];
  for (i=0 ; i < trafficData.length ; i++) {
    if (trafficData[i].dataset.includes(selectedPeriod)) {
      labels = trafficData[i].labels;
      data = trafficData[i].array;
      trafficChart.data.datasets[0].data = data;
      trafficChart.data.labels = labels;
      trafficChart.update();
      target.className = selected;
      return;
    }
  }
}

function turnToggle(toggle, direction = null) {
  let checkbox = toggle.previousElementSibling;
  let toggleState = toggle.getAttribute('state');
  let switchHandle = toggle.getElementsByClassName('switch');
  const toggleStyles = [
    {
      "bkgrndColor"       : "background-color: #7477bf;",
      "position"          : "right: 2px;"
    },
    {
      "bkgrndColor"       : "background-color: #838383;",
      "position"          : "right: 59px;"
    }
  ];

  function turnToggleOff() {
    switchHandle[0].setAttribute('style', toggleStyles[1].position);
    toggle.setAttribute('style', toggleStyles[1].bkgrndColor);
    checkbox.removeAttribute('checked');
    toggle.setAttribute('state', 'off');
    toggleState = toggle.getAttribute('state');
  }

  function turnToggleOn() {
    switchHandle[0].setAttribute('style', toggleStyles[0].position);
    toggle.setAttribute('style', toggleStyles[0].bkgrndColor);
    checkbox.setAttribute('checked', 'true');
    toggle.setAttribute('state', 'on');
    toggleState = toggle.getAttribute('state');
  }

  if (direction !== null) {
    if (direction === 'on') {
      turnToggleOn();
    } else if (direction === 'off') {
      turnToggleOff();
    }
  }
  else if (direction === null && toggleState === 'on') {
    turnToggleOff();
  } else if (direction === null && toggleState === 'off') {
    turnToggleOn();
  }
  localStorage.setItem(toggle.id, toggleState);
}

// FUNCTION DECLARATIONS

close_element();
submit_message();

// EVENT HANDLERS

for (i=0 ; i < chartPeriodContainer[0].childNodes.length ; i++) {
  let currentChartPeriod = chartPeriodContainer[0].childNodes[i];
  currentChartPeriod.addEventListener('click', () => {
    changeSelected(currentChartPeriod);
  });
}

bellButton.addEventListener('click', () => {
  event.preventDefault();
  let alertMenuState = alertMenu.getAttribute('state');
  if (alertMenuState === 'open') {
    alertMenu.setAttribute("style", "display: none;");
    window.setTimeout(function() {alertMenu.style.opacity = 0;}, 200);
    bellButton.setAttribute("style", "background-color: none;");
    alertMenuState = alertMenu.setAttribute('state', 'closed');
  } else if (alertMenuState === 'closed') {
    alertMenu.setAttribute("style", "display: inherit;");
    window.setTimeout(function() {alertMenu.style.opacity = 1;}, 200);
    bellBubble.setAttribute("style", "display: none;");
    window.setTimeout(function() {bellBubble.style.opacity = 0;}, 200);
    bellButton.setAttribute("style", "background-color: #5155af;");
    alertMenuState = alertMenu.setAttribute('state', 'open');
  }
});

bellButton.addEventListener('blur', () =>{
  window.setTimeout(function() {alertMenu.setAttribute("style", "display: none;");}, 150);
  bellButton.setAttribute("style", "background-color: inherit;");
  state = alertMenu.setAttribute('state', 'closed');
});

timeZoneinput.addEventListener('click', () => {
  let state = timeZoneDropDown.getAttribute('state');
    if (state === 'open') {
      timeZoneDropDown.setAttribute("style", "display: none;");
      state = timeZoneDropDown.setAttribute('state', 'closed');
    } else if (state === 'closed') {
      timeZoneDropDown.setAttribute("style", "display: inherit;");
      state = timeZoneDropDown.setAttribute('state', 'open');
    }
});

timeZoneinput.addEventListener('blur', () =>{
  window.setTimeout(function() {timeZoneDropDown.setAttribute("style", "display: none;");}, 150);
  state = timeZoneDropDown.setAttribute('state', 'closed');
});

for (i=0 ; i < timeZoneDropDown.childNodes.length ; i++) {
  let node = timeZoneDropDown.childNodes[i];
  node.addEventListener('click', () => {
    let value = node.textContent;
    timeZoneinput.value = value;
    localStorage.setItem('timeZoneinput', value);
    timeZoneDropDown.setAttribute("style", "display: none;");
    state = 'closed';
  });
}

for (i=0 ; i < toggles.length ; i++) {
  let toggle = toggles[i];
  toggle.addEventListener('click', ()=> {
    turnToggle(toggle);
  });
}

// CHANGING THE DOM BASED UPON LOCALSTORAGE

if (localStorage.length !== 0) {
  timeZoneinput.value = localStorage.getItem('timeZoneinput');
  emailNotificationsState = localStorage.getItem('emailNotifications');
  publicProfileState = localStorage.getItem('publicProfile');
  if (emailNotificationsState !== null) {
    turnToggle(toggles[0], emailNotificationsState);
  }
  if (publicProfileState !== null) {
    turnToggle(toggles[1], publicProfileState);
  }
}
