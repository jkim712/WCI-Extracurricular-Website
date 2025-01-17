async function searchMainPage(value) {
    if (!dataFetched) {
        await fetchData();
    }
    clearList();

    // Checking if there's any input inside the search bar
    if (value && value.trim().length > 0){
        value = value.trim().toLowerCase();

        // Only returning those results of the showResults that match the user input in the search bar     
        showResults(value, topResults(value));
    } else {
        hideResults();
    }
}

function filterResults(value, activities, redirectPage, urlParamName) {
    // filters results that contain the search value
    // information is attached to each activity
    var resultsList = [];
    for (var activity of activities) {
        var name = activity.name.toLowerCase()
        if (name.includes(value)) {
            var {score, start, end} = generateMatchScore(value, name, activity.name);
            activity.score = score;
            activity.start = start;
            activity.end = end;

            activity.redirectPage = redirectPage;
            activity.urlParamName = urlParamName;
            
            resultsList.push(activity);
        }
    }
    return resultsList;
}

function topResults(value) {
    // sorts results based on scores
    // shows a maximum of 6 results
    var filteredResults = filterResults(value, clubs, "clubs.html", "box");
    filteredResults = filteredResults.concat(filterResults(value, athletics, "sport_info.html", "sport"));
    filteredResults = filteredResults.concat(filterResults(value, music));
    filteredResults.sort(function(a, b) {
        let val = -(a.score - b.score);
            if (val == 0) {
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0
                }
            }
            return val;
    });
    
    if (filteredResults.length > 6) {
        filteredResults = filteredResults.slice(0, 6);
    }
    return filteredResults;
}

function createSearchResult(value, resultItem) {
    // substring that matches the search value is bolded
    value = value.toLowerCase();
    var name = resultItem.name;

    var resultName = document.createElement('div');

    var resultPrefix = document.createElement('span');
    resultPrefix.innerText = name.substring(0, resultItem.start);

    var resultSuffix = document.createElement('span');
    resultSuffix.innerText = name.substring(resultItem.end, name.length);
    
    var matchingText = document.createElement('b');
    matchingText.innerText = name.substring(resultItem.start, resultItem.end);
    
    resultName.appendChild(resultPrefix);
    resultName.appendChild(matchingText);
    resultName.appendChild(resultSuffix);
    return resultName;
} 

// Showing results from the search
function showResults(value, resultsList) {
    var results = document.getElementById("list");
    results.style.opacity = "1";

    for (const result of resultsList) {
        const resultItem = document.createElement('a');
        var resultName = createSearchResult(value, result);
        
        resultItem.appendChild(resultName)
        
        resultItem.classList.add('result-item');
        if (result.redirectPage && result.urlParamName) {
            resultItem.href = result.redirectPage + "?" + result.urlParamName + "=" + result.id;
        }
        var results = document.getElementById("list");
        results.appendChild(resultItem);
    }

    if (resultsList.length == 0) {
        hideResults();
    }
}

// Showing no results
function hideResults() {
    var results = document.getElementById("list");
    results.style.opacity = "0";
}

// Clearing results from the page 
function clearList(){
    list.innerHTML = "";
}

// Code for the quiz
document.one.onclick = function() {
    window.question1 = document.one.op1.value;
}

document.two.onclick = function() {
    window.question2 = document.two.op2.value;
}

document.three.onclick = function() {
    window.question3 = document.three.op3.value;
}

document.four.onclick = function() {
    window.question4 = document.four.op4.value;
}

document.five.onclick = function() {
    window.question5 = document.five.op5.value;
}

function results() {
    var user_answers = [window.question1, window.question2, window.question3, window.question4, window.question5];
    var stem_answers = ["math", "science", "reading", "coding", "hard-working", "no", "yes"];
    var academics_answers = ["math", "science", "business", "studying", "english", "reading", "hard-working", "passionate" ,"yes", "yes"];
    var recreational_answers = ["art", "gym", "friends", "cooking", "be on my phone", "artistic", "thoughtful", "no", "no"];
    var business_answers = ["english", "math", "studying", "reading", "ambitiouse", "hard-working", "yes", "yes"];
    var social_justice_answers = ["english", "art", "reading", "studying", "thoughtful", "no", "yes"];
    var leadership_answers = ["gym", "english", "friends", "reading", "creative", "ambitiouse", "yes", "yes"];

    var stem_l_2 = [];
    var academics_l_2 = [];
    var recreational_l_2 = [];
    var business_l_2 = [];
    var social_l_2 = [];
    var leadership_l_2 = [];
    var sum_list = [];
    var name_list = ["STEM", "Academics", "Recreational", "Business", "Social Justice", "Leadership"];
    var category_list = ["stem_category", "academics_category", "recreational_category", "business_category", "social_justice_category", "leadership_category"];
    var result_list = [];

    for (let i = 0; i < user_answers.length; i++) {
        if (stem_answers.includes(user_answers[i])) {
            stem_l_2.push(1);
        };
        if (academics_answers.includes(user_answers[i])) {
            academics_l_2.push(1);
        };
        if (recreational_answers.includes(user_answers[i])) {
            recreational_l_2.push(1);
        };
        if (business_answers.includes(user_answers[i])) {
            business_l_2.push(1);
        };
        if (social_justice_answers.includes(user_answers[i])) {
            social_l_2.push(1);
        };
        if (leadership_answers.includes(user_answers[i])) {
            leadership_l_2.push(1);
        };
    };
    let all_lists = [stem_l_2, academics_l_2, recreational_l_2, business_l_2, social_l_2, leadership_l_2]
    for (let i = 0; i < all_lists.length; i++){
        if (all_lists[i].length != 0) {
            var sum = parseInt(all_lists[i].reduce((partial_sum, a) => partial_sum + a));
        } else {
            var sum = 0;
        }
        sum_list.push(sum);
    }
    console.log(sum_list);
    console.log(name_list);

    var data_dict = {};
    name_list.forEach((key, i) => data_dict[key] = sum_list[i]);
    console.log(data_dict);

    let max_value = Math.max(... sum_list);

    for (const [key, value] of Object.entries(data_dict)) {
        if (value == max_value) {
            result_list.push(key);
        }
    }
    console.log(result_list);
    // result_list.classList.toggle("the_result");
    if (max_value !== 0){
        document.getElementById('output').innerHTML = "We recommend that you join clubs of this categoty: ".concat(result_list);
    }else{
        document.getElementById('output').innerHTML = "You have to complete the quiz in order to get the results!";
    }
};


// Open Button
document.getElementById('show-quiz').addEventListener('click', function() {
    var quiz =  document.getElementById('all_slides');
    if (quiz.style.display === 'none') {
        quiz.style.display = 'block';
        document.getElementById('show-quiz').innerHTML = "Close Quiz";
    }else{
        quiz.style.display = 'none';
        document.getElementById('show-quiz').innerHTML = "Show Quiz";
    }
});

async function createCalendar(daysAhead) {
    if (!dataFetched) {
        await fetchData();
    }
    let displayVertical = false;
    if (daysAhead == 1) {
        daysAhead = 5;
        displayVertical = true;
    }
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    let maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + daysAhead);

    let eventDates = {};

    for (const event of events) {
        let eventdate = new Date(event.start_time*1000);
        if (eventdate <= maxDate && eventdate >= today) {
            let distance = new Date(eventdate-today).getDate()-1;
            if (distance in eventDates) {
                eventDates[distance].push(event);
            } else {
                eventDates[distance] = [event];
            }
        }
    }

    let table = document.getElementById("calendar");
    table.innerHTML = "";
    let date = new Date();
    let overrides = {0: "Today", 1: "Tomorrow"};
    let row = document.createElement("tr");
    for (let i = 0; i<daysAhead; i++) {
        let col = document.createElement("td");
        col.classList.add("calendar_col", "calendar_header");
        if (displayVertical) {
            row = document.createElement("tr");
            col.classList.add("full_width");
        }
        if (i in overrides) {
            col.innerText = overrides[i];
        } else {
            col.innerText = date.toLocaleDateString("en-CA", {weekday: 'long'});
        }
        row.appendChild(col);
        if (displayVertical) {
            table.appendChild(row);
            row = document.createElement("tr");
            row.appendChild(document.createElement("td"));
            table.appendChild(row);
        }
        date.setDate(date.getDate() + 1);
    }
    table.appendChild(row);
    row = document.createElement("tr");
    for (let c = 0; c<daysAhead; c++){
        let col = document.createElement("td");
        col.classList.add("calendar_col");
        row.appendChild(col);
    }
    for (const date in eventDates) {
        eventDates[date].sort((a, b) => a.start_time - b.start_time);
        let col;
        if (displayVertical) {
            row = table.getElementsByTagName("tr")[date*2+1];
            col = row.getElementsByTagName("td")[0];
        } else {
            col = row.getElementsByTagName("td")[date];
        }
        for (const event of eventDates[date]) {
            let start_date = new Date(event.start_time*1000);
            let start_date_string = start_date.toISOString().replaceAll(/[-:]/g, "").split(".")[0] + "Z";
            let end_date = new Date(event.end_time*1000);
            let end_date_string = end_date.toISOString().replaceAll(/[-:]/g, "").split(".")[0] + "Z";
            let google_calendar_href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.title}&dates=${start_date_string}/${end_date_string}&details=${event.description}`;
            let ics_file_href = `data/events/${event.id}.ics`
            let main_div = document.createElement("div"); main_div.classList.add("calendar_event")
                let expand_link = document.createElement("button");
                    expand_link.classList.add("calendar_expand_button");
                    expand_link.addEventListener("click", () => {hidden_div.classList.toggle("expanded"); return false;});
                    let time_p = document.createElement("p");
                        time_p.classList.add("calendar_time");
                        time_p.innerText = start_date.toLocaleTimeString("en-CA", {timeStyle: "short"}).replaceAll(".", "") + " - " + end_date.toLocaleTimeString("en-CA", {timeStyle: "short"}).replaceAll(".", "");
                    expand_link.appendChild(time_p);
                    let title_p = document.createElement("p");
                        title_p.classList.add("calendar_time");
                        title_p.innerText = event.title;
                    expand_link.appendChild(title_p);
                main_div.appendChild(expand_link);
                let hidden_div = document.createElement("div");
                    hidden_div.classList.add("calendar_event_expand");
                    hidden_div.innerText = event.description;
                    hidden_div.appendChild(document.createElement("br"));
                    let add_to_calendar_link = document.createElement("a");
                        add_to_calendar_link.target = "_blank";
                        add_to_calendar_link.href = google_calendar_href;
                        let add_to_calendar_icon = document.createElement("img");
                            add_to_calendar_icon.classList.add("icons");
                            add_to_calendar_icon.src = "assets/icons/google_calendar.png";
                            add_to_calendar_icon.title = "Add to Google Calendar";
                            add_to_calendar_icon.alt = "Add to Google Calendar";
                        add_to_calendar_link.appendChild(add_to_calendar_icon);
                    hidden_div.appendChild(add_to_calendar_link);
                    let download_ics_link = document.createElement("a");
                    download_ics_link.href = ics_file_href;
                        let download_ics_icon = document.createElement("img");
                            download_ics_icon.classList.add("icons");
                            download_ics_icon.src = "assets/icons/download.png";
                            download_ics_icon.title = "Download ICS file";
                            download_ics_icon.alt = "Download ICS file";
                        download_ics_link.appendChild(download_ics_icon);
                    hidden_div.appendChild(download_ics_link);
                main_div.appendChild(hidden_div);
            col.appendChild(main_div);
        }
        if (!displayVertical) {
            table.appendChild(row);
        }
    }
}
createCalendar(Math.min(Math.floor(window.innerWidth/250), 7));
window.onresize = () => {createCalendar(Math.min(Math.floor(window.innerWidth/250), 7))}