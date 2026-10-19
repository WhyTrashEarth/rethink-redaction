// Demonstration only: there is no original or concealed text to reveal.
for (const comparison of document.querySelectorAll("[data-comparison]")) {
  const controls = comparison.querySelector(".comparison-controls");
  const status = comparison.querySelector(".comparison-status");
  const label = comparison.querySelector("[data-treatment-label]");
  function update() {
    const treatment =
      comparison.querySelector('input[name="treatment"]:checked')?.value ??
      "outline";
    const scope =
      comparison.querySelector('input[name="scope"]:checked')?.value ??
      "passages";
    comparison.dataset.style = treatment;
    comparison.dataset.scope = scope;
    label.textContent = treatment === "light" ? "Light fill" : "Outline";
    for (const passages of comparison.querySelectorAll(".passages"))
      passages.hidden = scope === "page";
    for (const page of comparison.querySelectorAll(".whole-page"))
      page.hidden = scope !== "page";
    status.textContent =
      "Comparing solid fill with " +
      (treatment === "light" ? "light fill" : "outlines") +
      " for " +
      (scope === "page" ? "a whole page" : "selected passages") +
      ".";
  }
  controls.hidden = false;
  controls.addEventListener("change", update);
  update();
}
