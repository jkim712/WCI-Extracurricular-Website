function toggleFilter(filter) {
    if (activeFilters.has(filter)) {
        activeFilters.delete(filter);
    } else {
        activeFilters.add(filter);
    }
}

function toggleFilterActive(filterElement) {
    filterElement.parentElement.classList.toggle("filter-active");
}

function toggleClubFilter(filterElement) {
    let filter = filterElement.id;
    toggleFilter(filter);
    toggleFilterActive(filterElement);
    setupBoxes(clubs, 'club_boxes', 2);
}

function toggleMusicFilter(filterElement) {
    let filter = filterElement.id;
    toggleFilter(filter);
    toggleFilterActive(filterElement);
    setupBoxes(music, 'music_boxes', 2);
}

function toggleAthleticsFilter(filterElement) {
    let filter = filterElement.id;
    toggleFilter(filter);
    toggleFilterActive(filterElement);
    setupBoxes(athletics, 'athletics_boxes', 2);
}

function toggleDropdown(dropdown_button) {
    let dropDownElement = dropdown_button.getElementsByClassName('dropdown_content')[0];
    let enableDropdown = !dropDownElement.classList.contains('dropdown-active');
    hideDropdown();
    if (enableDropdown) {
        dropDownElement.classList.toggle('dropdown-active');
    }
}

function hideDropdown() {
    for (const dropdown of document.getElementsByClassName('dropdown_content')) {
        dropdown.classList.remove('dropdown-active');
    }
}

window.onclick = function (event) {
    // if the user clicks anywhere outside of the filters dropdown menu, hide menu
    // check if the id, className, or tagName of event.target matches any of the elements of the dropdown menu
    const exceptions = ["filterbt", "dropdown-btn", "LABEL", "dropdown_content", "dropdown"];
    for (const exception of exceptions) {
        let className = event.target.classList.value;
        let id = event.target.id;
        let tagName = event.target.tagName;
        if (className.includes(exception) || exception == id || exception == tagName) {
            return;
        }
    }
    hideDropdown();
}
