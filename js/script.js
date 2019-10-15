/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*
   Reviewer: I realize rubric states this can be done with just TWO globals. I opted to use none in this file.
*/

showPage();

function showPage() {
   const ul = document.querySelector('.student-list');
   const arrayLi = arrayGetter();

   //first load for first 10 names
   pageSwap(0, arrayLi);
   createSearch(ul);
   appendPageLinks(arrayLi, ul);
}

//This shows the 10 users per page
function pageSwap(start = 0, arrayLi = arrayGetter()) {
   let finish = start + 9;

   arrayLi.forEach((item, index) => {
      //hides those outside of range selected
      if (index < start || index > finish) {
         item.style.display = 'none';
      } else {
         item.style.display = 'block';
      }
   });
}

function appendPageLinks(arrayLi, studentList) {
   //giving the ul class allows hover for all li
   const ul = createElement('ul', 'className', 'pagination');

   insertAfter(ul, studentList);
   createLi(arrayLi, ul);
}


function createLi(arrayLi, ul) {
   //determine how many page links are needed based on length of list
   let numOfLinks = Math.ceil(arrayLi.length / 10);

   for (let ii = 1; ii <= numOfLinks; ii++){
      const li = createElement('li', 'innerHTML', `<a href="#">${ii}</a>`);
      ul.append(li);
   }
}

function createSearch() {
   const h2 = document.querySelector('h2');
   const form = createElement('form', 'className', 'student-search');
   const input = createElement('input', 'type', 'text');
   const button = createElement('button', 'innerText', 'Search');

   insertAfter(form, h2);
  
   form.appendChild(input);
   form.appendChild(button);

   input.setAttribute('placeholder', 'Search');
   input.setAttribute('id', 'search-input');
}

function paginationDisplay(num) {
   const ul = document.querySelector('.pagination');
   const liList = [...ul.children];
   let numOfLinks = Math.ceil(num / 10);

   //had the user searched
   numOfLinks !== Math.ceil(arrayGetter().length / 10)? ul.classList.add('search-submitted') : ul.classList.remove('search-submitted');
   //no results after search
   num === 0? noSearchResults() : '';
   //Show proper number of pages for li's
   liList.forEach((li, index) => index < numOfLinks? li.style.display ='' : li.style.display = 'none');
}

function noSearchResults() {
   let studentList = document.querySelector('.student-list');
   let p = createElement('p', 'className', 'text-block');
   //wont post multiple p during keyup listener
   !document.querySelector('.no-results')? fillNoResults(p, studentList): '';
}
function fillNoResults(p, studentList) {
   p.classList.add('no-results');
   p.textContent = "No Search Results found, try again";
   insertAfter(p, studentList);
}
///////// EVENT LISTENERS //////////

document.addEventListener('click', (e) => {
   if(e.target.nodeName === "A") {
      const targetUlClass = e.target.parentNode.parentNode.classList;

      //targets only pagination links prior to search
      if(targetUlClass.contains('pagination') && !targetUlClass.contains('search-submitted')) {
         //page number clicked to get starting index.
         let start = (parseInt(e.target.innerText) - 1) * 10;
         pageSwap(start);
      } else {
         let start = (parseInt(e.target.innerText) - 1) * 10;
         pageSwap(start, searchResults);
      }
   }
});

document.addEventListener('keyup', (e) => {
   e.preventDefault();

   const input = document.getElementById('search-input');
   const searchVal = input.value.toLowerCase();
   const searched = [];
   const arrayLi = arrayGetter();

   arrayLi.forEach((li) => {
      handleResults(li, searchVal, searched);
   });
   searchResults = searched;
   pageSwap(0, searched);
   paginationDisplay(searchResults.length);
});

function handleResults(li, searchVal, searched) {
   if(li.innerText.toLowerCase().indexOf(searchVal) === -1) {
      li.style.display = 'none';
   }
   //search results
   if(li.innerText.toLowerCase().indexOf(searchVal) !== -1) {
      let p = document.querySelector('.no-results');
      searched.push(li);
      //removes message when user deletes search query
      if (p) {
         p.remove();
      }
   }
}

//////// HELPER FUNCTIONS /////////

//helper function retrieves the HTMLcollection array-like-object and turns it into default array.
function arrayGetter() {
   const ul = document.querySelector('.student-list');
   const arrayLi = [...ul.children];

   return arrayLi;
}
//helper function to insertAfter, which isnt included in Vanilla
//reference: https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
function insertAfter(el, refNode){
   refNode.parentNode.insertBefore(el, refNode.nextSibling);
}

//create helper
function createElement(elemName, property, value) {
   const element = document.createElement(elemName);
   element[property] = value;
   return element;
}