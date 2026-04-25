/* =========================
   Read More / Read Less
========================= */
const toggleBtn = document.getElementById("toggle-btn");
const readMoreText = document.getElementById("read-more");

if (toggleBtn && readMoreText) {
    toggleBtn.addEventListener("click", function () {
        readMoreText.classList.toggle("hidden");

        if (readMoreText.classList.contains("hidden")) {
            toggleBtn.textContent = "Read More";
        } else {
            toggleBtn.textContent = "Read Less";
        }
    });
}

/* =========================
   Dark / Light Mode
========================= */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    // Apply saved theme when page loads
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "Light Mode";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "Dark Mode";
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });
}

/* =========================
   Project Filtering & Sorting
========================= */
const filterSelect = document.getElementById("filter-projects");
const sortSelect = document.getElementById("sort-projects");
const projectsList = document.querySelector(".projects-list");

function updateProjects() {
    if (!filterSelect || !sortSelect || !projectsList) return;

    const selectedCategory = filterSelect.value;
    const selectedSort = sortSelect.value;
    const projects = Array.from(projectsList.querySelectorAll(".item"));

    projects.forEach(project => {
        const category = project.dataset.category;

        if (selectedCategory === "all" || category === selectedCategory) {
            project.style.display = "flex";
        } else {
            project.style.display = "none";
        }
    });

    projects.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);

        if (selectedSort === "newest") {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    projects.forEach(project => projectsList.appendChild(project));
}

if (filterSelect && sortSelect) {
    filterSelect.addEventListener("change", updateProjects);
    sortSelect.addEventListener("change", updateProjects);
    updateProjects();
}

/* =========================
   GitHub API Integration
========================= */
const githubStatus = document.getElementById("github-status");
const githubRepos = document.getElementById("github-repos");

async function loadGitHubRepos() {
    if (!githubStatus || !githubRepos) return;

    try {
        const response = await fetch("https://api.github.com/users/Kaltham1/repos");

        if (!response.ok) {
            throw new Error("GitHub repositories could not be loaded.");
        }

        const repos = await response.json();

        githubStatus.textContent = "";
        githubRepos.innerHTML = "";

        repos.slice(0, 4).forEach(repo => {
            const repoCard = document.createElement("div");
            repoCard.className = "repo-card";

            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description yet."}</p>
                <p class="repo-meta"><strong>Languages:</strong> ${repo.language || "Not specified"}</p>
                <p class="repo-meta"><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <a href="${repo.html_url}" target="_blank" rel="noopener">View Repository</a>
            `;

            githubRepos.appendChild(repoCard);
        });
    } catch (error) {
        githubStatus.textContent = "Unable to load GitHub repositories. Please try again later.";
    }
}

loadGitHubRepos();

/* =========================
   Contact Form Validation
========================= */
const contactForm = document.getElementById("contact-form");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const feedback = document.getElementById("form-feedback");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const messageError = document.getElementById("message-error");

function showError(input, errorElement, messageText) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
    errorElement.textContent = messageText;
}

function showSuccess(input, errorElement) {
    input.classList.remove("input-error");
    input.classList.add("input-success");
    errorElement.textContent = "";
}

function validateForm() {
    let isValid = true;

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^05\d{8}$/;

    if (nameValue.length < 2) {
        showError(fullName, nameError, "Please enter your full name.");
        isValid = false;
    } else {
        showSuccess(fullName, nameError);
    }

    if (!emailPattern.test(emailValue)) {
        showError(email, emailError, "Please enter a valid email address.");
        isValid = false;
    } else {
        showSuccess(email, emailError);
    }

    if (!phonePattern.test(phoneValue)) {
        showError(phone, phoneError, "Phone number must start with 05 and contain 10 digits.");
        isValid = false;
    } else {
        showSuccess(phone, phoneError);
    }

    if (messageValue.length < 10) {
        showError(message, messageError, "Please enter a message with at least 10 characters.");
        isValid = false;
    } else {
        showSuccess(message, messageError);
    }

    return isValid;
}

if (contactForm) {
    [fullName, email, phone, message].forEach(input => {
        input.addEventListener("input", validateForm);
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            feedback.textContent = "Please fix the highlighted fields before sending.";
            feedback.style.color = "red";
            return;
        }

        feedback.textContent = `Thank you, ${fullName.value.trim()}! Your message was sent successfully.`;
        feedback.style.color = "green";

        contactForm.reset();

        [fullName, email, phone, message].forEach(input => {
            input.classList.remove("input-success", "input-error");
        });
    });
}