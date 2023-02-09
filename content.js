const string_ids = localStorage.getItem("hidden-ids") ?? "[]";
const hidden_ids = new Set(JSON.parse(string_ids));

const listings = document.querySelectorAll("article");

for (const listing of listings) {
    const id = listing.dataset.jobId;
    if (hidden_ids.has(id)) {
        console.log(`${id} is hidden`);
        listing.remove();
        continue;
    }

    const button_box = listing.querySelector("._14uh9946i ._14uh9947i");
    const hide = button_box.firstChild.cloneNode(true);
    button_box.appendChild(hide);
    hide.querySelector("svg").parentElement.remove();

    const all_hide_spans = hide.querySelectorAll("span");
    const hide_span = all_hide_spans[all_hide_spans.length - 1];
    hide_span.textContent = "Hide";
    hide_span.style.marginLeft = "15px";
    hide_span.style.color = "red";

    hide_span.addEventListener("click", () => {
        hidden_ids.add(id);
        localStorage.setItem("hidden-ids", JSON.stringify([...hidden_ids]));
        listing.remove();
    });
}
