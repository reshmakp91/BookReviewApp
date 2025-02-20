# 📚 BookReviewApp

## 📖 Overview
**BookReviewApp** is a web application that allows users to browse, review, and rate books. It provides a user-friendly interface to search for books, read reviews, and share opinions.

## 🚀 Features
- 📚 Browse a collection of books
- ✍️ Submit and edit reviews
- ⭐ Post comments
- 🔍 Search for books by title, author, or genre
- 👤 User authentication and profile management

## 🏗️ Tech Stack
- **Frontend:** HTML, CSS, React Js, Bootstrap
- **Backend:** Python, Django, Django REST Framework
- **Database:** MySQL 

## 🛠️ Installation
### 1️⃣ Clone the Repository
git clone https://github.com/reshmakp91/BookReviewApp.git
cd BookReviewApp


### 2️⃣ Set Up Backend
#### Create a Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate


#### Install Dependencies
pip install -r requirements.txt

#### Configure Database
Update `settings.py` with your database credentials.
Run migrations: python manage.py migrate

#### Run the Backend Server
python manage.py runserver
API available at [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/).

### 3️⃣ Set Up Frontend
#### Install Dependencies
cd frontend
npm install

#### Run the Frontend Server
npm start
Frontend available at [http://localhost:3000/](http://localhost:3001/).
