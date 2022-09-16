

## Frappy Time

This online app is designed to be a frappuccino store to compete with the glorious StarBuck.


## WorkSpace Organization & Name Scheme

The Frappy Time web app and all of it's necessary components will be stored within this repository along with the backend repository under the same Github organization titled CS3450-group4. Helpful documentation and other files not directly related to the apps functions will be placed within a "docs" folder in this repo. The frontend app itself will reside within the public and src folders, while backend components will initially be divided among base, api, and CS3450_backend folders. Further file organization will be created as required at the project members discretion.


## Version Control Procedures

All project work will be contained with this git repository, and any modifications to said repo 
will undergo review. Branching off of master, changes will be made on a separate branch and then pushed up stream. A PR will be created and given to the team member most able to review the given work in a timely manner. The reviewer will both visually inspect the code, along with pulling down their branch and attempting to run the changes in real time. After being approved, the branch will then be merged into master and deleted to help prevent branch clutter.


## Tool Stack Description

Django: Due widespread familiarity with the platform, Django will be used for the backend database and corresponding API. ReactJS: Based around JavaScript and TypeScript, ReactJS will be implemented as our front-end and call upon our Django API backend.


## Build Instructions/Setup Procedure

After cloning this repository, from the command line perform the following commands:

`cd into the project directory`

`pip install -r requirments.txt`

`python manage.py makemigrations`

`python manage.py migrate`

The backend should now be ready to go.


## System Testing / "Unit Testing" Instructions

We can use the api/additem/ endpoint to post data to the database. Try 
pasting the Json snippet below into the input box at the bottom of the page, then click the post button.
```
{
    "name": "frapoccino",
    "price": 200
  }
```
Now visit the endpoint /api/ to send a get request for all menuitems in the database.

Run `python manage.py runserver` then open localhost:8000/api/additem/ in your browser.


## Other Development Notes (As Needed)
