(formatted write up is in working directory for easier reading)

Data Analyst Job Search

Collaborators
o	Megan Moroney
o	Nakouma Sako
o	Wen Shon
o	Matt Moormeier

Summary
Our ETL project is geared toward our fellow students who will be seeking employement as data analyst upon completion of our Data Visualization Bootcamp.  We located a csv file on Kaggle of data analyst jobs on Glassdoor.com.  We determined the top 50 cites with number of data analyst job postings to limit our job search.  Then we web scrapped Zillow.com to calculate average apartment pricing for each of our 50 cities.  The last dataset we brought in was current weather data for each city.  Our goal is to provide quick information about the city that the most data analyst jobs are being offered.

System Requirements
o	Chrome Web Browser
o	Chromedriver
o	Python environment running Python 3.7 with the following installations:
•	beautifulsoup4
•	numpy
•	pandas
•	requests
•	splinter
•	SQL

Data Sources
We gathered data analyst job listing from Kaggle.com HERE .  To determine information about the cost of living we scraped Zillow.com for apartments in each of our cities and calculated summary information.  Finally we utilized the OpenWeatherMap.org api to get a snapshot of weather in each city.

Transformation Steps
We created five separate jupyter notebooks to develop our python code; GlassDoorFinal, OpenWeatherFinal, Zillow_Scrape_Final and ZillowSummaryFinal..

In the the GlassDoorFinal notebook we:
o	Import the DataAnalyst.csv file and drop unneccsary columns.
o	Sort the dataframe by cities with the most jobs available and trim it to 50.
o	Filter our analyst job dataframe and export to csv
o	Create city dataframe and csv to export
o	Confirmed there are 50 unique cities.  Can use as primary key in SQL
Results
•	Glassdoorfinal.csv for import into SQL
•	Top50city.csv for import into SQL

In the OpenWeatherFinal notebook we:
o	List of 50 cities were broken into 3 lists
o	City Codes were looked up
o	Python request.get function
o	The JSON object for the 50 cities were loaded
o	JSON strings were converted to dataframe
o	Dataframes were concatenated and converted to csv files for export

Results
•	Weatherfinal.csv for import into SQL

In the Zillow_Scrape_Final notebook we:
o	Created dictionary of url strings to send to Zillow
o	Looped through list and scraped Zillow for housing prices in our 50 cities
o	We had to each run code so as not to get blocked

Results
Created housing_case.csv file for import into SQL

In the ZillowSummaryFinal notebook we:
o	Imported the housing_case.csv file
o	Calculated Average Home Price, Max Home Price and Min Home Price for each city
o	Exported zillowsummary.csv

Results
•	Created zillowsummary.csv for import into SQL

In Postgres we:
Create new database called DAJobSearch
Create Tables – city, housing, jobs, weather
Imported csv files into their tables

ERD included called: ERD




