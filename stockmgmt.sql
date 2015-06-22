-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 22, 2015 at 11:17 AM
-- Server version: 5.5.24-log
-- PHP Version: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `stockmgmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_register`
--

CREATE TABLE IF NOT EXISTS `attendance_register` (
  `login_id` int(10) NOT NULL AUTO_INCREMENT,
  `emp_id` int(10) NOT NULL,
  `record_date` varchar(50) DEFAULT NULL,
  `login_date` varchar(50) DEFAULT NULL,
  `login_month` varchar(50) DEFAULT NULL,
  `login_year` varchar(50) DEFAULT NULL,
  `login_time` varchar(50) DEFAULT NULL,
  `logout_time` varchar(50) DEFAULT NULL,
  `login_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  KEY `emp_id` (`emp_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=216 ;

--
-- Dumping data for table `attendance_register`
--

INSERT INTO `attendance_register` (`login_id`, `emp_id`, `record_date`, `login_date`, `login_month`, `login_year`, `login_time`, `logout_time`, `login_status`) VALUES
(182, 1, '1434431998000', '16', '6', '2015', '1434432015194', '1434457237544', 'complete'),
(183, 3, '1434431998000', '16', '6', '2015', '1434432015194', '1434457237544', 'complete'),
(184, 8, '1434431998000', '16', '6', '2015', '1434432015194', '1434457237544', 'complete'),
(185, 9, '1434431998000', '16', '6', '2015', '1434432015194', '1434457237544', 'complete'),
(186, 10, '1434431998000', '16', '6', '2015', '1434432015194', '1434457237544', 'complete'),
(187, 11, '1434431998000', '16', '6', '2015', '1434432015194', '1434457237544', 'complete'),
(189, 1, '1434518472000', '17', '6', '2015', '1434516611899', '1434541811899', 'complete'),
(190, 3, '1434518472000', '17', '6', '2015', '1434518475287', '1434543687040', 'complete'),
(191, 8, '1434518472000', '17', '6', '2015', '1434518475287', '1434543687040', 'complete'),
(192, 9, '1434518472000', '17', '6', '2015', '1434518475287', '1434543687040', 'complete'),
(193, 10, '1434518472000', '17', '6', '2015', '1434518475287', '1434543687040', 'complete'),
(194, 11, '1434518472000', '17', '6', '2015', '1434518475287', '1434543687040', 'complete'),
(196, 1, '1434604912000', '18', '6', '2015', '1434604914583', '1434626529712', 'complete'),
(197, 3, '1434604912000', '18', '6', '2015', '1434604914583', '1434626529712', 'complete'),
(198, 8, '1434604912000', '18', '6', '2015', '1434604914583', '1434626529712', 'complete'),
(199, 9, '1434604912000', '18', '6', '2015', '1434604914583', '1434626529712', 'complete'),
(200, 10, '1434604912000', '18', '6', '2015', '1434604914583', '1434626529712', 'complete'),
(201, 11, '1434604912000', '18', '6', '2015', '1434604914583', '1434626529712', 'complete'),
(203, 1, '1434691344000', '19', '6', '2015', '1434691346359', '1434710737474', 'complete'),
(204, 3, '1434691344000', '19', '6', '2015', '1434691346359', NULL, 'loggedIn'),
(205, 8, '1434691344000', '19', '6', '2015', '1434691346359', NULL, 'loggedIn'),
(206, 9, '1434691344000', '19', '6', '2015', '1434691346359', NULL, 'loggedIn'),
(207, 10, '1434691344000', '19', '6', '2015', '1434691346359', NULL, 'loggedIn'),
(208, 11, '1434691344000', '19', '6', '2015', '1434691346359', NULL, 'loggedIn'),
(209, 1, '1434954490000', '22', '6', '2015', '1434954498690', NULL, 'loggedIn'),
(210, 3, '1434954490000', '22', '6', '2015', '1434954498690', NULL, 'loggedIn'),
(211, 8, '1434954490000', '22', '6', '2015', '1434954498690', NULL, 'loggedIn'),
(212, 9, '1434954490000', '22', '6', '2015', '1434954498690', NULL, 'loggedIn'),
(213, 10, '1434954490000', '22', '6', '2015', '1434954498690', NULL, 'loggedIn'),
(214, 11, '1434954490000', '22', '6', '2015', '1434954498690', NULL, 'loggedIn');

-- --------------------------------------------------------

--
-- Table structure for table `client_master`
--

CREATE TABLE IF NOT EXISTS `client_master` (
  `client_id` int(10) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(200) NOT NULL,
  `client_addr` varchar(1000) DEFAULT NULL,
  `client_city` varchar(100) DEFAULT NULL,
  `client_contact` varchar(20) NOT NULL,
  `client_alternate_contact` varchar(50) DEFAULT NULL,
  `pincode` int(10) DEFAULT NULL,
  `client_email` varchar(400) DEFAULT NULL,
  `client_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `client_master`
--

INSERT INTO `client_master` (`client_id`, `client_name`, `client_addr`, `client_city`, `client_contact`, `client_alternate_contact`, `pincode`, `client_email`, `client_status`) VALUES
(7, 'wasim123', 'Camp', 'Pune', '1010101010', '1212121212', 411001, 'wasim123@gmail.com', 'active'),
(8, 'Demo', 'Demo addr', 'Mumbai', '123456789', '0000000000', 400001, 'demo@gmail.com', 'deactive');

-- --------------------------------------------------------

--
-- Table structure for table `dealer_master`
--

CREATE TABLE IF NOT EXISTS `dealer_master` (
  `dealer_id` int(10) NOT NULL AUTO_INCREMENT,
  `dealer_name` varchar(500) NOT NULL,
  `dealer_addr` varchar(1000) DEFAULT NULL,
  `dealer_city` varchar(100) DEFAULT NULL,
  `dealer_contact` varchar(50) NOT NULL,
  `dealer_alternate_contact` varchar(50) DEFAULT NULL,
  `pincode` int(10) DEFAULT NULL,
  `dealer_email` varchar(500) DEFAULT NULL,
  `dealer_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`dealer_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `dealer_master`
--

INSERT INTO `dealer_master` (`dealer_id`, `dealer_name`, `dealer_addr`, `dealer_city`, `dealer_contact`, `dealer_alternate_contact`, `pincode`, `dealer_email`, `dealer_status`) VALUES
(1, 'Mohseen Mulla', 'Mumbai', 'Mumbai', '1234567890', '0987654321', 400001, 'mac@gmail.com', 'active'),
(2, 'Test Dealer', 'Test Addr', 'Test City', '1232123218', '5784736238', 411001, 'testdealer@gmail.com', 'deactive');

-- --------------------------------------------------------

--
-- Table structure for table `department_master`
--

CREATE TABLE IF NOT EXISTS `department_master` (
  `dept_id` int(5) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(50) NOT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `department_master`
--

INSERT INTO `department_master` (`dept_id`, `dept_name`) VALUES
(1, 'Cleaners'),
(2, 'Washers');

-- --------------------------------------------------------

--
-- Table structure for table `designation_master`
--

CREATE TABLE IF NOT EXISTS `designation_master` (
  `desig_id` int(5) NOT NULL AUTO_INCREMENT,
  `desig_name` varchar(100) NOT NULL,
  PRIMARY KEY (`desig_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `designation_master`
--

INSERT INTO `designation_master` (`desig_id`, `desig_name`) VALUES
(1, 'Jobs Maker'),
(2, 'Tester');

-- --------------------------------------------------------

--
-- Table structure for table `employee_master`
--

CREATE TABLE IF NOT EXISTS `employee_master` (
  `emp_id` int(10) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(500) NOT NULL,
  `emp_address` varchar(1000) NOT NULL,
  `emp_city` varchar(100) NOT NULL,
  `emp_pincode` int(10) NOT NULL,
  `emp_pcontact` int(15) NOT NULL,
  `emp_acontact` int(15) NOT NULL,
  `emp_email` varchar(500) DEFAULT NULL,
  `emp_dept` varchar(500) NOT NULL,
  `emp_desig` varchar(500) NOT NULL,
  `emp_type` varchar(100) NOT NULL,
  `emp_sal_per_day` varchar(10) NOT NULL,
  `emp_doj` varchar(20) NOT NULL,
  `emp_status` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `employee_master`
--

INSERT INTO `employee_master` (`emp_id`, `emp_name`, `emp_address`, `emp_city`, `emp_pincode`, `emp_pcontact`, `emp_acontact`, `emp_email`, `emp_dept`, `emp_desig`, `emp_type`, `emp_sal_per_day`, `emp_doj`, `emp_status`) VALUES
(1, 'Wasim', 'Camp', 'Kolhapur', 411001, 123456789, 123456789, 'tesT@gmail.com', 'Cleaners', 'Tester', 'Part Time', '1000', '01-01-2015', 'active'),
(3, 'Test 5', 'Pune', 'pune', 411001, 123456789, 123456789, 'test2@gmail.com', 'Cleaners', 'Tester', 'Full Time Regular', '56', '01-05-2015', 'active'),
(8, 'Test 1', 'Pune', 'Pune', 411001, 123456, 456789, 'test@gmail.com', 'Cleaners', 'Jobs Maker', 'Part Time', '100', '1433788200000', 'active'),
(9, 'Test 2', 'Mumbai', 'Mumbai', 410001, 123456789, 987654321, 'newtest@gmail.com', 'Cleaners', 'Tester', 'Part Time', '500', '1434306600000', 'active'),
(10, 'Test 3', 'asd', 'Agra', 420123, 101010101, 2147483647, 'test2@gmail.com', 'Washers', 'Jobs Maker', 'Part Time', '123', '1433183400000', 'active'),
(11, 'Test 4', 'Pune', 'Pune', 412012, 1234, 4321, 'test4@gmail.com', 'Cleaners', 'Jobs Maker', 'Full Time Regular', '500', '1434565800000', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `product_master`
--

CREATE TABLE IF NOT EXISTS `product_master` (
  `prod_id` int(10) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(500) NOT NULL,
  PRIMARY KEY (`prod_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `product_master`
--

INSERT INTO `product_master` (`prod_id`, `prod_name`) VALUES
(5, 'Demo Product'),
(6, 'Filters');

-- --------------------------------------------------------

--
-- Table structure for table `salary_master`
--

CREATE TABLE IF NOT EXISTS `salary_master` (
  `sal_id` int(10) NOT NULL AUTO_INCREMENT,
  `sal_month` varchar(20) DEFAULT NULL,
  `sal_year` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`sal_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `salary_master`
--

INSERT INTO `salary_master` (`sal_id`, `sal_month`, `sal_year`) VALUES
(5, '6', '2015');

-- --------------------------------------------------------

--
-- Table structure for table `salary_register`
--

CREATE TABLE IF NOT EXISTS `salary_register` (
  `salary_id` int(10) NOT NULL AUTO_INCREMENT,
  `sal_id` int(10) NOT NULL COMMENT 'Foreign Key',
  `emp_id` int(10) NOT NULL COMMENT 'Foreign Key',
  `salary_amount` varchar(50) NOT NULL,
  PRIMARY KEY (`salary_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `salary_register`
--

INSERT INTO `salary_register` (`salary_id`, `sal_id`, `emp_id`, `salary_amount`) VALUES
(21, 5, 1, '3000'),
(22, 5, 3, '140'),
(23, 5, 8, '250'),
(24, 5, 9, '1250'),
(25, 5, 10, '307.5'),
(26, 5, 11, '1250');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
