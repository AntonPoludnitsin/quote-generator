const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function removeLoadingSpinner() {
  if (!loader.hidden) {    
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
const UNKNOWN_AUTHOR = 'Неизвестный автор';
const MAX_LENGTH_TEXT = 120;

async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru& format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data)
    if (data.quoteAuthor === ''){
      authorText.innerText = UNKNOWN_AUTHOR;
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > MAX_LENGTH_TEXT) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }

    quoteText.innerText = data.quoteText;
    // Stop Loader    
    removeLoadingSpinner()
  } catch (err) {    
    console.log('Whoops, no quote ', err)
  }
}


//Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)

getQuote();
