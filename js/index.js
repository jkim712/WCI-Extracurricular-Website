async function searchMainPage(value) {
    if (!dataFetched) {
        await fetchData();
    }
    clearList();

    // Checking if there's any input inside the search bar
    var smLinks = document.getElementsByClassName("main_sm_links");
    if (value && value.trim().length > 0){
        smLinks.forEach((link) => {
            link.style.display = "none"
        });
        value = value.trim().toLowerCase();

        // Only returning those results of the showResults that match the user input in the search bar
        showResults(clubs.concat(athletics).concat(music).filter(activity => {
            return activity.name.toLowerCase().includes(value);
        }));
    } else {
        smLinks.forEach((link) => {
            link.style.display = "inline"
        });
    }
}

// Showing results from the search
function showResults(results){
    for (const extracurriculars of results){
        const resultItem = document.createElement('a')
        var link = document.createTextNode(extracurriculars.name)
        var results = document.getElementById("list")

        resultItem.appendChild(link)
        // resultItem.appendChild(source)

        resultItem.classList.add('result-item')

        resultItem.href = extracurriculars.link
        results.appendChild(resultItem)
        resultItem.title = document.createTextNode(extracurriculars.name)
        results.appendChild(resultItem)
    }
    if (results.length === 0) {
        noResults()
    }
}

// Showing no results
function noResults() {
    const error = document.createElement('li')
    error.classList.add('error-message')

    const text = document.createTextNode('We were not able to find what you are looking for. Sorry.')

    error.appendChild(text)

    list.appendChild(error)
}

// Clearing results from the page 
function clearList(){
    list.innerHTML = "";
}
var slideIndexes = [];
// Slide shows
showSlides(Math.floor(window.innerWidth/260), [clubs, athletics, music], ["club_slide_show_cards", "athletics_slide_show_cards", "music_slide_show_cards"], true);

window.onresize = () => {showSlides(Math.floor(window.innerWidth/260), [clubs, athletics, music], ["club_slide_show_cards", "athletics_slide_show_cards", "music_slide_show_cards"], false)}

async function showSlides(amount, slideShowSources, slideShowIds, reset) {
    if (!dataFetched) {
        await fetchData();
    }
    if (slideShowSources.length != slideShowIds.length) {
        throw "Slide show contents and ids are not the same length!"
    }
    for (var slideShowIndex = 0; slideShowIndex < slideShowSources.length; slideShowIndex++) {
        // Get the div for this slideshow
        var slideShowDiv = document.getElementById(slideShowIds[slideShowIndex]);

        // Clear the div
        slideShowDiv.innerHTML = "";

        // Generate slides for the div
        for (var cardIndex = 0; cardIndex < amount; cardIndex++) {
            if (!reset) {
                var slideIndex = cardIndex + slideIndexes[slideShowIndex]
            } else {
                var slideIndex = cardIndex
            }
            generateSlide(slideIndex, slideShowSources[slideShowIndex], slideShowDiv);
        }
        if (reset) {
            slideIndexes.push(0);
        }
    }
    // Schedule the slides to move in 2 seconds, if we need to
    if (reset) {
        setTimeout(moveSlides, 2000, amount+1, 1, slideShowSources, slideShowIds);
    }
}

function moveSlides(startIndex, offset, slideShowSources, slideShowDivIds) {
    for (var slideShowIndex = 0; slideShowIndex < slideShowSources.length; slideShowIndex++) {
        slideIndexes[slideShowIndex] += offset;
        // Get the div we're using
        var slideShowDiv = document.getElementById(slideShowDivIds[slideShowIndex]);
        var slideShowSource = slideShowSources[slideShowIndex];
        // Ensure that offset and index aren't overly large
        while (slideIndexes[slideShowIndex] >= slideShowSource.length) {slideIndexes[slideShowIndex] -= slideShowSource.length} 
        while (offset >= slideShowSource.length) {offset -= slideShowSource.length}

        for (var new_offset = 0; new_offset < offset; new_offset++) {
            var index = startIndex + new_offset;
            // Get all c_item elements in our div
            var c_items = slideShowDiv.getElementsByClassName("c_item");

            // Remove the first c_item from the carousel
            slideShowDiv.removeChild(c_items[0]);

            // Add a new item
            generateSlide(index, slideShowSource, slideShowDiv);
        }
    }
    // Schedule slides to move again in 2 seconds
    setTimeout(moveSlides, 2000, startIndex+offset, offset, slideShowSources, slideShowDivIds);
}

function generateSlide(index, slideShowCards, slideShowDiv) {
    // Ensure that index is not larger than necessary
    while (index >= slideShowCards.length) {index -= slideShowCards.length}

    // Create a div for our item
    var carousel_item = document.createElement("div");
    carousel_item.classList.add("c_item");

    // Link, image and name for our item
    var link = document.createElement("a");
    var image = document.createElement("img");
    image.classList.add("c_image");
    var club_name_header = document.createElement("h5");

    // Set the link, image and name
    link.href = "index.html";
    image.src = slideShowCards[index]["image"];
    club_name_header.innerText = slideShowCards[index]["name"];

    // Add the image to the link
    link.appendChild(image);

    // Add the link & name header to the slide
    carousel_item.appendChild(link);
    carousel_item.appendChild(club_name_header);

    // Add the slide
    slideShowDiv.appendChild(carousel_item);
};

// Function for expanding and collpasing questions in the FAQ section
let up_bt = document.getElementById("up2");
let down_bt = document.getElementById("down2");
var i;
var content = document.getElementsByClassName("answer");

$(down_bt).click(function(){
    $(this).find(content).toggle();
});

// down_bt.addEventListener("click", function() {
//     content.style.display = "block";
//     console.log("yes");
// });
// up_bt.addEventListener("click", function () {
//     content.style.display = "none";
// });

// for (i = 0; i < down_bt.length; i++) {
//     down_bt[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var content = document.getElementsByClassName("answer");
//         if (content.style.display === "block") {
//             content.style.display = "none";
//         } else {
//             content.style.display = "block";
//         }
//     });
// }


