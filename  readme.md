Create a Virtual Environment:

python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
Install Dependencies:

pip3 install -r requirements.txt
Set the configuration file to initialize the Flask application with the following command:

export FLASK_APP=app
set FLASK_APP=app (windows)
Run the Application: run run.py