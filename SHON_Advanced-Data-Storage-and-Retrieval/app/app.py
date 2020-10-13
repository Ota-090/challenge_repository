# 1. import Flask

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import datetime as dt


from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station


# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


# 3. Define what to do when a user hits the index route
@app.route("/")
def welcome():
    return (
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end>"
    )


# 4. Define what to do when a user hits the /about route
@app.route("/api/v1.0/precipitation")
def precipitation():
    
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    
    results = session.query(Measurement.date, Measurement.prcp).all()

    session.close()
    # Create a dictionary from the row data and append to a list of all_stations
    all_stations = []
    for date, prcp in results:
        station_dict = {}
        station_dict["date"] = date
        station_dict["prcp"] = prcp

        all_stations.append(station_dict)

    return jsonify(all_stations)   
    
    
@app.route("/api/v1.0/stations")
def stations():
    
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    
    results = session.query(Station.id, Station.station, Station.name, Station.latitude, Station.longitude,Station.elevation).all()

    session.close()
    # Create a dictionary from the row data and append to a list of all_stations
    all_stations = []
    for id, station, name, latitude, longitude,elevation in results:
        station_dict = {}
        station_dict["id"] = id
        station_dict["station"] = station
        station_dict["name"] = name
        station_dict["latitude"] = latitude
        station_dict["longitude"] = longitude
        station_dict["elevation"] = elevation

        all_stations.append(station_dict)

    return jsonify(all_stations)

@app.route("/api/v1.0/tobs")
def tobs():
    session = Session(engine)

    last_date = session.query(Measurement.date).order_by(Measurement.date.desc()).first()[0]
    first_date= dt.date(int(last_date.split("-")[0]),int(last_date.split("-")[1]), int(last_date.split("-")[2])) - dt.timedelta(days=365)
    station_active = session.query(Measurement.station,func.count(Measurement.station)).group_by(Measurement.station).order_by(func.count(Measurement.station).desc()).all()
    station_max = station_active[0][0]
    results= session.query(Measurement.date,Measurement.tobs).                    filter(Measurement.station==station_max).filter(Measurement.date<last_date).filter(Measurement.date>first_date).all()


    session.close()
    # Create a dictionary from the row data and append to a list of all_stations
    all_stations = []
    for date,tobs in results:
        station_dict = {}
        station_dict["date"] = date
        station_dict["tobs"] = tobs

        all_stations.append(station_dict)

    return jsonify(all_stations)


@app.route("/api/v1.0/<start>")
def start(start):
     session = Session(engine)
     results = session.query(Measurement.date,Measurement.tobs).all()
     session.close()
     all_stations = []
     for date,tobs in results:
         station_dict = {}
         station_dict["date"] = date
         station_dict["tobs"] = tobs
         all_stations.append(station_dict)
     
     for item in all_stations:
         search_date = item["date"]
         if search_date == start:
             temp_max =  session.query(func.max(Measurement.tobs)).filter(Measurement.date>start).all()[0][0]
             temp_min =  session.query(func.min(Measurement.tobs)).filter(Measurement.date>start).all()[0][0]
             temp_avg =  session.query(func.avg(Measurement.tobs)).filter(Measurement.date>start).all()[0][0]
             return jsonify({"max": f"the temp_max is {temp_max} ","min": f"the temp_min is {temp_min} ","avg": f"the temp_avg is {temp_avg} "})

     return jsonify({"error": f"Character with date not found."}), 404

@app.route("/api/v1.0/<start>/<end>")
def startend(start,end):
     session = Session(engine)
     results = session.query(Measurement.date,Measurement.tobs).all()
     session.close()
     all_stations = []
     for date,tobs in results:
         station_dict = {}
         station_dict["date"] = date
         station_dict["tobs"] = tobs
         all_stations.append(station_dict)
     
     for item in all_stations:
         search_date = item["date"]
         if search_date == start:
             temp_max =  session.query(func.max(Measurement.tobs)).filter(Measurement.date>start).filter(Measurement.date<end).all()[0][0]
             temp_min =  session.query(func.min(Measurement.tobs)).filter(Measurement.date>start).filter(Measurement.date<end).all()[0][0]
             temp_avg =  session.query(func.avg(Measurement.tobs)).filter(Measurement.date>start).filter(Measurement.date<end).all()[0][0]
             return jsonify({"max": f"the temp_max is {temp_max} ","min": f"the temp_min is {temp_min} ","avg": f"the temp_avg is {temp_avg} "})

     return jsonify({"error": f"Character with date not found."}), 404
 

if __name__ == "__main__":
    app.run(debug=True)
