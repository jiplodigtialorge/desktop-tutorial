const dataUrl = "./data/investors.json";

const state = {
  investors: [],
  filters: {
    status: new Set(),
    stage: new Set(),
    focus: new Set()
  }
};

const selectors = {
  total: document.querySelector("#kpi-total"),
  approved: document.querySelector("#kpi-approved"),
  pending: document.querySelector("#kpi-pending"),
  cardsContainer: document.querySelector("#investor-cards"),
  emptyState: document.querySelector("#empty-state"),
  statusChips: document.querySelector("#status-chips"),
  stageChips: document.querySelector("#stage-chips"),
  focusChips: document.querySelector("#focus-chips"),
  resetButton: document.querySelector("#reset-filters"),
  a107List: document.querySelector("#a107-list"),
  template: document.querySelector("#investor-card-template")
};

async function loadData() {
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error(`Unable to load investor data (${response.status})`);
  }
  const investors = await response.json();
  state.investors = investors;
  initializeDashboard();
}

function initializeDashboard() {
  renderKpis(state.investors);
  renderChips();
  renderInvestors(state.investors);
  renderA107(state.investors.filter((investor) => investor.status === "Approved"));
  selectors.resetButton.addEventListener("click", () => {
    state.filters.status.clear();
    state.filters.stage.clear();
    state.filters.focus.clear();
    document.querySelectorAll(".chip.is-active").forEach((chip) => chip.classList.remove("is-active"));
    renderInvestors(state.investors);
  });
}

function renderKpis(investors) {
  const total = investors.length;
  const approved = investors.filter((investor) => investor.status === "Approved").length;
  const pending = investors.filter((investor) => investor.status === "Pending").length;
  selectors.total.textContent = total;
  selectors.approved.textContent = approved;
  selectors.pending.textContent = pending;
}

function renderChips() {
  const statuses = new Set(state.investors.map((investor) => investor.status));
  const stages = new Set(state.investors.map((investor) => investor.stage));
  const focuses = new Set(state.investors.flatMap((investor) => investor.focus));

  selectors.statusChips.append(...createChips([...statuses], "status"));
  selectors.stageChips.append(...createChips([...stages].sort(), "stage"));
  selectors.focusChips.append(...createChips([...focuses].sort(), "focus"));
}

function createChips(values, type) {
  return values.map((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = value;
    button.className = "chip";
    button.setAttribute("data-value", value);
    button.setAttribute("data-type", type);
    button.addEventListener("click", () => toggleChip(button, type, value));
    return button;
  });
}

function toggleChip(button, type, value) {
  const filterSet = state.filters[type];
  if (filterSet.has(value)) {
    filterSet.delete(value);
    button.classList.remove("is-active");
  } else {
    filterSet.add(value);
    button.classList.add("is-active");
  }
  const filtered = applyFilters();
  renderInvestors(filtered);
}

function applyFilters() {
  const { status, stage, focus } = state.filters;
  return state.investors.filter((investor) => {
    const matchesStatus = status.size === 0 || status.has(investor.status);
    const matchesStage = stage.size === 0 || stage.has(investor.stage);
    const matchesFocus = focus.size === 0 || investor.focus.some((tag) => focus.has(tag));
    return matchesStatus && matchesStage && matchesFocus;
  });
}

function renderInvestors(investors) {
  selectors.cardsContainer.innerHTML = "";
  if (investors.length === 0) {
    selectors.emptyState.hidden = false;
    return;
  }

  selectors.emptyState.hidden = true;

  const fragment = document.createDocumentFragment();
  investors.forEach((investor) => {
    const card = selectors.template.content.firstElementChild.cloneNode(true);
    card.querySelector(".investor-name").textContent = investor.name;
    const statusChip = card.querySelector(".status-chip");
    statusChip.dataset.status = investor.status;
    statusChip.textContent = investor.status;
    card.querySelector(".company").textContent = investor.company;

    const metaList = card.querySelector(".meta-list");
    metaList.append(createMetaItem("Check size", investor.checkSize));
    metaList.append(createMetaItem("Stage", investor.stage));
    metaList.append(createMetaItem("Notes", investor.notes));

    const tagList = card.querySelector(".tag-list");
    investor.focus.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      tagList.append(span);
    });

    const emailLink = card.querySelector(".email-link");
    emailLink.href = `mailto:${investor.email}`;
    emailLink.textContent = investor.email;

    const linkedinLink = card.querySelector(".linkedin-link");
    linkedinLink.href = investor.linkedin;

    fragment.append(card);
  });

  selectors.cardsContainer.append(fragment);
}

function createMetaItem(label, value) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${label}:</strong> ${value}`;
  return li;
}

function renderA107(approvedInvestors) {
  selectors.a107List.innerHTML = "";
  const fragment = document.createDocumentFragment();
  approvedInvestors.forEach((investor) => {
    const li = document.createElement("li");
    li.textContent = investor.name;
    fragment.append(li);
  });
  selectors.a107List.append(fragment);
}

loadData().catch((error) => {
  selectors.emptyState.hidden = false;
  selectors.emptyState.textContent = error.message;
});
