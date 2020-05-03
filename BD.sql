CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `passwd` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `img` varchar(50) COLLATE utf8_spanish2_ci,
  `rol` int(2) NOT NULL,
  `status` int(2) NOT NULL,
  `created_at` date,
  `updated_at` date,
  CONSTRAINT UC_user UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

  INSERT INTO `user` (`id`,`firstname`,`lastname`,`email`,`passwd`,`img`,`rol`,`status`,`created_at`,`updated_at`) VALUES
(1, 'admin1','admin1', 'admin1@gmail.com', '1234',null, 1,0,now(),now());
