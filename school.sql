-- MySQL dump 10.13  Distrib 8.0.32, for macos12.6 (arm64)
--
-- Host: localhost    Database: online_school
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `id` int NOT NULL,
  `number_class` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,11),(2,10),(3,9);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `id` int NOT NULL,
  `exam_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (1,' ЕГЭ'),(2,'ОГЭ');
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` int NOT NULL,
  `id_group` int NOT NULL,
  `id_student` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_groupss_idx` (`id_group`),
  KEY `fk_student_group_idx` (`id_student`),
  CONSTRAINT `fk_groupss` FOREIGN KEY (`id_group`) REFERENCES `group_number` (`id`),
  CONSTRAINT `fk_student_group` FOREIGN KEY (`id_student`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,1,1),(2,1,2),(3,2,3),(4,2,2);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_number`
--

DROP TABLE IF EXISTS `group_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_number` (
  `id` int NOT NULL,
  `number_group` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_number`
--

LOCK TABLES `group_number` WRITE;
/*!40000 ALTER TABLE `group_number` DISABLE KEYS */;
INSERT INTO `group_number` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `group_number` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_table`
--

DROP TABLE IF EXISTS `new_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_table`
--

LOCK TABLES `new_table` WRITE;
/*!40000 ALTER TABLE `new_table` DISABLE KEYS */;
INSERT INTO `new_table` VALUES (1,_binary '32264');
/*!40000 ALTER TABLE `new_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `surname` varchar(256) NOT NULL,
  `subject` varchar(256) NOT NULL,
  `number_phone` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES (1,'SDFS','SDF','DFS','SDFDSF'),(2,'Шляпникова Екатерина','Информатика','+79600421767','yekaterina.shlyapnikova@yandex.ru'),(3,'Шляпникова Екатерина','Информатика','+79600421767','yekaterina.shlyapnikova@yandex.ru'),(4,'+infoUser.sur+','+infoUser.subjects+','+infoUser.phone+','+infoUser.em+'),(5,'\"+infoUser.sur+\"','\"+infoUser.subjects+\"','\"+infoUser.phone+\"','\"+infoUser.em+\"'),(6,'Шляпникова Екатерина','Информатика','+79600421767','yekaterina.shlyapnikova@yandex.ru'),(7,'','Математика','',''),(8,'undefined','undefined','undefined','undefined'),(9,'undefined','undefined','undefined','undefined'),(10,'undefined','undefined','undefined','undefined'),(11,'undefined','undefined','undefined','undefined'),(12,'undefined','undefined','undefined','undefined'),(13,'undefined','undefined','undefined','undefined'),(14,'undefined','undefined','undefined','undefined'),(15,'undefined','undefined','undefined','undefined'),(16,'undefined','undefined','undefined','undefined'),(17,'undefined','undefined','undefined','undefined'),(18,'undefined','undefined','undefined','undefined'),(19,'undefined','undefined','undefined','undefined'),(20,'undefined','undefined','undefined','undefined'),(21,'undefined','undefined','undefined','undefined'),(22,'undefined','undefined','undefined','undefined'),(23,'undefined','undefined','undefined','undefined'),(24,'undefined','undefined','undefined','undefined'),(25,'undefined','undefined','undefined','undefined'),(26,'undefined','undefined','undefined','undefined'),(27,'undefined','undefined','undefined','undefined'),(28,'undefined','undefined','undefined','undefined'),(29,'undefined','undefined','undefined','undefined'),(30,'undefined','undefined','undefined','undefined'),(31,'undefined','undefined','undefined','undefined'),(32,'undefined','undefined','undefined','undefined'),(33,'undefined','undefined','undefined','undefined'),(34,'undefined','undefined','undefined','undefined'),(35,'undefined','undefined','undefined','undefined');
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL,
  `surname` varchar(45) NOT NULL,
  `id_class` int NOT NULL,
  `id_exam` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_idx` (`id_class`),
  KEY `fk_exam_idx` (`id_exam`),
  CONSTRAINT `fk_class` FOREIGN KEY (`id_class`) REFERENCES `class` (`id`),
  CONSTRAINT `fk_exammm` FOREIGN KEY (`id_exam`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Волков Михаил Иванович',1,1),(2,'Крылов Сергей Никитович',1,1),(3,'Жуков Иван Геннадьевич',1,1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_assignments`
--

DROP TABLE IF EXISTS `student_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_student` int NOT NULL,
  `id_lesson` int NOT NULL,
  `homework` varchar(512) DEFAULT NULL,
  `homework_name_file` varchar(256) DEFAULT NULL,
  `classwork` varchar(512) DEFAULT NULL,
  `classwork_name_file` varchar(256) DEFAULT NULL,
  `homework_text` varchar(512) DEFAULT NULL,
  `classwork_text` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stud_idx` (`id_student`),
  KEY `fk_lesson_idx` (`id_lesson`),
  CONSTRAINT `fk_lesson` FOREIGN KEY (`id_lesson`) REFERENCES `timetable` (`id`),
  CONSTRAINT `fk_stud` FOREIGN KEY (`id_student`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_assignments`
--

LOCK TABLES `student_assignments` WRITE;
/*!40000 ALTER TABLE `student_assignments` DISABLE KEYS */;
INSERT INTO `student_assignments` VALUES (1,1,21,NULL,NULL,NULL,NULL,NULL,NULL),(30,1,1,NULL,NULL,'','','/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files/30home.docx','/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files/30class.docx'),(55,1,1,NULL,NULL,'/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files/esse1.txt','esse1.txt',NULL,NULL),(56,1,2,NULL,NULL,NULL,NULL,'/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files/2home.docx','/Users/ekaterinaslapnikova/Documents/project_online_school/online_school/pages/files/2class.docx');
/*!40000 ALTER TABLE `student_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_course`
--

DROP TABLE IF EXISTS `student_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_course` (
  `id` int NOT NULL,
  `id_student` int NOT NULL,
  `id_group` int NOT NULL,
  `id_subject` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_idx` (`id_student`),
  KEY `fk_group_idx` (`id_group`),
  KEY `fk_subject_idx` (`id_subject`),
  CONSTRAINT `fk_group` FOREIGN KEY (`id_group`) REFERENCES `group_number` (`id`),
  CONSTRAINT `fk_student` FOREIGN KEY (`id_student`) REFERENCES `student` (`id`),
  CONSTRAINT `fk_subject` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_course`
--

LOCK TABLES `student_course` WRITE;
/*!40000 ALTER TABLE `student_course` DISABLE KEYS */;
INSERT INTO `student_course` VALUES (1,1,1,1),(2,1,2,2),(3,1,4,4),(4,2,2,2),(5,2,1,1),(6,3,2,2),(7,1,5,8);
/*!40000 ALTER TABLE `student_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` int NOT NULL,
  `subject` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'математика'),(2,'информатика'),(3,'английский'),(4,'история'),(5,'обществознание'),(6,'русский'),(7,'литература'),(8,'математика_доп');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` int NOT NULL,
  `surname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'Иванов Иван Иванович'),(2,'Сидоров Сергей Михайлович');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_group`
--

DROP TABLE IF EXISTS `teacher_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_group` (
  `id` int NOT NULL,
  `id_teacher` int NOT NULL,
  `id_subject` int NOT NULL,
  `id_group` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_teacher_idx` (`id_teacher`),
  KEY `fk_sub_idx` (`id_subject`),
  KEY `fk_gr_idx` (`id_group`),
  CONSTRAINT `fk_gr` FOREIGN KEY (`id_group`) REFERENCES `group_number` (`id`),
  CONSTRAINT `fk_sub` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`),
  CONSTRAINT `fk_teacher` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_group`
--

LOCK TABLES `teacher_group` WRITE;
/*!40000 ALTER TABLE `teacher_group` DISABLE KEYS */;
INSERT INTO `teacher_group` VALUES (1,1,1,1),(2,1,2,2),(3,1,8,5);
/*!40000 ALTER TABLE `teacher_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timetable`
--

DROP TABLE IF EXISTS `timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `id_group` int NOT NULL,
  `lesson_topic` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_groupfk_idx` (`id_group`),
  CONSTRAINT `fk_` FOREIGN KEY (`id_group`) REFERENCES `group_number` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timetable`
--

LOCK TABLES `timetable` WRITE;
/*!40000 ALTER TABLE `timetable` DISABLE KEYS */;
INSERT INTO `timetable` VALUES (1,'2023-03-01 16:00:00',1,'Решение первого задания егэ'),(2,'2023-03-03 16:00:00',1,'Разбор второго задания ЕГЭ'),(3,'2023-03-05 16:00:00',1,'Разбор третьего задания ЕГЭ'),(4,'2023-03-07 16:00:00',1,'Разбор четвертого задания ЕГЭ'),(5,'2023-03-10 16:00:00',1,'Разбор пятого задания ЕГЭ'),(6,'2023-02-24 17:30:00',2,'Основы языка программирования'),(7,'2023-02-27 17:30:00',2,'Переменные'),(10,'2023-02-24 17:30:00',2,'Основы языка программирования'),(12,'2023-03-18 16:00:00',1,'Алгебра'),(17,'2023-03-22 16:00:00',1,'sdfsdfdsfsd'),(21,'2023-03-23 16:00:00',1,'Решение пробника'),(22,'2023-03-27 17:30:00',5,'Уравнения'),(23,'2023-03-28 00:00:00',5,'Задачи с параметром'),(24,'2023-03-29 15:50:00',5,'Пробник'),(25,'2023-03-30 15:50:00',5,'Задачи на скорость');
/*!40000 ALTER TABLE `timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `id_dop` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_dop_teacher_idx` (`id_dop`),
  CONSTRAINT `fk_id_dop_student` FOREIGN KEY (`id_dop`) REFERENCES `student` (`id`),
  CONSTRAINT `fk_id_dop_teacher` FOREIGN KEY (`id_dop`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'loool','pop','преподаватель',1),(2,'helloworld','pip3','преподаватель',2),(3,'stud123','stud12','ученик',1),(4,'std','std','ученик',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-26 18:06:47
