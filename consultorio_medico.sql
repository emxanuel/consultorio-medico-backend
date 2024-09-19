CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `marital_status` enum('single','married','divorced','widowed','minor') NOT NULL,
  `birth_date` varchar(150) NOT NULL,
  `birth_place` varchar(150) NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `document_id` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `residential_phone` varchar(20) DEFAULT NULL,
  `cellphone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `visit_date` varchar(50) DEFAULT NULL,
  `reason` varchar(255) NOT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) 

CREATE TABLE `insurance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int DEFAULT NULL,
  `has_assurance` tinyint(1) NOT NULL,
  `ars_name` varchar(100) DEFAULT NULL,
  `ars_cardholder` varchar(100) DEFAULT NULL,
  `ars_primary_insured` varchar(100) DEFAULT NULL,
  `ars_plan` varchar(100) DEFAULT NULL,
  `ars_contract_number` varchar(50) DEFAULT NULL,
  `ars_primary_insured_relationship` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `insurance_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) 

CREATE TABLE `emergency_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `residential_phone` varchar(20) DEFAULT NULL,
  `cellphone` varchar(20) NOT NULL,
  `relationship` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `emergency_contact_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE
) 

