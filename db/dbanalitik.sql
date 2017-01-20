-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2017 at 11:37 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbanalitik`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `uname` varchar(30) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `uname`, `pass`, `foto`) VALUES
(8, 'root', '5f4dcc3b5aa765d61d8327deb882cf99', 'btpal.png');

-- --------------------------------------------------------

--
-- Table structure for table `disposisi`
--

CREATE TABLE `disposisi` (
  `id_dispo` int(11) NOT NULL,
  `tgl_dispo` date NOT NULL,
  `keterangan` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `officer`
--

CREATE TABLE `officer` (
  `id` int(11) NOT NULL,
  `official_id` text NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `officer`
--

INSERT INTO `officer` (`id`, `official_id`, `name`) VALUES
(1, '198809072014022001', 'Ajeng Triana'),
(3, '195406072009022001', 'Titin Rahayu'),
(6, '198806072009022020', 'Tya Agustiani');

-- --------------------------------------------------------

--
-- Table structure for table `parameter`
--

CREATE TABLE `parameter` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameter`
--

INSERT INTO `parameter` (`id`, `name`, `unit`, `price`) VALUES
(9, 'Amonia', 'mg/L', 25000),
(11, 'Disolved Oxygen (DO)', 'mg/L', 18000),
(13, 'Bacteri E Coli', 'mg/L', 50000),
(14, 'Klorida (Cl)', 'mg/L', 33000),
(15, 'Nitrat', 'mg/L', 33000),
(16, 'Nitrit', 'mg/L', 33000),
(17, 'Sulfat', 'mg/L', 33000),
(18, 'Kadmium (Cd)', 'mg/L', 26000),
(19, 'Besi (Fe)', 'mg/L', 53000),
(20, 'Tembaga (Cu)', 'mg/L', 53000),
(21, 'Timbal (Pb)', 'mg/L', 53000),
(22, 'Raksa (Hg)', 'mg/L', 52000),
(23, 'Klorin', 'mg/L', 33000),
(24, 'Contoh Parameter', 'mg/L', 230000);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id` int(11) NOT NULL,
  `kode_plg` varchar(20) NOT NULL,
  `nama` text NOT NULL,
  `alamat` text NOT NULL,
  `hp` text NOT NULL,
  `email` text NOT NULL,
  `ket` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id`, `kode_plg`, `nama`, `alamat`, `hp`, `email`, `ket`) VALUES
(113, '1/SMP/An/BTPAL/16', 'Rendi Handika', 'Jakarta', '46433', 'rendi@mail.com', 'Semangat Gan'),
(115, '2/SMP/An/BTPAL/16', 'PT Omforen Indonesia', 'adsa', '08216561131', 'roiy_uchiha@yahoo.com', 'asd'),
(116, '3/SMP/An/BTPAL/16', 'PT Indonesia Jaya', 'Jakarta', '08216561131', 'roiyi_uchiha@yahoo.com', 'Semangat Gan'),
(117, '4/SMP/An/BTPAL/16', 'Ibu Idah (PTFM)', 'Kawasan Puspiptek', '08216561131', 'rendikabolt@gmail.com', 'Pengujian Sampel Air Limbah di Puspiptek'),
(118, '5/SMP/An/BTPAL/16', 'Budiluhur', 'Jakarta', '1511651', 'rendikabolt@gmail.com', 'Uji Sampel');

-- --------------------------------------------------------

--
-- Table structure for table `pps`
--

CREATE TABLE `pps` (
  `id` int(11) NOT NULL,
  `id_person` int(11) NOT NULL,
  `received_dt` date NOT NULL,
  `analisis_dt` date NOT NULL,
  `sample_condition` text NOT NULL,
  `sample_type` text NOT NULL,
  `total_sample` int(11) NOT NULL,
  `total_price` int(11) DEFAULT NULL,
  `json` text,
  `state` int(1) NOT NULL DEFAULT '1',
  `officer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pps`
--

INSERT INTO `pps` (`id`, `id_person`, `received_dt`, `analisis_dt`, `sample_condition`, `sample_type`, `total_sample`, `total_price`, `json`, `state`, `officer_id`) VALUES
(1, 117, '2017-01-15', '2017-01-30', 'Jernih', 'Cair', 2, 738000, '[{"number":1,"sampleCode":"MK 1","parameters":[{"id":"14","name":"Klorida (Cl)","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"17","name":"Sulfat","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"15","name":"Nitrat","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"16","name":"Nitrit","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"18","name":"Kadmium (Cd)","unit":"mg/L","price":"26000","quantity":1,"priceRp":"Rp 26.000,00","total":26000,"totalRp":"Rp 26.000,00","result":"< 0,002","method":"SNI 06-6989-16-2009"},{"id":"19","name":"Besi (Fe)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 0,01","method":"SNI 06-6989-4-2009"},{"id":"20","name":"Tembaga (Cu)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 0,006","method":"SNI 06-6989-6-2009"},{"id":"21","name":"Timbal (Pb)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 0,01","method":"SNI 06-6989-8-2009"},{"id":"22","name":"Raksa (Hg)","unit":"mg/L","price":"52000","quantity":1,"priceRp":"Rp 52.000,00","total":52000,"totalRp":"Rp 52.000,00","result":"< 0,0001","method":"Std. Methods (Ed.21).3500-Hg"}]},{"number":2,"sampleCode":"MK 2","parameters":[{"id":"14","name":"Klorida (Cl)","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"23","name":"Klorin","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"15","name":"Nitrat","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"16","name":"Nitrit","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"},{"id":"18","name":"Kadmium (Cd)","unit":"mg/L","price":"26000","quantity":1,"priceRp":"Rp 26.000,00","total":26000,"totalRp":"Rp 26.000,00","result":"< 0,002","method":"SNI 06-6989-16-2009"},{"id":"19","name":"Besi (Fe)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 0,01","method":"SNI 06-6989-4-2009"},{"id":"20","name":"Tembaga (Cu)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 0,006","method":"SNI 06-6989-6-2009"},{"id":"21","name":"Timbal (Pb)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 0,01","method":"SNI 06-6989-8-2009"},{"id":"22","name":"Raksa (Hg)","unit":"mg/L","price":"52000","quantity":1,"priceRp":"Rp 52.000,00","total":52000,"totalRp":"Rp 52.000,00","result":"< 0,0001","method":"Std. Methods (Ed.21).3500-Hg"}]}]', 4, 1),
(2, 118, '2017-01-16', '2017-01-26', 'Jernih', 'Cair', 2, 164000, '[{"number":1,"sampleCode":"A","parameters":[{"id":"14","name":"Klorida (Cl)","unit":"mg/L","price":"33000","quantity":1,"priceRp":"Rp 33.000,00","total":33000,"totalRp":"Rp 33.000,00","result":"< 0,1","method":"SNI 06-6989-6-2009"},{"id":"19","name":"Besi (Fe)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 4","method":"SNI 06-6989-7-2009"}]},{"number":2,"sampleCode":"B","parameters":[{"id":"9","name":"Amonia","unit":"mg/L","price":"25000","quantity":1,"priceRp":"Rp 25.000,00","total":25000,"totalRp":"Rp 25.000,00","result":"< 0,1","method":"SNI 06-6989-16-2009"},{"id":"19","name":"Besi (Fe)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00","result":"< 0,1","method":"Std. Methods (Ed.21).4110"}]}]', 4, 6),
(3, 116, '2017-01-16', '2017-01-19', 'Keruh', 'Cair', 1, 53000, '[{"number":1,"sampleCode":"XX","parameters":[{"id":"19","name":"Besi (Fe)","unit":"mg/L","price":"53000","quantity":1,"priceRp":"Rp 53.000,00","total":53000,"totalRp":"Rp 53.000,00"}]}]', 2, NULL),
(4, 113, '2017-01-16', '2017-01-26', 'Jernih', 'Padat', 1, 26000, '[{"number":1,"sampleCode":"YY","parameters":[{"id":"18","name":"Kadmium (Cd)","unit":"mg/L","price":"26000","quantity":1,"priceRp":"Rp 26.000,00","total":26000,"totalRp":"Rp 26.000,00"}]}]', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `test_methods`
--

CREATE TABLE `test_methods` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test_methods`
--

INSERT INTO `test_methods` (`id`, `name`) VALUES
(1, 'SNI 06-6989-6-2009'),
(2, 'SNI 06-6989-8-2009'),
(3, 'SNI 06-6989-4-2009'),
(4, 'SNI 06-6989-7-2009'),
(5, 'SNI 06-6989-16-2009'),
(6, 'Std. Methods (Ed.21).4110'),
(7, 'Std. Methods (Ed.21).3500-Hg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disposisi`
--
ALTER TABLE `disposisi`
  ADD PRIMARY KEY (`id_dispo`);

--
-- Indexes for table `officer`
--
ALTER TABLE `officer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parameter`
--
ALTER TABLE `parameter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pps`
--
ALTER TABLE `pps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_person` (`id_person`);

--
-- Indexes for table `test_methods`
--
ALTER TABLE `test_methods`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `disposisi`
--
ALTER TABLE `disposisi`
  MODIFY `id_dispo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `officer`
--
ALTER TABLE `officer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `parameter`
--
ALTER TABLE `parameter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;
--
-- AUTO_INCREMENT for table `pps`
--
ALTER TABLE `pps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `test_methods`
--
ALTER TABLE `test_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `pps`
--
ALTER TABLE `pps`
  ADD CONSTRAINT `pps_ibfk_1` FOREIGN KEY (`id_person`) REFERENCES `pelanggan` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
