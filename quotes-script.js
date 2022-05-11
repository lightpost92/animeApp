const submit = document.getElementById('submit'),
    search = document.getElementById('search'),
    randomEl = document.getElementById('random-quote'),
    resultHeadingEl = document.getElementById('results-heading'),
    quotesEl = document.getElementById('quotes'),
    singleQuoteEl = document.getElementById('single-quote');

//search quotes 
function searchQuote(e){
    e.preventDefault();
    //clear single quote 
    singleQuoteEl.innerHTML='';
    resultHeadingEl.innerHTML = '';
    //get search term 
    const term = search.value;
    console.log(term);

    //check for empty search
    if(term.trim()){
        fetch(`https://animechan.vercel.app/api/quotes/anime?title=${term}`)
      .then(response => response.json())
      .then(quotes => {
        console.log(quotes);
        
        if(quotes.error === 'No related quotes found!'){
            resultHeadingEl.innerHTML = `<p>There are no search results. Try again!</p>`;
            
          } else {
            
            quotesEl.innerHTML = quotes.map (animeQuotes => `
                    <div class="facts">
                    <h2 style="font-size:21px; color:red;">${animeQuotes.character}: </h2>
                    <ul>
                    <li>
                    <p style="color: black;">${animeQuotes.quote}</p>
                    </li> 
                    </ul>
                    </div>
                    `)
                    .join('');

            
          
          }
         
      });
      search.value='';
      singleQuoteEl.innerHTML='';
    resultHeadingEl.innerHTML = '';
         
    }
}
// function getRandomQuote (e){
//   e.preventDefault();
//   //clear meal and heading
//   singleQuoteEl.innerHTML='';
//   resultHeadingEl.innerHTML = '';

//   fetch('https://animechan.vercel.app/api/random')
//         .then(response => response.json())
//         .then(ranQuote => {
//           console.log(ranQuote);
//           if(ranQuote.error === 'No related quotes found!'){
//             resultHeadingEl.innerHTML = `<p>There are no search results. Try again!</p>`;
            
//           } else {
//           singleQuoteEl.innerHTML = ranQuote.map (animeQuote => `
//           <div class="single-quote">
//           <h2 style="font-size:21px; color:red;">${animeQuote.anime} </h2>
//           <p style="color: black;">${animeQuote.character}: "${animeQuote.quote}"</p>
          
//           </div>
//           `)
//           .join('');}

          
// });

//         search.value='';
// }

function getRandomQuote(){
  singleQuoteEl.innerHTML='';
  resultHeadingEl.innerHTML = '';
  quotesEl.innerHTML='';


  fetch('https://animechan.vercel.app/api/random')
  .then( res => res.json())
  .then( data => {
    const ranQuote = data;

    addQuoteToDom(ranQuote);
  });
}

//add quote to DOm 

function addQuoteToDom(ranQuote){
  singleQuoteEl.innerHTML =  `
          <div class="single-quote">
          <h2 style="font-size:21px; color:red;">${ranQuote.anime} </h2>
          <p style="color: black;">${ranQuote.character}: "${ranQuote.quote}"</p>
          
          </div>
          `;
          }






//Event Listeners 

submit.addEventListener('submit', searchQuote);
randomEl.addEventListener('click', getRandomQuote)
    