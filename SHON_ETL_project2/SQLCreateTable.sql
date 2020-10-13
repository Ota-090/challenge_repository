-- Create city table
CREATE TABLE city (
	city_id Integer NOT NULL Primary Key,
	job_location VARCHAR(30) NOT NULL,
	city_only VARCHAR(30)
);

CREATE TABLE jobs (
	job_id Integer NOT NULL PRIMARY KEY,
	job_title VARCHAR(500) NOT NULL,
	salary VARCHAR (30),
	description VARCHAR (1000000),
	rating VARCHAR(10),
	company_name VARCHAR (150),
	job_location VARCHAR(100),
	headquarters VARCHAR(100),
	company_size VARCHAR (30),
	founded VARCHAR (15),
	ownership VARCHAR (100),
	industry VARCHAR (100),
	sector VARCHAR (100),
	revenue VARCHAR (50),
	competitors VARCHAR (100)	
	
);


-- Add FK to salaries
ALTER TABLE jobs add constraint job_location FOREIGN KEY(job_location) REFERENCES city(job_location);



-- Create weather table
CREATE TABLE weather (
	weather_id VARCHAR NOT NULL PRIMARY KEY,
	weather_location VARCHAR(30) NOT NULL,
	actual_temp VARCHAR (10),
	temp_feels VARCHAR (10),
	temp_min VARCHAR (10),
	temp_max VARCHAR (10),
	pressure VARCHAR (10),
	humidity VARCHAR (10),
	wind VARCHAR (10),
	wind_degree VARCHAR (10),
	cloud VARCHAR (10)
	
);

-- Create housing table
CREATE TABLE housing (
	city_id Integer NOT NULL PRIMARY KEY,
	city_location VARCHAR NOT NULL,
	max_price Integer,
	min_price Integer,
	avg_price Integer
);







