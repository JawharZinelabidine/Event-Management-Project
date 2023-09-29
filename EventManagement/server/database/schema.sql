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
CREATE TABLE IF NOT EXISTS `eventsdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(225) NOT NULL,
  `email` VARCHAR(225) NOT NULL,
  `password` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

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
  `details` VARCHAR(1000) NOT NULL,
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



INSERT INTO users (name, password, email)
VALUES
     ('John','johnnyjohn', 'john@john.com'),('Ron','ronnyron','ron@ron.com'),('Marwan','narwam', 'marwan@marwan.com');



INSERT INTO events (name, date, organizer, type, imageUrl, details, location) VALUES ('Harvest Fest presented by Sauce Magazine', '2023-12-10T17:30:00.000',1 , 'Festival', 'https://scontent.fnbe1-2.fna.fbcdn.net/v/t39.30808-6/363414870_852402696310700_1227325998220274914_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=934829&_nc_ohc=XtrkmZnzNIsAX975yhI&_nc_ht=scontent.fnbe1-2.fna&oh=00_AfBeNxuUhpdDGP6v4jNuNjhuJFY2NsRJOGqaDDWGo_NHfw&oe=651A7C99', 'Celebrate the bounty of the season at this FREE annual event with dozens of local restaurants, breweries, wineries, farmers and artisans! A live music schedule and participating vendors will be announced here soon. Dogs are allowed on leashes. To request participation as a vendor, please email ahyde@saucemagazine.com. This is the only way to request to be a vendor.', 'Tower Grove Park Sauce Harvest Fest'), ('How to write successful proposals for Horizon Europe', '2023-10-13T13:00:00.000', 1 , 'Tutoring', 'https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/382804764_622323790095403_7814424003840718043_n.jpg?stp=dst-jpg_p960x960&_nc_cat=103&ccb=1-7&_nc_sid=934829&_nc_ohc=iIyOMl_ov_4AX8Z9N2h&_nc_ht=scontent.ftun4-2.fna&oh=00_AfChpFNNU72IvvTJFSpCgUBRhoXDjwxofvea6k-J2kD5kQ&oe=651B8BFB', 'EURAXESS Africa, in collaboration with Youthmakers Hub, is organizing an online workshop: "How to write successful proposals for Horizon Europe". This workshop is designed to provide African participants and organizations with valuable #information and #advice on preparing #competitive project proposals for the #HorizonEU program', 'Online'),
('Concerts & Musical Performances | Dream City 2023', '2023-10-6T21:30:00.000', 2 , 'Music festival', 'https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/376243898_616260884035870_2243892354616470292_n.jpg?stp=dst-jpg_p960x960&_nc_cat=109&ccb=1-7&_nc_sid=934829&_nc_ohc=CdrRc4YsE3wAX-g53jq&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBLDy0CVHc_dJ7N0OLOFfQhzsgZlD0FNXxjNKddMiQhKg&oe=651A510F', 'Get ready for the musical journey of a lifetime at Dream City Festival"s 9th edition! From September 21st to October 8th, the heart of Tunis will come alive with enchanting performances that will leave you spellbound. Join us for the exceptional pre-opening where you can groove to the captivating rhythms of a free Rboukh concert at the enchanting Place de la Hafsia on September 21st.', 'Tunis Downtown'), 
('Country Christmas Train','2023-11-23T22:30:00.000', 3, 'Carnival', 'https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/373558106_676274374536121_4634319490124010654_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=934829&_nc_ohc=F_ZP84wzfN0AX_WGK2I&_nc_ht=scontent.ftun4-2.fna&oh=00_AfDOb3HJoB4apmZCT6SjaIksiAKUdFClQsHB-uwedDI3xQ&oe=651BBC35', 'Ride the Handy Dandy Railroad to see the lights and Nativity movie. Visit the church and sing carols, craft vendors, petting zoo, carriage rides and so much more!', 'Denton FarmPark, NC'),
('Latin Night at The Grand', '2023-10-14T20:00:00.000', 2, 'Dance','https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/354209657_758653472927162_7208039804274448328_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=934829&_nc_ohc=TtBNtfxSuUIAX9wLGym&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBDMIGbMf0gzzqrGW-Sz4YgsinBwxPUP0aL7kx4r7SyNw&oe=651BA594' ,'6-12 Full menu service! Food and drinks available for purchase! Beginner and Intermediate Salsa lessons at 8:00 PM. Beginner and Intermediate Bachata Lesson at 8:30 PM. No experience or partner required to join! Reservations for those who want to eat.', 'Social Dance Studio of Grand Rapids'),
('2023 Country Fest - Frankenmuth', '2023-10-29T22:00:00.000', 1 , 'Party', 'https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/344754591_1280635646206606_2378648069243337762_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=934829&_nc_ohc=5IjBLLo8UKMAX_HtWq5&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBp8_DEGkBef_ed8G9GRILIEDsut7vlLyDffuevQqPJMw&oe=651B7DD2', 'Grab your plaid shirt and slip on those cowboy boots! It"s time for the annual MI"s Big Country Fest in Frankenmuth, Sept 29-30 from 5pm to midnight. We"ll have 4 of the area"s best bands in the coolest atmosphere around. Waylon Hanel Music and Rebel Line will play Friday, and you"ll see Mandi Layne & The Lost Highway and Shiatown on Saturday! Enjoy a bar with craft beer flights, bloody marys, seltzers, cider, mixers and more, food trucks, vendors, free line-dancing lessons, cornhole, door prizes, photo booth, souvenirs and more exciting attractions to be announced! Don"t worry about the weather, it"s indoor! All ages are welcome, 10 & under free with an adult. Admission is $9. Check out the full schedule at www.bigcountryfest.com', 'Heritage Park');



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

