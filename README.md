# Whatschat

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
