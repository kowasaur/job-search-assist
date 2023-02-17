function createHide(listing, button_box_classes) {
    const button_box = listing.querySelector(button_box_classes);
    const hide = button_box.appendChild(button_box.lastChild.cloneNode(true));

    const hide_span = [...hide.querySelectorAll("span")].at(-1);
    hide_span.textContent = "Hide";
    hide_span.style.color = "red";
    return [hide, hide_span];
}

function setHideClick(click_element, id, element_to_remove) {
    click_element.addEventListener("click", () => {
        hidden_ids.add(id);
        localStorage.setItem("hidden-ids", JSON.stringify([...hidden_ids]));
        element_to_remove.remove();
    });
}

const string_ids = localStorage.getItem("hidden-ids") ?? "[]";
const hidden_ids = new Set(JSON.parse(string_ids));

const listings = document.querySelectorAll("article");

// On individual listing site (seek.com.au/job/[numbers])
if (listings.length == 0) {
    const id = [...document.querySelectorAll("link")].at(-1).href.split("/").at(-1);
    const [hide] = createHide(document, "._14uh994ey .v8nw0725");

    const hide_button = [...hide.querySelectorAll("button")].at(-1);
    setHideClick(hide_button, id, hide_button);
}

// Search (seek.com.au/[search query])
for (const listing of listings) {
    const id = listing.dataset.jobId;
    if (hidden_ids.has(id)) {
        console.log(`${id} is hidden`);
        listing.remove();
        continue;
    }

    const [hide, hide_span] = createHide(listing, "._14uh9946i ._14uh9947i");
    hide.querySelector("svg").parentElement.remove();
    hide_span.style.marginLeft = "15px";
    setHideClick(hide_span, id, listing);
}
