--List the following details of each employee: employee number, last name, first name, sex, and salary.

SELECT e.emp_no as employee_number, e.last_name, e.first_name, e.sex,s.salary
FROM hw9.employees e
LEFT JOIN hw9.salaries s
ON e.emp_no = s.emp_no;




--List first name, last name, and hire date for employees who were hired in 1986.
SELECT  e.last_name, e.first_name, e.hire_date, extract(year from e.hire_date) as hire_year
FROM hw9.employees e
where  extract(year from e.hire_date) = 1986;


--List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name.


SELECT d.dept_no, d.dept_name,dm.emp_no, e.first_name,e.last_name
FROM hw9.departments d
LEFT JOIN hw9.dept_manager dm
ON d.dept_no = dm.dept_no
LEFT JOIN hw9.employees e
ON dm.emp_no= e.emp_no;

--List the department of each employee with the following information: employee number, last name, first name, and department name.

SELECT e.emp_no, e.first_name,e.last_name, d.dept_name
FROM hw9.employees e
LEFT JOIN hw9.dept_emp de
ON e.emp_no = de.emp_no
LEFT JOIN hw9.departments d
ON de.dept_no= d.dept_no;



--List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
SELECT  e.first_name,e.last_name, e.sex
FROM hw9.employees e
WHERE e.first_name='Hercules' AND e.last_name LIKE 'B%' ;

--List all employees in the Sales department, including their employee number, last name, first name, and department name.

SELECT dm.emp_no, e.first_name,e.last_name,d.dept_name
FROM hw9.departments d
LEFT JOIN hw9.dept_manager dm
ON d.dept_no = dm.dept_no
LEFT JOIN hw9.employees e
ON dm.emp_no= e.emp_no
WHERE d.dept_name = 'Sales'
;


--List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
SELECT dm.emp_no, e.first_name,e.last_name,d.dept_name
FROM hw9.departments d
LEFT JOIN hw9.dept_manager dm
ON d.dept_no = dm.dept_no
LEFT JOIN hw9.employees e
ON dm.emp_no= e.emp_no
WHERE d.dept_name IN ('Sales','Development')
;


--In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

SELECT e.last_name, count(e.last_name) AS Lname_number
FROM hw9.employees e
GROUP BY e.last_name
ORDER BY Lname_number DESC;

