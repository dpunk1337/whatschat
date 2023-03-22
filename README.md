# WhatsChat
WhatsChat is a simple web application that provides group chat services and user management features. The application is built using Angular, Flask, Python, Typescript, SQLite, CSS, and HTML.

The application has two types of users - Admin and Normal users. Admin users can manage user accounts, while normal users can create, search, and delete groups, send group messages, and like messages. WhatsChat provides a user-friendly interface that resembles WhatsApp.

This application is solely meant as a training project to consolidate my learning in the given technologies.

To ensure that the application is fully functional, end-to-end tests have been implemented using Python. The database used is SQLite, which is easy to set up and use.

## Video Showcase
- [https://drive.google.com/file/d/1NU51hFsSecakwDE4vvzTEYs2BMqOQHYo/view?usp=share_link](https://drive.google.com/file/d/1NU51hFsSecakwDE4vvzTEYs2BMqOQHYo/view?usp=share_link)

## Features
- User management (Admin API)
  - Create and edit users
- Authentication (login and logout)
- Group management (Normal User API)
  - Create, delete, search, and add members to groups
- Group messages (Normal User API)
  - Send messages

## Local Deployment

- ### Developed with :
  - Angular CLI: 15.2.2
     - https://www.npmjs.com/package/@angular/cli/v/15.2.2
  - Node 18.15.02
     - https://nodejs.org/download/release/v18.15.0/
  - npm 9.5.0
     - https://www.npmjs.com/package/npm/v/9.5.0
  - Python 3.9.1
     - https://www.python.org/downloads/release/python-391/
     
 - ### Steps to deploy :
      - Make sure everything mentioned above is already installed and setup. 
          - You can have different version than mine, but there is no guarantee project will work or not.
      - Clone the project on local machine
      - Open Terminal or Command Prompt
    - Frontend :
      - Go to project root
      - `cd frontend`
      - `npm install`
      - `ng build`
   - Backend :
      - Go to project root
      - `python -m pip install virtualenv`
      - `python -m venv venv`
      - `source venv/bin/activate` for Unix/macOS or `.\venv\Scripts\activate` for Windows
      - `pip install -r requirements.txt`
      - `python run.py`
      - It will run a server on `http://127.0.0.1:<port>` 
        - Port mentioned in run.py. Other configurations present in config.py
        - Database used is SQLite which will automatically get setup on deployment

## How To Use 
  - This app, when launched for the first time, creates an admin user with credentials :
     - username : `admin`
     - password : `admin`
   - With these credentials admin panel is accessible, from where you can create more users
   - For more information, you can check out the showcase video mentioned above
