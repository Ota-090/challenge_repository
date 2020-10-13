-------------------------------------------------------------
-- Create titles
CREATE TABLE hw9.titles(
  title_id VARCHAR(255),
  title VARCHAR(255),
  PRIMARY KEY (title_id)
);

INSERT INTO hw9.titles(title_id, title) VALUES
('s0001','Staff'),
('s0002','Senior Staff'),
('e0001','Assistant Engineer'),
('e0002','Engineer'),
('e0003','Senior Engineer'),
('e0004','Technique Leader'),
('m0001','Manager');
-------------------------------------------------------------

-- Create employees
CREATE TABLE hw9.employees(
  emp_no INT,
  emp_title_id VARCHAR(255),
  bitth_date DATE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  sex  VARCHAR(255),
  hire_date DATE,
  PRIMARY KEY (emp_no),
  FOREIGN KEY (emp_title_id) REFERENCES hw9.titles(title_id)
);


COPY hw9."employees" FROM 'F:\camp\hw\hw9\data\employees.csv' DELIMITER ',' CSV HEADER;
------------------------------------------------------------

-- Create departments table and insert values
CREATE TABLE hw9.departments(
  dept_no VARCHAR(255), 
  dept_name VARCHAR(255),
  PRIMARY KEY (dept_no)
);

INSERT INTO hw9.departments(dept_no ,dept_name) VALUES
('d001','Marketing'),
('d002','Finance'),
('d003','Human Resources'),
('d004','Production'),
('d005','Development'),
('d006','Quality Management'),
('d007','Sales'),
('d008','Research'),
('d009','Customer Service');
-------------------------------------------------------------
-- Create hw9.dept_emp 
CREATE TABLE hw9.dept_emp(
  emp_no INT,
  dept_no VARCHAR(255),
  PRIMARY KEY (emp_no,dept_no),
  FOREIGN KEY (emp_no) REFERENCES hw9.employees(emp_no),
  FOREIGN KEY (dept_no) REFERENCES hw9.departments(dept_no)
);
COPY hw9."dept_emp" FROM 'F:\camp\hw\hw9\data\dept_emp.csv' DELIMITER ',' CSV HEADER;
-------------------------------------------------------------
CREATE TABLE hw9.dept_manager(
  emp_no INT,
  dept_no VARCHAR(255),
  PRIMARY KEY (emp_no),
  FOREIGN KEY (emp_no) REFERENCES hw9.employees(emp_no),
  FOREIGN KEY (dept_no) REFERENCES hw9.departments(dept_no)
);

INSERT INTO hw9.dept_manager(dept_no,emp_no) VALUES
('d001',110022),
('d001',110039),
('d002',110085),
('d002',110114),
('d003',110183),
('d003',110228),
('d004',110303),
('d004',110344),
('d004',110386),
('d004',110420),
('d005',110511),
('d005',110567),
('d006',110725),
('d006',110765),
('d006',110800),
('d006',110854),
('d007',111035),
('d007',111133),
('d008',111400),
('d008',111534),
('d009',111692),
('d009',111784),
('d009',111877),
('d009',111939);

-------------------------------------------------------------





-- Create salaries
CREATE TABLE hw9.salaries(
  emp_no INT,
  salary INT,
  PRIMARY KEY (emp_no),
  FOREIGN KEY (emp_no) REFERENCES hw9.employees(emp_no)
);

COPY hw9."salaries" FROM 'F:\camp\hw\hw9\data\salaries.csv' DELIMITER ',' CSV HEADER;
-------------------------------------------------------------