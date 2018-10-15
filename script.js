const glossary = [
  {
    name: "Apples",
    description: "Apples description"
  },
  {
    name: "Bananas",
    description: "Bananas description"
  },
  {
    name: "Cherries",
    description: "Cherries description"
  },
  {
    name: "Dragon Fruit",
    description: "Dragon Fruit description"
  },
  {
    name: "Elderberry",
    description: "Elderberry description"
  },
  {
    name: "Fig",
    description: "Fig description"
  },
  {
    name: "Grapefruit",
    description: "Grapefruit description"
  },
  {
    name: "Honeydew melon",
    description: "Honeydew melon description"
  },
  {
    name: "Indian Prune",
    description: "Indian Prune  description"
  },
  {
    name: "Jackfruit",
    description: "Jackfruit description"
  },
  {
    name: "Kiwi",
    description: "Kiwi description"
  },
  {
    name: "Lime",
    description: "Lime description"
  },
  {
    name: "Mango",
    description: "Mango description"
  },
  {
    name: "Nectarine",
    description: "Nectarine description"
  },
  {
    name: "Olive",
    description: "Olive description"
  },
  {
    name: "Papaya, Persimmon",
    description: "Papaya, Persimmon description"
  },
  {
    name: "Quince",
    description: "Quince description"
  },
  {
    name: "Rambutan",
    description: "Rambutan description"
  },
  {
    name: "Star Frui",
    description: "Star Fruit description"
  },
  {
    name: "Tomato",
    description: "Tomato description"
  },
  {
    name: "Ugli Fruit",
    description: "Ugli Fruit description"
  },
  {
    name: "Vanilla Bean",
    description: "Vanilla Bean, description"
  },
  {
    name: "Watermelon",
    description: "Watermelon, description"
  },
  {
    name: "Xigua (Chinese Watermelon)",
    description: "Xigua, description"
  },
  {
    name: "Yellow Passion Fruit",
    description: "Yellow Passion Fruit, description"
  },
  {
    name: "Zuchinni (a fruit, like tomatoes)",
    description: "Zuchinni (a fruit, like tomatoes), description"
  }
];

const settings = {
  DOMStrings: {
    list: ".list",
    userInput: ".userInput",
    letters: ".glossary-table__letter"
  },
  highlightClass: "hl",
  errorMessage: "No words found, try a new one."
};

const list = document.querySelector(settings.DOMStrings.list);
const userInput = document.querySelector(settings.DOMStrings.userInput);
const letters = document.querySelectorAll(settings.DOMStrings.letters);

// sort data by name alphabetically
function sortArr(arr) {
  arr.sort((a, b) => a.name.localeCompare(b.name));
}

function findMatches(wordToMatch, data) {
  // sort in alphabetical order
  sortArr(data);

  return data.filter(item => {
    // create regular expression
    // so it can be passed into match
    // g = global
    // i = insenstive - lower or upper
    const regex = new RegExp(wordToMatch, "gi");
    // array = found items
    return item.name.match(regex);
  });
}

function displayMatches() {
  // check this first letter typed in
  checkLetter(this.value[0]);
  // pass in type value, and data
  let found = findMatches(this.value, glossary);
  // return found to 0 once input is empty
  if (this.value === "") {
    found = [];
  }
  // pass in typed input
  // pass in the array with results
  displayItem(this.value, found);
}

function displayItem(a, f) {
  const html = f
    .map(item => {
      // find what is searched for
      // replace the found item with a span to highlight

      const regex = new RegExp(a, "gi");
      const name = item.name.replace(
        regex,
        `<span class ="${settings.highlightClass}">${a}</span>`
      );

      return `
        <li>
      <span>${name}</span>
      <p>${item.description}</p>
    </li>
    `;
    })
    .join("");

  if (f.length > 0) {
    list.innerHTML = html;
  } else if (this.value === "") {
    list.innerHTML = "";
  } else {
    list.innerHTML = settings.errorMessage;
  }
}

let lettersArr = [...letters].map(item => item.innerHTML.toLowerCase()).join();

// check typed letters
function checkLetter(a) {
  // if the array includes the typed first letter
  if (lettersArr.includes(a)) {
    // select the typed in letter and highlight
    document.querySelector(`.${a} `).classList.add(settings.highlightClass);
  } else if (!lettersArr.includes(a)) {
    // remove all hl classes
    letters.forEach(item => item.classList.remove(settings.highlightClass));
  }
}

// toggle active class on click of letters
function toggleItem(elem, active) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {
          elem[i].classList.remove(active);
        } else if (current.classList.contains(active) === true) {
          current.classList.remove(active);
        } else {
          current.classList.add(active);
        }
      }
      e.preventDefault();
    });
  }
}
toggleItem(letters, settings.highlightClass);

// on user input typed in
userInput.addEventListener("keyup", displayMatches);

// on click of the letters
letters.forEach(item =>
  item.addEventListener("click", function(el) {
    let clickedLetter = item.innerText.toLowerCase().trim();

    let found = findMatches(clickedLetter, glossary);

    displayItem(clickedLetter, found);
    // clear input
    userInput.value = "";
  })
);
