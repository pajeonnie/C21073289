document.addEventListener("DOMContentLoaded", function () {
  
  // Contact form submission handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate the form
    if (name && email && message) {
      formStatus.textContent = "Thank you for your message! I will get back to you soon.";
      formStatus.style.color = 'green';
      contactForm.reset();  // Reset the form fields after successful submission
    } else {
      formStatus.textContent = "Please fill in all fields before submitting.";
      formStatus.style.color = 'red';
    }
  });

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  // Show/hide the scroll-to-top button based on scroll position
  window.onscroll = () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  };

  // Scroll to top on button click
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Handle progress bars (if any)
  window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress;
    });
  });

  // SQL.js setup (optional for handling database on the client-side)
  initSqlJs().then(function(SQL) {
    const db = new SQL.Database();

    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skill_name TEXT,
        proficiency INTEGER
      );
    `);

    // Insert sample data into the tables
    db.run("INSERT INTO articles (title, description) VALUES (?, ?)", ["Project 1", "This is a description of project 1"]);
    db.run("INSERT INTO articles (title, description) VALUES (?, ?)", ["Project 2", "This is a description of project 2"]);
    db.run("INSERT INTO skills (skill_name, proficiency) VALUES (?, ?)", ["HTML", 90]);
    db.run("INSERT INTO skills (skill_name, proficiency) VALUES (?, ?)", ["JavaScript", 80]);

    // Load articles and skills into the page
    loadArticles(db);
    loadSkills(db);
  });

  // Function to load articles from the database into the page
  function loadArticles(db) {
    const articlesDiv = document.getElementById("articles-list");
    const articles = db.exec("SELECT * FROM articles");

    articles[0].values.forEach(article => {
      const title = article[1];
      const description = article[2];

      const articleElement = document.createElement("div");
      articleElement.classList.add("article-item");

      const articleTitle = document.createElement("h3");
      articleTitle.innerText = title;
      articleElement.appendChild(articleTitle);

      const articleDescription = document.createElement("p");
      articleDescription.innerText = description;
      articleElement.appendChild(articleDescription);

      articlesDiv.appendChild(articleElement);
    });
  }

  // Function to load skills from the database into the page
  function loadSkills(db) {
    const skillsDiv = document.getElementById("skills-list");
    const skills = db.exec("SELECT * FROM skills");

    skills[0].values.forEach(skill => {
      const skillName = skill[1];
      const proficiency = skill[2];

      const skillElement = document.createElement("div");
      skillElement.classList.add("skill-item");

      const skillTitle = document.create
