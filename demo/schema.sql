DROP DATABASE IF EXISTS `gymdb`;


CREATE DATABASE `gymdb`;

CREATE TABLE events (
id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
title varchar(250) NULL,
start timestamp NULL,
end timestamp NULL,
allDay varchar(250) NULL,
editable varchar(250) NULL,
backgroundColor varchar(250) NULL
);

