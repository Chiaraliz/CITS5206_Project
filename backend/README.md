1. ### 1. **How to Run the Backend:**

   1. **Create a Virtual Environment:**

      ```
      python3 -m venv venv
      source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
      ```

   2. **Install Dependencies:**

      ```
      pip3 install -r requirements.txt
      ```

   3. **Set the Configuration File to Initialize the Flask Application:**

      ```
      bashCopy codeexport FLASK_APP=app  # For Linux/macOS
      set FLASK_APP=app  # For Windows
      ```

   4. **Run the Application:**

      ```
      python run.py
      ```

   ------

   ### 2. **How to Update the Root User:**

   1. Open the file `backend/app/routes.py`.

   2. Modify lines 535 and 536 to update the root user:

      ```
      root_username = "root"
      root_password = "supersecretpassword"  # This should be stored securely in a real system
      ```
