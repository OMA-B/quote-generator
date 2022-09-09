// Grabbing HTML Elements to populate quotes with
const quote_text = document.querySelector('.quote-text');
const author_text = document.querySelector('.author-text');
const tweet = document.querySelector('.tweet');
const new_quote = document.querySelector('.new-quote');
const quote_container = document.querySelector('.quote-container');
const loader = document.querySelector('.loader');
// making loader hidden by default
loader.style.display = 'none';

// Enabling loading while quote is still being fetched
const loading = () => {
    quote_container.style.display = 'none';
    loader.style.display = 'block';
}
// Disabling loading after quote has been fetched
const complete = () => {
    loader.style.display = 'none';
    quote_container.style.display = 'block';
}

// Fetching quotes
let fetched_quotes = [];

const fetch_quote = async () => {
    loading();
    const api_url = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(api_url);
        fetched_quotes = await response.json();
        get_quote();
    } catch (error) {
        console.log('Oops, quote not found', error);
    }
}

// On Load
fetch_quote();

// Getting single quote randomly
const get_quote = () => {
    loading();
    const quote = fetched_quotes[Math.floor(Math.random() * fetched_quotes.length)];
    // Populating text elements with quotes
    quote_text.textContent = quote.text;
    // Stop loading once a quote text has been fetched and displayed
    complete();
    // Checking if the text length is > 50 to alter font size
    quote_text.textContent.length > 100 ? quote_text.classList.add('long-quote') : quote_text.className = 'quote-text';
    // If Author name is absent, let it be Anonymous
    quote.author === null ? author_text.textContent = 'Anonymous' : author_text.textContent = quote.author;   
}

// Getting quotes when 'New Quote' button is clicked
new_quote.addEventListener('click', get_quote);

// Sharing quote on Twitter
tweet.addEventListener('click', () => {
    const twitter_url = `https://twitter.com/intent/tweet?text=${quote_text.textContent} ~ ${author_text.textContent}`;
    window.open(twitter_url, '_blank');
});