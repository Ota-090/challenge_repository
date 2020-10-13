#Import necessary libraries
from flask import Flask, render_template, redirect
import pymongo
from flask_pymongo import PyMongo
import scrape_mars

#Create instance of Flask app
app = Flask(__name__, template_folder='template')


#Establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")


#Create route to render index.html template using data from Mongo
@app.route("/")
def index():
    mars_dict = mongo.db.mars_dict.find_one()
    return render_template("index.html", mars_dict=mars_dict)


#Create route to scrape data
@app.route("/scrape")
def scrape():

    mars_dict = mongo.db.mars_dict

    #Run scrape function
    #scrape_data = scrape_mars.scrape()
    scrape_data = scrape_mars.scrape()

    #Update Mongo database
    mars_dict.update({}, scrape_data, upsert=True)

    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
