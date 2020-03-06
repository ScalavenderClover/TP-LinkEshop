# Host: localhost  (Version: 5.5.53)
# Date: 2020-03-06 21:23:38
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "login"
#

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

#
# Data for table "login"
#

/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'zhangyuncheng','123'),(2,'admin','123456'),(3,'test','123'),(4,'15838237847','cheng199844'),(5,'',''),(6,'571766533@qq.com','cheng199844'),(7,'571766533@qq.com','cheng199844'),(8,'1194687782@qq.com','cheng199844'),(9,'15939025761','123456');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
