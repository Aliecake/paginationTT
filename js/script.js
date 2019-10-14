/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

showPage();

//in an effort to do this with NO globals, I created this helper function which retrieves the DOMTokenList array-like-object and turns it as an array.
function arrayGetter() {
   const ul = document.querySelector('.student-list');
   const arrayLi = [...ul.children];

   return arrayLi;
}

function showPage() {
   const ul = document.querySelector('.student-list');
   const arrayLi = arrayGetter();

   //first load for first 10 names
   pageSwap(0);
   appendPageLinks(arrayLi, ul);
}

function pageSwap(start) {
   const arrayLi = arrayGetter();
   let finish = start + 9;

   arrayLi.forEach((item, index) => {
      //do not display any people outside of the range selected, and toggle back
      if (index < start || index > finish) {
         item.style.display = 'none';
      } else {
         item.style.display = 'block';
      }
   });
}

function appendPageLinks(arrayLi, studentList) {
   const pageUl = document.createElement('ul');

   insertAfter(pageUl, studentList);
   pageUl.className = 'pagination';

   createLi(arrayLi, pageUl);

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

document.addEventListener('click', (e) => {
   //target only a hrefs with mouse click, then target only page number classes. This was done to avoid globals.
   if(e.target.nodeName === "A") {
      if(e.target.parentNode.parentNode.classList.contains('pagination')) {
         //takes the page number, minuses 1 to start at 0, then multiply by 10 to get starting index.
         let start = (parseInt(e.target.innerText) - 1) * 10;
         pageSwap(start);
      }
   }
})

//helper function to insertAfter, which is not a vanilla method
//reference: https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
function insertAfter(el, refNode){
   refNode.parentNode.insertBefore(el, refNode.nextSibling);
}

