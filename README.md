# tech-blog
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents

- [tech-blog](#tech-blog)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Built With](#built-with)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Questions](#questions)
  

## Description
Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept covered in this course returns thousands of think pieces and tutorials from developers of all skill levels! This program is a CMS style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. This app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

 <br />



[Demo walkthrough](./public/demo.gif)




## Installation

1. [Install Node.js](https://nodejs.org/en/download/)
2. [Install MySQL](https://www.mysql.com)

3. Create database
   
        mysql -u root -p
        source ./db/schema.sql

4. Install JavaScript packages given in package.json

        npm install


5. Seed database:

        npm run seed

## Usage

        npm start

[Test deployed on Heroku as well](https://techblog-henrykam.herokuapp.com/)

<br>

## Built With

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * [bcrypt](https://www.npmjs.com/package/bcrypt)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
  * [MySQL2](https://www.npmjs.com/package/mysql2)
  * [Node.js](https://nodejs.org/en/)
  * [nodemon](https://nodemon.io/)
  * [Sequelize](https://sequelize.org/)
* [MySQL](https://www.mysql.com)



## Technologies Used

* [Microsoft Visual Studio Code](https://code.visualstudio.com/)
* [Git Bash](https://git-scm.com/downloads)
* [GitHub](https://github.com/)
* [Heroku](https://www.heroku.com/)
* [MySQL Workbench](https://www.mysql.com/products/workbench/)

## Contributing


**Henry Kam**

- [Github](https://github.com/gulpinhenry)
- [LinkedIn](https://www.linkedin.com/in/kamhenry/)


## License

This application is covered under the MIT license

## Questions

For any questions, please reach out by creating an issue.