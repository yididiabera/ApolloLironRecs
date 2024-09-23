CREATE DATABASE IF NOT EXISTS apollolironrecs_db;
CREATE USER IF NOT EXISTS 'apollolironrecs_dev'@'localhost' IDENTIFIED BY 'dev';
GRANT ALL PRIVILEGES ON apollolironrecs_db.* TO 'apolloliron_dev'@'localhost';
FLUSH PRIVILEGES;