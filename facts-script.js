const submit = document.getElementById('submit'),
    search = document.getElementById('search'),
    randomEl = document.getElementById('random-fact'),
    resultHeadingEl = document.getElementById('results-heading'),
    factsEl = document.getElementById('facts'),
    singleFactEl = document.getElementById('single-fact');

    function searchFacts(e){
        e.preventDefault(); 
        factsEl.innerHTML='';
        singleFactEl.innerHTML='';
        //get search term 
        const term = search.value
    
        if(term.trim()){
            fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${term}`)
            .then(res => res.json())
            .then( facts => {
                console.log(facts);
                if(facts.success === false){
                    alert('No Facts exist for anime provided ');
                } else {
                    factsEl.innerHTML = facts.data.map (animeFacts => `
                    <div class="facts">
                    <img src = "${animeFacts.img}" alt=""/>
                    <ul>
                    <li>
                    <p style="color: black;">${animeFacts.fact}</p>
                    </li> 
                    </ul>
                    </div>
                    `)
                    .join('');
                }
                search.value='';
            });
        }
    }

function getRandomFact(){
    factsEl.innerHTML='';
    singleFactEl.innerHTML='';

    fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1`)
    .then( res => res.json())
    .then( ranFact => {
        var random = ranFact.data[Math.floor(Math.random()*ranFact.data.length)];

        console.log(random);
        addFactToDom(random);
    } );

}
function addFactToDom(random){
    singleFactEl.innerHTML =  `
            <div class="single-fact">
            <h2 style="font-size:21px; color:red;">${random.anime_name} </h2>
            
            
            </div>
            `;
            }

    //event listeners 
    submit.addEventListener('submit', searchFacts);
    randomEl .addEventListener('click', getRandomFact);