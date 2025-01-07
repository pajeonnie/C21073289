document.addEventListener("DOMContentLoaded", function () {

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      formStatus.textContent = "Thank you for your message! I will get back to you soon.";
      formStatus.style.color = 'green';
      contactForm.reset();
    } else {
      formStatus.textContent = "Please fill in all fields before submitting.";
      formStatus.style.color = 'red';
    }
  });

  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.onscroll = () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  };

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress;
    });
  });

  initSqlJs().then(function(SQL) {
    const db = new SQL.Database();

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

    db.run("INSERT INTO articles (title, description) VALUES (?, ?)", ["Project 1", "This is a description of project 1"]);
    db.run("INSERT INTO articles (title, description) VALUES (?, ?)", ["Project 2", "This is a description of project 2"]);
    db.run("INSERT INTO skills (skill_name, proficiency) VALUES (?, ?)", ["HTML", 90]);
    db.run("INSERT INTO skills (skill_name, proficiency) VALUES (?, ?)", ["JavaScript", 80]);

    loadArticles(db);
    loadSkills(db);
  });

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

  function loadSkills(db) {
    const skillsDiv = document.getElementById("skills-list");
    const skills = db.exec("SELECT * FROM skills");

    skills[0].values.forEach(skill => {
      const skillName = skill[1];
      const proficiency = skill[2];

      const skillElement = document.createElement("div");
      skillElement.classList.add("skill-item");

      const skillTitle = document.createElement("h3");
      skillTitle.innerText = `${skillName} - ${proficiency}%`;
      skillElement.appendChild(skillTitle);

      skillsDiv.appendChild(skillElement);
    });
  }

});
