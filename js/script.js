/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


showPage();

//in an effort to do this with NO globals
//helper function retrieves the HTMLcollection array-like-object and turns it into default array.

function arrayGetter() {
   const ul = document.querySelector('.student-list');
   const arrayLi = [...ul.children];

   return arrayLi;
}

function showPage() {
   const ul = document.querySelector('.student-list');
   const arrayLi = arrayGetter();

   //first load for first 10 names
   pageSwap(0, arrayLi);
   createSearch(ul);
   appendPageLinks(arrayLi, ul);
}

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
   const ul = document.createElement('ul');

   insertAfter(ul, studentList);
   ul.className = 'pagination';

   createLi(arrayLi, ul);

}


function createLi(arrayLi, ul) {
   //determine how many page links are needed based on length of list
   let numOfLinks = Math.ceil(arrayLi.length / 10);

   for (let ii = 0; ii < numOfLinks; ii++){
      let pageNum = ii + 1;
      const li = document.createElement('li');
      
      li.innerHTML = `<a href="#">${pageNum}</a>`;
      ul.append(li);
   }
}

function createSearch() {
   const h2 = document.querySelector('h2');
   const form = document.createElement('form');
   const input = document.createElement('input');
   const button = document.createElement('button');

   insertAfter(form, h2);
   form.className = "student-search";
   button.innerText = "Search";
   form.appendChild(input);
   form.appendChild(button);
   input.setAttribute('placeholder', 'Search');
   input.setAttribute('id', 'search-input');
   input.type = 'text';
}

document.addEventListener('click', (e) => {
   if(e.target.nodeName === "A") {
      //targets only pagination links
      if(e.target.parentNode.parentNode.classList.contains('pagination') && !e.target.parentNode.parentNode.classList.contains('search-submitted')) {
         //takes the page number to get starting index.
         let start = (parseInt(e.target.innerText) - 1) * 10;
         pageSwap(start);
      } else {
         //if click is after a search, use searched array
         let start = (parseInt(e.target.innerText) - 1) * 10;
         pageSwap(start, searchResults);
      }
   }
});

document.addEventListener('keyup', (e) => {
   e.preventDefault();
   
   const input = document.getElementById('search-input');
   const searchVal = input.value.toLowerCase();
   let searchResults= searchLis(searchVal);

   if (searchResults.length === 0){
      noSearchResults();
   }
   pageSwap(0, searchResults);
   paginationDisplay(searchResults.length);
});

function searchLis(searchVal) {
   const arrayLi = arrayGetter();
   const searched = [];

   arrayLi.forEach((li) => {
      if(li.innerText.toLowerCase().indexOf(searchVal) === -1) {
         li.style.display = 'none';
      }
      //search results
      if(li.innerText.toLowerCase().indexOf(searchVal) !== -1) {
         searched.push(li);
      }
   });
   return searched;
}

function noSearchResults() {
   let studentList = document.querySelector('.student-list');
   let p = document.createElement('p');
   //wont post multiple p while user types more/deletes
   if (!document.querySelector('.no-results')) {
      p.className = 'no-results';
      p.textContent = "No Search Results found, try again";
      insertAfter(p, studentList);
   }
}
function paginationDisplay(num) {
   const ul = document.querySelector('.pagination');
   const liList = [...ul.children];
   let numOfLinks = Math.ceil(num / 10);

   //search results less than num of paginations needed
   if(numOfLinks < Math.ceil(arrayGetter().length / 10)){
      ul.classList.add('search-submitted');
   }
   //Show proper number of pages for li's
   liList.forEach((li, index) => {
      if (index < numOfLinks){
         li.style.display ='';
      } else {
         li.style.display = 'none';
      }
   });
}

//helper function to insertAfter, which is not a vanilla method
//reference: https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
function insertAfter(el, refNode){
   refNode.parentNode.insertBefore(el, refNode.nextSibling);
}

