CREATE TABLE salaries (
  work_year INT CHECK (work_year BETWEEN 2020 AND 2024),
  experience_level CHECK(experience_level IN ('SE', 'MI', 'EN', 'EX')),
  employment_type CHECK(employment_type IN ('FT', 'PT', 'CT', 'FL')),
  job_title VARCHAR(255),
  salary INT,
  salary_currency CHAR(3),
  salary_in_usd INT,
  employee_residence CHAR(2),
  remote_ratio TINYINT CHECK (remote_ratio BETWEEN 0 AND 100),
  company_location CHAR(2),
  company_size CHECK(company_size IN ('S', 'M', 'L'))
);

.separator ,
.import salaries.csv salaries