console.log("I am working...");

const btn = document.querySelector(".search");
const enteredValue = document.getElementById("enter");
const phonetics= document.querySelector(".phonetics");
const meaning = document.querySelector(".meaning");
const example = document.querySelector(".examples");
const part = document.querySelector(".part");
const synonyms = document.querySelector(".synonyms");
const container = document.querySelector(".container");

btn.addEventListener("click", async function () {
    console.log("clicked");

    const word = enteredValue.value;
    console.log(word);
    

    if (word === "") {
        alert("Please enter a word");
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        let response = await fetch(url);
        let data = await response.json();


        container.style.height ="700px";
         part.innerHTML = `${word} <button class="partofSpeech"> Apple</button>
         `;
         
        const PartOfSpeech = document.querySelector(".partofSpeech");
        PartOfSpeech.innerText = data[0].meanings[0].partOfSpeech;
        phonetics.innerHTML = `
        <span>${data[0].phonetic}</span>
        <a href="${data[0].phonetics[0].audio}">
        <img src="icon.png" id="icon">
        </a>
`;
       meaning.innerHTML = `
       <span id="id1">MEANING</span>
       <br>
       ${data[0].meanings[0].definitions[0].definition}
        `;

        const ex = data[0].meanings[0].definitions[0].example
      if( ex!= undefined){
        
      example.innerHTML = ` <hr>
       <span id="id1">EXAMPLE</span>
       <br> ${ex}`;
      }
        else{
            example.style.display="none";
        }

        const syn =data[0].meanings[0].definitions[0].synonyms;
if (syn !== undefined && syn.length > 0) {
    synonyms.innerHTML = `<hr>
    <span id="id1">SYNONYMS</span><br>
    ${syn.join(", ")}
    `;






} 




       // phonetics.innerText = data[0].phonetic;
        //phonetics.innerHTML =  '<img src="icon.png" id="icon">';
       //Above was causing overwriting


    } catch (error) {
        PartOfSpeech.innerText = "Word not found";
        console.error(error);
    }
});
