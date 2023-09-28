-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema EventsDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema EventsDB
-- -----------------------------------------------------

DROP DATABASE IF EXISTS `EventsDB`;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema EventsDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema EventsDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `EventsDB` DEFAULT CHARACTER SET utf8 ;
USE `EventsDB` ;

-- -----------------------------------------------------
-- Table `EventsDB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EventsDB`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EventsDB`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EventsDB`.`events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(225) NOT NULL,
  `date` DATETIME NOT NULL,
  `organizer` INT NOT NULL,
  `type` VARCHAR(225) NOT NULL,
  `imageUrl` VARCHAR(550) NOT NULL,
  `details` VARCHAR(550) NOT NULL,
  `location` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_events_users1_idx` (`organizer` ASC) VISIBLE,
  CONSTRAINT `fk_events_users1`
    FOREIGN KEY (`organizer`)
    REFERENCES `EventsDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EventsDB`.`attendees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EventsDB`.`attendees` (
  `events_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`events_id`, `users_id`),
  INDEX `fk_events_has_users_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_events_has_users_events_idx` (`events_id` ASC) VISIBLE,
  CONSTRAINT `fk_events_has_users_events`
    FOREIGN KEY (`events_id`)
    REFERENCES `EventsDB`.`events` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_events_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `EventsDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



INSERT INTO users (name)
VALUES
     ('Jawhar')



INSERT INTO events (name, date, organizer, type, imageUrl, details, location) VALUES ('Harvest Fest presented by Sauce Magazine', '2023-05-10T05:30:00.000',1 , 'Festival', 'https://scontent.fnbe1-2.fna.fbcdn.net/v/t39.30808-6/363414870_852402696310700_1227325998220274914_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=934829&_nc_ohc=XtrkmZnzNIsAX975yhI&_nc_ht=scontent.fnbe1-2.fna&oh=00_AfBeNxuUhpdDGP6v4jNuNjhuJFY2NsRJOGqaDDWGo_NHfw&oe=651A7C99', 'Celebrate the bounty of the season at this FREE annual event with dozens of local restaurants, breweries, wineries, farmers and artisans! A live music schedule and participating vendors will be announced here soon. Dogs are allowed on leashes. To request participation as a vendor, please email ahyde@saucemagazine.com. This is the only way to request to be a vendor.', 'Tower Grove Park Sauce Harvest Fest');
    -- ('iPhone 13', 799.00, 'The iPhone 13 is the latest smartphone from Apple with a high-quality camera, long battery life, and a fast processor.', 'phones', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEeGm32C8hfCRf47-7RVjnvDlUoHjMGybWwA&usqp=CAU'),
    -- ('Samsung QLED TV', 1499.00, 'The Samsung QLED TV is a 4K TV with a stunning display, high-quality sound, and smart features.', 'electronics', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5l6VLwLJZDSSdZYIRtP70NdqtdiPxs_nvw&usqp=CAU'),
    -- ('Dell Inspiron', 899.00, 'The Dell Inspiron is a mid-range laptop with a solid build quality, decent performance, and good battery life.', 'computers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkwG2oYnBheM0RtY_iINSNJK5O8GicEKT1AQ&usqp=CAU'),
    -- ('Google Pixel 6', 699.00, 'The Google Pixel 6 is the latest smartphone from Google with a powerful camera, long battery life, and a beautiful design.', 'phones', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrfVK9_xK-hLyYbivEeLI1O5K9glRdJyRkqA&usqp=CAU'),
    -- ('Samsung Galaxy Book Pro', 1299.00, 'The Samsung Galaxy Book Pro is a high-end laptop with a thin and light design, long battery life, and fast performance.', 'computers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjSp4rcmnYfYeWhGY8UWxsRLf7nMs2pcofNA&usqp=CAU');



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

