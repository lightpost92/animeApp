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
    //get search term 
    const term = search.value;
    console.log(term);

    //check for empty search
    if(term.trim()){
        fetch(`https://animechan.vercel.app/api/quotes/anime?title=${term}`)
      .then(response => response.json())
      .then(quotes => {
        console.log(quotes);
        
        if(quotes === null){
            resultHeadingEl.innerHTML = `<p>There are no search results. Try again!</p>`
          } else {
            
            
            for (let i = 0 ; i <= quotes.length ; i++){
            quotesEl.innerHTML = quotes.map( animeQuote => `
            
            
            <div class="display-quotes">
            ${animeQuote[i].anime}
            </div>
            
            `).join('')}
          }
      });
      
         
    }
}



//Event Listeners 

submit.addEventListener('submit', searchQuote);
//randomEl.addEventListener('click', getRandomQuote)




for( let i =0 ; i <= quotes.length; i++){
              
  const animeQuotes = quotes[i];
  quotesEl.innerHTML = `
  
  
  <div class="display-quotes" style="color:black;">
  ${animeQuotes["character"]}: "${animeQuotes["quote"]}"
  </div>
  
  `;
  
  search.value='';
}
    


