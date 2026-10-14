const jobs = [
  {id:1,title:"Frontend Developer",company:"Northstar Digital",category:"Technology",type:"Full-time",work:"Remote",location:"Remote",salary:85000,salaryLabel:"$75k–$95k",logo:"</>",logoClass:"logo-blue",posted:"2 days ago",description:"Help build fast, accessible, thoughtful digital experiences. You'll work closely with design and product teammates to turn complex ideas into clean interfaces.",skills:["JavaScript","React","CSS"],level:"Mid level"},
  {id:2,title:"Graphic Designer",company:"CreativeHub",category:"Design",type:"Part-time",work:"Hybrid",location:"New York, NY",salary:52000,salaryLabel:"$45k–$60k",logo:"✎",logoClass:"logo-purple",posted:"1 day ago",description:"Create visual identities and digital campaign assets for a collaborative creative team. Bring your curiosity, strong visual instincts, and eye for detail.",skills:["Figma","Branding","Adobe CC"],level:"Entry level"},
  {id:3,title:"Marketing Specialist",company:"BrightPath Media",category:"Marketing",type:"Full-time",work:"On-site",location:"Chicago, IL",salary:68000,salaryLabel:"$55k–$75k",logo:"✳",logoClass:"logo-pink",posted:"3 days ago",description:"Plan campaigns, learn from audience insights, and help tell stories that connect. This role is a fit for a curious marketer who likes testing new ideas.",skills:["SEO","Content","Analytics"],level:"Mid level"},
  {id:4,title:"Data Analyst",company:"Datamind Group",category:"Technology",type:"Full-time",work:"Remote",location:"Remote",salary:92000,salaryLabel:"$80k–$105k",logo:"▥",logoClass:"logo-cyan",posted:"Today",description:"Turn data into clear insights that help teams make better decisions. You'll build reports, investigate trends, and communicate findings with care.",skills:["SQL","Python","Tableau"],level:"Mid level"},
  {id:5,title:"English Teacher",company:"Global Learning Center",category:"Education",type:"Part-time",work:"On-site",location:"Boston, MA",salary:42000,salaryLabel:"$35k–$50k",logo:"▱",logoClass:"logo-green",posted:"4 days ago",description:"Support learners as they build confidence in English. Develop engaging lessons, give constructive feedback, and help students reach their goals.",skills:["Teaching","English","Mentoring"],level:"Entry level"},
  {id:6,title:"UX/UI Designer",company:"PixelCraft Studio",category:"Design",type:"Full-time",work:"Remote",location:"Remote",salary:98000,salaryLabel:"$85k–$110k",logo:"✧",logoClass:"logo-purple",posted:"Today",description:"Design intuitive product journeys from early sketches to polished prototypes. Partner with research, engineering, and product to make digital tools easier to use.",skills:["Figma","Prototyping","Research"],level:"Senior level"},
  {id:7,title:"Finance Assistant",company:"Evergreen Partners",category:"Finance",type:"Full-time",work:"Hybrid",location:"Austin, TX",salary:57000,salaryLabel:"$48k–$65k",logo:"◈",logoClass:"logo-orange",posted:"5 days ago",description:"Help keep financial operations organized, accurate, and timely. Ideal for a detail-oriented person who enjoys problem-solving and learning new systems.",skills:["Excel","Reporting","Accounting"],level:"Entry level"},
  {id:8,title:"Community Health Coordinator",company:"WellSpring Network",category:"Healthcare",type:"Contract",work:"On-site",location:"Seattle, WA",salary:64000,salaryLabel:"$55k–$72k",logo:"✚",logoClass:"logo-green",posted:"2 days ago",description:"Coordinate community wellness programs and connect people with helpful resources. Build relationships with partners and support inclusive health initiatives.",skills:["Outreach","Planning","Communication"],level:"Mid level"},
  {id:9,title:"Software Engineering Intern",company:"Orbit Labs",category:"Technology",type:"Internship",work:"Hybrid",location:"San Francisco, CA",salary:38000,salaryLabel:"$30k–$45k",logo:"⌘",logoClass:"logo-blue",posted:"Today",description:"Learn alongside engineers while contributing to real product work. You'll get mentorship, code review, and room to grow your technical foundations.",skills:["JavaScript","Git","Problem solving"],level:"Internship"},
  {id:10,title:"Content Marketing Associate",company:"Storyline Co.",category:"Marketing",type:"Full-time",work:"Remote",location:"Remote",salary:61000,salaryLabel:"$52k–$70k",logo:"✳",logoClass:"logo-pink",posted:"6 days ago",description:"Create useful, engaging content across channels and help our audience discover what we do. You'll collaborate with design and marketing on campaigns.",skills:["Writing","SEO","Social media"],level:"Entry level"}
];

const pages = {
  home: document.getElementById("homePage"),
  jobs: document.getElementById("jobsPage"),
  signin: document.getElementById("signinPage"),
  signup: document.getElementById("signupPage"),
  about: document.getElementById("aboutPage"),
  contact: document.getElementById("contactPage")
};
const navLinks = document.querySelectorAll("[data-page]");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function navigate(page, updateHash = true) {
  if (!pages[page]) page = "home";
  Object.entries(pages).forEach(([key, element]) => element.classList.toggle("active", key === page));
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.page === page));
  document.getElementById("navigation").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  if (updateHash) history.replaceState(null, "", `#${page}`);
  window.scrollTo({top: 0, behavior: "smooth"});
  if (page === "jobs") renderJobs();
}
navLinks.forEach(link => link.addEventListener("click", event => {
  const page = link.dataset.page;
  if (!pages[page]) return;
  event.preventDefault();
  navigate(page);
}));

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("navigation");
  const isOpen = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(isOpen));
});

function jobCard(job) {
  const saved = getSavedJobs().includes(job.id);
  return `<article class="job-card">
    <div class="job-card-top"><span class="job-company-logo ${job.logoClass}">${job.logo}</span><button class="save-job ${saved ? "saved" : ""}" data-save="${job.id}" aria-label="${saved ? "Unsave" : "Save"} ${job.title}" title="${saved ? "Saved" : "Save job"}">${saved ? "♥" : "♡"}</button></div>
    <h3>${job.title}</h3><div class="job-company">${job.company}</div>
    <div class="job-tags"><span class="job-tag">${job.type}</span><span class="job-tag">${job.work}</span><span class="job-tag">${job.category}</span></div>
    <div class="job-card-bottom"><div class="job-salary">${job.salaryLabel} <small>/ year</small></div><button class="details-button" data-details="${job.id}">View details →</button></div>
  </article>`;
}
function getSavedJobs() {
  try { return JSON.parse(sessionStorage.getItem("findjobsSaved") || "[]"); } catch { return []; }
}
function setSavedJobs(ids) {
  try { sessionStorage.setItem("findjobsSaved", JSON.stringify(ids)); } catch {}
}
function renderFeatured() {
  document.getElementById("featuredGrid").innerHTML = jobs.slice(0, 3).map(jobCard).join("");
}
function currentFilters() {
  return {
    keyword: document.getElementById("jobsKeyword").value.trim().toLowerCase(),
    location: document.getElementById("jobsLocation").value.trim().toLowerCase(),
    category: document.getElementById("categoryFilter").value,
    types: [...document.querySelectorAll('input[name="jobType"]:checked')].map(input => input.value),
    styles: [...document.querySelectorAll('input[name="workStyle"]:checked')].map(input => input.value),
    sort: document.getElementById("sortJobs").value
  };
}
function renderJobs() {
  const filters = currentFilters();
  let filtered = jobs.filter(job => {
    const searchable = `${job.title} ${job.company} ${job.category} ${job.skills.join(" ")}`.toLowerCase();
    const matchesKeyword = !filters.keyword || searchable.includes(filters.keyword);
    const matchesLocation = !filters.location || `${job.location} ${job.work}`.toLowerCase().includes(filters.location);
    const matchesCategory = !filters.category || job.category === filters.category;
    const matchesType = !filters.types.length || filters.types.includes(job.type);
    const matchesStyle = !filters.styles.length || filters.styles.includes(job.work);
    return matchesKeyword && matchesLocation && matchesCategory && matchesType && matchesStyle;
  });
  if (filters.sort === "title") filtered.sort((a,b) => a.title.localeCompare(b.title));
  if (filters.sort === "salary") filtered.sort((a,b) => b.salary - a.salary);
  document.getElementById("resultCount").textContent = `Showing ${filtered.length} of ${jobs.length} opportunities`;
  document.getElementById("jobList").innerHTML = filtered.map(jobCard).join("");
  document.getElementById("jobList").classList.toggle("hidden", filtered.length === 0);
  document.getElementById("emptyState").classList.toggle("hidden", filtered.length !== 0);
}
function syncSearch(source) {
  const keyword = source === "hero" ? document.getElementById("heroKeyword").value : document.getElementById("jobsKeyword").value;
  const location = source === "hero" ? document.getElementById("heroLocation").value : document.getElementById("jobsLocation").value;
  document.getElementById("jobsKeyword").value = keyword;
  document.getElementById("jobsLocation").value = location;
  navigate("jobs");
  renderJobs();
}
document.getElementById("heroSearch").addEventListener("submit", e => { e.preventDefault(); syncSearch("hero"); });
document.getElementById("jobsSearch").addEventListener("submit", e => { e.preventDefault(); renderJobs(); });
["categoryFilter","sortJobs"].forEach(id => document.getElementById(id).addEventListener("change", renderJobs));
document.querySelectorAll('input[name="jobType"], input[name="workStyle"]').forEach(input => input.addEventListener("change", renderJobs));
document.getElementById("jobsKeyword").addEventListener("input", renderJobs);
document.getElementById("jobsLocation").addEventListener("input", renderJobs);

function clearFilters() {
  document.getElementById("jobsKeyword").value = "";
  document.getElementById("jobsLocation").value = "";
  document.getElementById("categoryFilter").value = "";
  document.getElementById("sortJobs").value = "recommended";
  document.querySelectorAll('input[name="jobType"], input[name="workStyle"]').forEach(input => input.checked = false);
  renderJobs();
}
document.getElementById("clearFilters").addEventListener("click", clearFilters);
document.getElementById("emptyClear").addEventListener("click", clearFilters);

document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
  document.getElementById("categoryFilter").value = button.dataset.category;
  navigate("jobs");
  renderJobs();
}));

document.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    let saved = getSavedJobs();
    if (saved.includes(id)) {
      saved = saved.filter(savedId => savedId !== id);
      showToast("Job removed from your saved list.");
    } else {
      saved.push(id);
      showToast("Job saved for this browsing session.");
    }
    setSavedJobs(saved);
    renderFeatured();
    renderJobs();
  }
  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) openJob(Number(detailsButton.dataset.details));
});

function openJob(id) {
  const job = jobs.find(item => item.id === id);
  if (!job) return;
  document.getElementById("modalContent").innerHTML = `
    <span class="job-company-logo ${job.logoClass}">${job.logo}</span>
    <h2 class="modal-title">${job.title}</h2><p class="modal-company">${job.company} · ${job.location}</p>
    <div class="job-tags"><span class="job-tag">${job.type}</span><span class="job-tag">${job.work}</span><span class="job-tag">${job.category}</span></div>
    <p class="modal-description">${job.description}</p>
    <div class="modal-detail-grid"><div class="modal-detail"><small>Salary estimate</small><strong>${job.salaryLabel} / year</strong></div><div class="modal-detail"><small>Experience</small><strong>${job.level}</strong></div><div class="modal-detail"><small>Posted</small><strong>${job.posted}</strong></div><div class="modal-detail"><small>Skills</small><strong>${job.skills.join(", ")}</strong></div></div>
    <button class="button button-primary button-full" id="applyDemo">Apply for this role <span>→</span></button>
    <p class="demo-note">Sample listing for this website demo; this button does not submit a real application.</p>`;
  document.getElementById("jobModal").showModal();
  document.getElementById("applyDemo").addEventListener("click", () => {
    document.getElementById("jobModal").close();
    showToast("This is a demo listing. Connect an application service to accept applications.");
  });
}
document.getElementById("modalClose").addEventListener("click", () => document.getElementById("jobModal").close());
document.getElementById("jobModal").addEventListener("click", e => {
  if (e.target === document.getElementById("jobModal")) document.getElementById("jobModal").close();
});

document.getElementById("togglePassword").addEventListener("click", () => {
  const input = document.getElementById("signinPassword");
  input.type = input.type === "password" ? "text" : "password";
  document.getElementById("togglePassword").textContent = input.type === "password" ? "◉" : "◎";
});
document.getElementById("signinForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("signinEmail").value.trim();
  document.getElementById("signinMessage").textContent = `Demo only: the sign-in form is working, but no account service is connected for ${email}.`;
});
document.getElementById("forgotPassword").addEventListener("click", () => showToast("Password reset needs a connected account service."));
document.getElementById("googleDemo").addEventListener("click", () => showToast("Google sign-in is a visual demo and is not connected."));
document.getElementById("signupForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  document.getElementById("signupMessage").textContent = `Thanks, ${name}! The form works as a demo, but account creation is not connected to a server.`;
});
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("contactNotice").textContent = "Your form looks good! This demo is not connected to an email service, so the message has not been sent.";
});
document.querySelectorAll(".category-card").forEach(button => button.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") button.click();
}));

renderFeatured();
renderJobs();
const initialPage = location.hash.replace("#", "");
if (pages[initialPage]) navigate(initialPage, false);

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("findjobs-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

function updateThemeButton() {
    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
}

updateThemeButton();

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem("findjobs-theme", isDark ? "dark" : "light");

    updateThemeButton();
});
```