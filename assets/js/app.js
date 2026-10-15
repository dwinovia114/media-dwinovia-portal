(() => {
  "use strict";
  const items = Array.isArray(window.MEDIA_ITEMS) ? window.MEDIA_ITEMS : (typeof MEDIA_ITEMS !== "undefined" ? MEDIA_ITEMS : []);
  const byId = id => document.getElementById(id);
  const search = byId("search-input");
  const subject = byId("subject-filter");
  const grade = byId("grade-filter");
  const type = byId("type-filter");
  const grid = byId("media-grid");
  const featuredGrid = byId("featured-grid");
  const count = byId("results-count");
  const empty = byId("empty-state");

  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const unique = values => [...new Set(values)].sort((a,b)=>a.localeCompare(b,"id"));
  const themeNames = ["blue","purple","mint","peach","dark","sky"];
  const validItems = items.filter(item => item && item.id && item.title);

  function fillSelect(select, values, placeholder) {
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }
  fillSelect(subject, unique(validItems.map(x=>x.subject).filter(Boolean)), "Semua mata pelajaran");
  fillSelect(grade, unique(validItems.flatMap(x=>x.grades || [])), "Semua kelas");
  fillSelect(type, unique(validItems.map(x=>x.type).filter(Boolean)), "Semua jenis");

  function card(item, isFeatured=false) {
    const theme = themeNames.includes(item.theme) ? item.theme : "blue";
    const tags = [
      item.subject ? `<span class="tag">${esc(item.subject)}</span>` : "",
      ...(item.grades || []).slice(0,2).map(g=>`<span class="tag">${esc(g)}</span>`),
      item.type ? `<span class="tag ${item.type.toLowerCase().includes("game") ? "type-game" : item.type.toLowerCase().includes("materi") ? "type-material" : ""}">${esc(item.type)}</span>` : "",
      item.latest ? `<span class="tag">Terbaru</span>` : ""
    ].filter(Boolean).join("");
    const active = item.status !== "coming-soon" && Boolean(item.url);
    const action = active
      ? `<a class="card-open" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Buka media <span aria-hidden="true">↗</span></a>`
      : `<span class="card-open" aria-label="Media segera tersedia" style="color:#9098a8">Segera hadir</span>`;
    const thumbnailHtml = item.thumbnail
      ? '<img class="media-thumbnail" src="' + esc(item.thumbnail) + '" alt="Thumbnail ' + esc(item.title) + '" loading="lazy">'
      : "";
    const coverClass = item.thumbnail ? " has-thumbnail" : "";

    return `<article class="media-card ${isFeatured ? "featured-card" : ""}">
      <div class="media-cover cover-${theme}${coverClass}">
        ${thumbnailHtml}
        <span class="cover-symbol">${esc(item.symbol || "✦")}</span>
        ${!active ? '<span class="cover-label">SEGERA HADIR</span>' : ''}
      </div>
      <div class="card-content"><div class="card-tags">${tags}</div><h3>${esc(item.title)}</h3><p>${esc(item.description || "")}</p>
      <div class="card-bottom"><span class="card-subject">${esc(item.subject || "Media pembelajaran")}</span>${action}</div></div>
    </article>`;
  }

  // Hide a thumbnail that fails to load and restore the fallback cover.
  document.addEventListener("error", event => {
    const image = event.target;
    if (image && image.classList && image.classList.contains("media-thumbnail")) {
      image.hidden = true;
      const cover = image.parentElement;
      if (cover) cover.classList.remove("has-thumbnail");
    }
  }, true);

  function renderFeatured() {
    const featured = validItems.filter(x=>x.featured).slice(0,3);
    featuredGrid.innerHTML = featured.length ? featured.map(x=>card(x,true)).join("") : `<p class="empty-copy">Media unggulan akan ditampilkan di sini.</p>`;
  }
  function render() {
    const query = search.value.trim().toLocaleLowerCase("id");
    const filtered = validItems.filter(item => {
      const haystack = [item.title,item.description,item.subject,item.type,...(item.grades||[])].join(" ").toLocaleLowerCase("id");
      return (!query || haystack.includes(query))
        && (!subject.value || item.subject === subject.value)
        && (!grade.value || (item.grades||[]).includes(grade.value))
        && (!type.value || item.type === type.value);
    });
    grid.innerHTML = filtered.map(x=>card(x)).join("");
    count.textContent = `${filtered.length} media ditemukan`;
    empty.hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;
  }
  function reset() {
    search.value = ""; subject.value = ""; grade.value = ""; type.value = ""; render();
  }
  [search,subject,grade,type].forEach(el=>el.addEventListener(el===search?"input":"change",render));
  byId("reset-filters").addEventListener("click",reset);
  byId("empty-reset").addEventListener("click",reset);
  byId("footer-year").textContent = `© ${new Date().getFullYear()} Media Dwinovia`;
  renderFeatured(); render();
})();
