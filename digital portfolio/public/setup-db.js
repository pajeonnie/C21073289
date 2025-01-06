const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('news_articles.db', (err) => {
    if (err) {
        console.error("Error opening database:", err);
    } else {
        console.log("Database opened successfully.");
    }
});

const articles = [
    { title: "The River News Liveblog: Hangover Cures", content: "Alcohol increases urination and can cause an excess loss of several fluids..." },
    { title: "The River Newspaper: What is it like living with bed bugs?", content: "Bedbugs are invading our personal and intimate spaces, says Zihen. It's in your bedroom, the one place where you go to relax your mind and body..." },
    { title: "The River Newspaper: International students celebrating Chinese New Year away from home", content: "February 10 marks Chinese New Year - a celebration of the beginning of a new year according to the traditional Chinese calendar..." },
    { title: "The River Newspaper: As the strike ends, here is what to expect from Hollywood", content: "The Screen Actors Guild-American Federation of Television and Radio Artists (SAG-AFTRA) have announced the end of their longest TV and movie actors' strike in history..." },
    { title: "River News Instagram: What to watch in March", content: "As we approach the third month of the new year, here are our top picks for new movies coming out in March..." },
    { title: "10 Things you can do at Kingston's Christmas Market", content: "As Christmas approaches, why not visit Kingston’s Christmas Market to enjoy and unwind with some Christmas festivities..." }
];

const skills = [
    { name: "Data Analysis with Python", description: "Proficient in analyzing datasets using Python and libraries like pandas, numpy, and matplotlib." },
    { name: "SQL & Database Management", description: "Experienced in designing and querying databases using SQLite and other database management systems." },
    { name: "Data Visualization", description: "Skilled in creating interactive and static data visualizations using tools like Tableau and D3.js." },
    { name: "Web Scraping", description: "Able to collect data from websites using web scraping techniques with Python and BeautifulSoup." },
    { name: "Journalistic Investigations", description: "Specialized in using data and computational methods to conduct in-depth investigations and research." },
    { name: "Machine Learning for Journalism", description: "Applying machine learning algorithms to analyze trends, classify content, or predict outcomes based on data sets relevant to journalism." },
    { name: "Data Cleaning & Preprocessing", description: "Strong skills in cleaning and preparing raw data for analysis, addressing missing values, outliers, and inconsistencies." },
    { name: "Natural Language Processing (NLP)", description: "Using NLP techniques to analyze text-based data, including sentiment analysis, keyword extraction, and topic modeling." },
    { name: "Data-Driven Storytelling", description: "Combining data insights with narrative techniques to tell compelling, data-driven stories." },
    { name: "HTML, CSS, and JavaScript", description: "Proficient in front-end web development, using HTML for structure, CSS for styling, and JavaScript for interactive features." }
];

db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    
    db.run("DELETE FROM articles", function(err) {
        if (err) {
            console.error("Error deleting old articles:", err);
        } else {
            console.log("Old articles deleted successfully.");
        }
    });

    articles.forEach(article => {
        const query = `INSERT INTO articles (title, content) VALUES (?, ?)`;
        db.run(query, [article.title, article.content], function(err) {
            if (err) {
                console.error("Error inserting article:", err);
            } else {
                console.log(`Inserted article: ${article.title}`);
            }
        });
    });

    skills.forEach(skill => {
        const query = `INSERT INTO skills (name, description) VALUES (?, ?)`;
        db.run(query, [skill.name, skill.description], function (err) {
            if (err) {
                console.error("Error inserting skill:", err);
            } else {
                console.log(`Inserted skill: ${skill.name}`);
            }
        });
    });

    db.run("COMMIT", (err) => {
        if (err) {
            console.error("Error committing transaction:", err);
        } else {
            console.log("Transaction committed successfully.");
        }
    });

});

db.close((err) => {
    if (err) {
        console.error("Error closing the database:", err);
    } else {
        console.log("Database connection closed successfully.");
    }
});
