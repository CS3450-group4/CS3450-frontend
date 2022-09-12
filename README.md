## Quickstart guide
After cloning this repository, from the command line perform the following commands:

`cd into the project directory`

`pip install -r requirments.txt`

`python manage.py makemigrations`

`python manage.py migrate`

The backend should now be ready to go.
Run `python manage.py runserver` then open localhost:8000/api/additem/ in your browser.

We can use the api/additem/ endpoint to post data to the database. Try 
pasting the Json snippet below into the input box at the bottom of the page, then click the post button.
```
{
    "name": "frapoccino",
    "price": 200
  }
```
Now visit the endpoint /api/ to send a get request for all menuitems in the database.
