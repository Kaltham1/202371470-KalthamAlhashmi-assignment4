const toggleBtn = document.getElementById("toggle-btn");
const moreText = document.getElementById("read-more");

toggleBtn.addEventListener("click", () => {
  moreText.classList.toggle("hidden");
  toggleBtn.textContent = moreText.classList.contains("hidden")
    ? "Read More"
    : "Read Less";
});

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

function showError(input, errorElement, message) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
    errorElement.textContent = message;
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
        showError(email, emailError, "Please enter a valid email address, like name@example.com.");
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

[fullName, email, phone, message].forEach(input => {
    input.addEventListener("input", validateForm);
});

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

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

// Function to fetch and display GitHub repositories
async function loadGitHubRepos() {
    const status = document.getElementById("github-status");
    const reposContainer = document.getElementById("github-repos");

    // Safety check
    if (!status || !reposContainer) return;

    const username = "Kaltham1";
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

    try {
        status.textContent = "Loading repositories...";

        // Fetch repos list
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch repositories.");
        }

        const repos = await response.json();

        if (!repos.length) {
            status.textContent = "No repositories found.";
            return;
        }

        // For each repo, fetch its languages
        const reposWithLanguages = await Promise.all(
            repos.map(async (repo) => {
                try {
                    const langResponse = await fetch(repo.languages_url);

                    if (!langResponse.ok) {
                        throw new Error("Failed to fetch languages.");
                    }

                    const languagesData = await langResponse.json();
                    const languages = Object.keys(languagesData);

                    return {
                        ...repo,
                        languages: languages.length ? languages.join(", ") : "Not specified"
                    };
                } catch (error) {
                    return {
                        ...repo,
                        languages: "Not specified"
                    };
                }
            })
        );

        status.textContent = "";

        // Display repos
        reposContainer.innerHTML = reposWithLanguages
            .map(repo => `
                <div class="repo-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description yet."}</p>
                    <div class="repo-meta">
                        <p><strong>Languages:</strong> ${repo.languages}</p>
                        <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener">View Repository</a>
                </div>
            `)
            .join("");

    } catch (error) {
        status.textContent = "Unable to load GitHub repositories right now. Please try again later.";
        reposContainer.innerHTML = "";
        console.error("GitHub API error:", error);
    }
}

// Run function when page loads
document.addEventListener("DOMContentLoaded", loadGitHubRepos);


// Function to handle filtering and sorting of project cards
function setupProjectControls() {
    // Get elements from the page
    const filterSelect = document.getElementById("filter-projects");
    const sortSelect = document.getElementById("sort-projects");
    const projectsList = document.querySelector(".projects-list");

    // If elements are not found, stop execution (prevents errors)
    if (!filterSelect || !sortSelect || !projectsList) return;

    // Convert NodeList of project cards into an array
    const projectCards = Array.from(projectsList.querySelectorAll(".item"));

    // Function that updates the displayed projects
    function updateProjects() {
        // Get current user selections
        const selectedCategory = filterSelect.value;
        const selectedSort = sortSelect.value;

        // Step 1: Filter projects based on selected category
        let visibleProjects = projectCards.filter(card => {
            const category = card.dataset.category;

            // Show all if "all" is selected, otherwise match category
            return selectedCategory === "all" || category === selectedCategory;
        });

        // Step 2: Sort projects by date
        visibleProjects.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);

            // If "newest", show latest first, otherwise oldest first
            return selectedSort === "newest" ? dateB - dateA : dateA - dateB;
        });

        // Step 3: Clear current project display
        projectsList.innerHTML = "";

        // Step 4: Re-add filtered and sorted projects to the page
        visibleProjects.forEach(card => {
            projectsList.appendChild(card);
        });
    }

    // Event listeners: run update when user changes options
    filterSelect.addEventListener("change", updateProjects);
    sortSelect.addEventListener("change", updateProjects);

    // Initial run when page loads
    updateProjects();
}

// Run the function after the page content is fully loaded
document.addEventListener("DOMContentLoaded", setupProjectControls);


// Function to handle dark/light mode and save the user's choice
function setupThemeToggle() {
    const themeButton = document.getElementById("theme-toggle");

    // Stop if button is not found
    if (!themeButton) return;

    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme when page loads
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.textContent = "Light Mode";
    }

    // Toggle theme when button is clicked
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Save current theme and update button text
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeButton.textContent = "Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeButton.textContent = "Dark Mode";
        }
    });
}

// Run after page loads
document.addEventListener("DOMContentLoaded", setupThemeToggle);
