use xee;
INSERT INTO `xe`.`role` (`name`) VALUES ('admin');
INSERT INTO `xe`.`role` (`name`) VALUES ('employee');
INSERT INTO `xe`.`account` (`account_name`, `address`, `birthday`, `email`, `full_name`, `password`, `phone`, `role_id`) VALUES ('tuanne', '68 Do Dang Tuyen', '2005-07-31', 'tn989993@gmail.com', 'Nguyen Minh Tuan', 'tuan123', '0345323724', '1');
INSERT INTO `xe`.`status_booking` (`name`) VALUES ('Đang trong giỏ hàng');
INSERT INTO `xe`.`status_booking` (`name`) VALUES ('Đã mua');
INSERT INTO `xe`.`status_booking` (`name`) VALUES ('Đợi thanh toán');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Phuoc');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Mam');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Dia');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Heo');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Banh');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Đĩa KingSpeed 260mm vừa cho ra mắt mẫu mới cho thương hiệu mới đang hot trên thị trường với thiết kế rất đẹp, độc tuy nhiên giá thành lại khá hợp lí. Thiết kế mẫu mới dạng bông rất đẹp', 'https://shop2banh.vn/images/thumbs/2022/07/dia-kingspeed-260mm-mau-moi-4-lo-1860-slide-products-62ce6ecee5bbf.jpg', 'Đĩa KingSpeed 260mm mẫu mới 4 lỗ', '55000', '10', '3');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('- Phuộc Profender X Series cho SHVN là dòng phuộc có bình dầu phụ, tặng kèm 2loxo phụ, 2 nút tăng chỉnh rebound và độ nhún, chân phuộc 16 nấc hiển thị số rõ ràng , dễ tăng chỉnh có thể giúp bạn tùy chỉnh khi đi phố, khi chở nặng...', 'https://shop2banh.vn/images/thumbs/2024/01/phuoc-profender-x-series-cho-shvn-2233-slide-products-65a4b37883a12.jpg', 'Phuộc Profender X Series cho SHVN', '8450000', '5', '1');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Vỏ CEAT Gripp Max 90/90-14 xuất xứ từ Ấn Độ và được sản xuất tại Thái Lan.', 'https://shop2banh.vn/images/thumbs/2024/02/vo-ceat-gripp-max-9090-14-2225-slide-products-65bc953b3d578.jpg', 'Vỏ CEAT Gripp Max 90/90-14', '522000', '7', '5');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('- Phuộc trước LCM ty bạc cho Vario 160, Click 160 mang thiết kế với ngoại hình to lớn đầy cứng cáp, khắc phục tiếng kêu cụp cụp từ phuộc trước các dòng xe Vario 160, phuộc LCM nhìn bề ngoài tuy rất to chắc nhưng khi vận hành thì độ nhún rất êm, không sàn lắc.', 'https://shop2banh.vn/images/thumbs/2024/02/phuoc-truoc-lcm-ty-bac-cho-vario-160-click-160-2269-slide-products-65dc3d1066869.JPG', 'Phuộc trước LCM ty bạc cho Vario 160, Click 160', '1780000', '50', '1');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Mâm RCB 8 cây chính hãng cho Vario, Click, hàng khá hot trên thị trường, thiết kế 8 cây mảnh rất phù hợp với dáng xe nhỏ gọn như Vario, Click. Hàng RCB chất lượng tốt đã được nhiều biker tin dùng.', 'https://shop2banh.vn/images/thumbs/2020/05/mam-rcb-8-cay-chinh-hang-cho-vario-click-1214-slide-products-5eb524c2009ca.jpg', 'Mâm RCB 8 cây cho Vario, Click chính hãng', '2800000', '5', '2');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Đây là dòng phuộc có bình dầu phụ, 2 tăng chỉnh trên và dưới , lắp được cho hầu hết các dòng :Vario / Click 125-150 .Dòng phuộc này có thể tùy chỉnh 16 chế độ khác nhau, có thể giúp bạn tùy chỉnh khi đi phố, khi chở nặng. Đây là sản phẩm giúp bạn cải thiện đáng kể khả năng vận hành của xe với chi phí không quá cao, rất đáng để đầu tư Có 2 màu cơ bản: Đen - Đỏ , chiều cao : 330mm. BẢO HÀNH SẢN PHẨM 3 NĂM LỖI XÌ DẦU HOẶC TỪ NHÀ SẢN XUẤT', 'https://profender.com.vn/upload/images/z4638381481132_4badbd94fc2b4adbcc83b673a0ee6c22.jpg', 'Phuộc Profender X Vario / Click 125 - 150 Bình Dầu ( Màu Đỏ )', '4500000', '10', '1');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Phu Kien');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Gù Carbon fiber chống rung, đầm tay lái cho AB 160, Vario 160', 'https://shop2banh.vn/images/thumbs/2023/06/gu-carbon-fiber-chong-rung-dam-tay-lai-cho-ab-160-vario-160-2039-slide-products-647e9a2de45a4.jpg', 'Gù Carbon fiber chống rung, đầm tay lái cho AB 160, Vario 160', '350000', '7', '6');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Kính chiếu hậu RCB MR002 chính hãng', 'https://shop2banh.vn/images/thumbs/2022/12/kinh-chieu-hau-rcb-mr002-chinh-hang-816-slide-products-63a283f2960bb.jpg', 'Kính chiếu hậu RCB MR002 chính hãng', '500000', '10', '6');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Kính gù CRG hàng loại 1, làm bằng nhôm sắc nét, không phải dạng nhựa cứng giá rẻ trên thị trường, có kiểu dáng khá độc đáo, lên xe nhìn gọn nhưng vẫn có thể quan sát rất rõ tình hình phía sau.', 'https://shop2banh.vn/images/thumbs/2016/07/kinh-gu-crg-428-slide-products-5784b6db4afbc.JPG', 'Kính gù CRG', '500000', '10', '6');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `is_deleted`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Xi nhan nút áo độ thời trang cho xe máy, đặc biệt là lên Exciter 150 rất gọn gàng, cá tính và đẹp mắt.', 'https://shop2banh.vn/images/thumbs/2015/08/xinhan-nut-ao-252-slide-products-55dd622b2b121.JPG', '0', 'Xinhan nút áo', '70000', '10', '6');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Kính gù Motogadget tròn, hàng chuẩn 1:1 mẫu mới nhất, được thiết kế tinh tế, nguyên khối sắc cạnh từng chi tiết, cùng với đó là độ bền, cứng cáp, an toàn khi xe vận hành dài lâu. Kính gù Motogadget tròn lên xe nhìn rất gọn, thích hợp cho xe đi gọn nhẹ hơn là gắn kính kiểu truyền thống.', 'https://shop2banh.vn/images/thumbs/2021/02/kinh-gu-motogadget-tron-1475-slide-products-603867151a05d.jpg', 'Kính gù Motogadget tròn', '800000', '10', '6');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Kim phun xăng xe máy đây là bộ phận máy móc đảm trách việc cung ứng nhiên liệu vận hành dành cho xe, chi tiết là bơm nguồn nhiên liệu tác động trực tiếp cho các xi-lanh của thiết bị và động cơ. Điều ấy ảnh hưởng trực tiếp đến công suất tăng tốc độ của phương tiện.', 'https://product.hstatic.net/200000298594/product/beo_8_lo-1_7eb45f73a26c4587bee72a4502167a4f_grande.jpg', 'Kim Phun Zin Nhỏ 8 Lỗ Cho Honda 150 Thương Hiệu BEO (Cái)', '300000', '5', '6');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Cuộn Điện (Mâm Lửa) Xe Máy Honda / Yamaha Bảo Hành 1 Đổi 1 Trong 30 Ngày', 'https://product.hstatic.net/200000298594/product/ab_2010-2_7301162aca8d4187a5b2a23fb645dc80_grande.jpg', 'Cuộn Điện (Mâm Lửa) Xe Máy Honda / Yamaha Bảo Hành 1 Đổi 1 Trong 30 Ngày', '175000', '5', '6');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Lọc Xăng Xe Máy BEO - Lưới Lọc Xăng Các Hãng Honda / Yamaha / Suzuki / SYM', 'https://product.hstatic.net/200000298594/product/232_8ef6461035144c30b87bef48e17a2a47_grande.jpg', 'Phụ tùng Lọc Xăng Xe Máy BEO - Lưới Lọc Xăng Các Hãng Honda / Yamaha / Suzuki / SYM', '15000', '5', '6');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Phu gia');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Phu kien');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Dung cu sua chua');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Binh xang con');
INSERT INTO `xe`.`type_accessory` (`name`) VALUES ('Thiet bi');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/phu_tung_9018ecfa8678422badcd7e11f134720c_icon.png' WHERE (`id` = '1');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/bxc_cc30820d9a8143fabe8ac5b1a71b3f84_icon.png' WHERE (`id` = '6');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/dung_cu_06cae33c273247b4b3e80fc448487995_icon.png' WHERE (`id` = '8');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/phu_gia_f07fd397766941a79c3c0309ec0baf66_icon.png' WHERE (`id` = '9');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/cap_giac_4b15ff58864d489195af3d561f9ed551_icon.png' WHERE (`id` = '10');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000713019/file/phone_d1c9c71a288d46adaa57da8bee5320f1_icon.png' WHERE (`id` = '11');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/thiet_bi_ffa65a98841549e7940961a9d5e12a3b_icon.png' WHERE (`id` = '7');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/bxc_cc30820d9a8143fabe8ac5b1a71b3f84_icon.png' WHERE (`id` = '5');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/bxc_cc30820d9a8143fabe8ac5b1a71b3f84_icon.png' WHERE (`id` = '4');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/bxc_cc30820d9a8143fabe8ac5b1a71b3f84_icon.png' WHERE (`id` = '2');
UPDATE `xe`.`type_accessory` SET `img` = 'https://file.hstatic.net/200000298594/file/bxc_cc30820d9a8143fabe8ac5b1a71b3f84_icon.png' WHERE (`id` = '3');
INSERT INTO `xe`.`account` (`account_name`, `address`, `birthday`, `email`, `full_name`, `password`, `phone`, `role_id`) VALUES ('anhtuan', 'Da Nang', '2004-03-21', 'anhtuan@gmail.com', 'Tran Anh Tuan', 'tuanngu', '0876543332', '2');
INSERT INTO `xe`.`motobike_accessory` (`description`, `img`, `name`, `price`, `quantity`, `type_accessory_id`) VALUES ('Thiết bị MST 100 Pro được phát triển bởi tập đoàn Shenzhen Zeus Information Technology - China, chuyên nghiên cứu và sản xuất các sản phẩm công nghệ cao phục vụ cho lĩnh vực sửa chữa xe ô tô, xe gắn máy tại thị trường châu Á', 'https://product.hstatic.net/200000298594/product/mst-100pro_new_27f4702ec2934811bd8a4d88cc1d77bc_grande.jpg', 'Máy Đọc Lỗi Xe Máy MST100 Pro Phiên Bản V13.00 - 2024', '12000000', '7', '11');
UPDATE `xe`.`role` SET `name` = 'ADMIN' WHERE (`id` = '1');
UPDATE `xe`.`role` SET `name` = 'USER' WHERE (`id` = '2');