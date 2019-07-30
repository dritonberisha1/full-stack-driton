DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `liked_user_id` int(11) DEFAULT NULL,
  `liked_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`liked_by_user_id`,`liked_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;

INSERT INTO `likes` (`id`, `liked_user_id`, `liked_by_user_id`)
VALUES
	(33,5,5),
	(25,9,5),
	(2,9,6),
	(3,9,7),
	(5,5,8),
	(4,9,8),
	(6,5,9),
	(7,6,9),
	(8,7,9);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;
# =======================================================

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueUsername` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(5,'dritonb','$2b$10$aKkx00YCd0zD.uxRnJ2Njeyn/U9r94PtrLpjKVz0AVAjT8AWQsSHa',NULL,'2019-07-29 18:39:50','2019-07-29 18:39:50'),
	(6,'JohnD',NULL,NULL,'2019-07-29 18:39:50','2019-07-29 18:39:50'),
	(7,'JaneD',NULL,NULL,'2019-07-29 18:39:50','2019-07-29 18:39:50'),
	(8,'FrankS',NULL,NULL,'2019-07-29 18:39:50','2019-07-29 18:39:50'),
	(9,'ImFullStack123',NULL,NULL,'2019-07-29 18:39:50','2019-07-29 18:39:50');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;