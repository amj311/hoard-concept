CREATE SCHEMA IF NOT EXISTS `hoard`;
USE `hoard`;

DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id VARCHAR(36) NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE accounts (
	id VARCHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    currentBalance BIGINT NOT NULL DEFAULT 0,
    userID varchar(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE categories (
	id VARCHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    currentBalance BIGINT NOT NULL DEFAULT 0,
    userID varchar(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE transactions (
	id VARCHAR(36) NOT NULL,
	`type` ENUM('Income', 'Expense', 'Transfer') NOT NULL,
    amount BIGINT NOT NULL,
    memo VARCHAR(100),
    frequencyType VARCHAR(50) NOT NULL,
    frequencyPeriod TINYINT UNSIGNED NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE,
    userID varchar(36) NOT NULL,
    targetAccount varchar(36) NOT NULL,
    originAccount varchar(36),
    categoryID varchar(36),
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (targetAccount) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (originAccount) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (categoryID) REFERENCES categories (id) ON DELETE SET NULL ON UPDATE CASCADE
);
