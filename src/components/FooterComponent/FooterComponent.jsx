import React from 'react';
import "./FooterComponent.css"
const FooterComponent = () => {
    return (
        <div>
            <div className="mt-4">
                <footer className="footer bg-dark text-white pt-4">
                    <div className="container footer-content">
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <h5>Thông tin liên hệ</h5>
                                <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
                                <p>Email: <a className="text-white" href="mailto:contact@example.com">contact@example.com</a></p>
                                <p>Điện thoại: <a className="text-white" href="tel:+84901234567">+84 901 234 567</a></p>
                            </div>
                            <div className="col-md-4 mb-4">
                                <h5>Mạng xã hội</h5>
                                <div className="social-icons">
                                    <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href="https://m.me/yourpage" target="_blank" rel="noreferrer" aria-label="Messenger">
                                        <i className="fa-brands fa-facebook-messenger"></i>
                                    </a>
                                    <a href="https://zalo.me/yourphone" target="_blank" rel="noreferrer" aria-label="Zalo">
                                        <i className="fa-solid fa-comment"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <h5>Bản đồ</h5>
                                <div className="map-responsive">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1234567890123!2d106.1234567!3d10.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f123456789a%3A0x123456789abcdef0!2zMTIzIMSQxrDhu51uZyBBQkMsIFF14bqtbiAxLCBUUC4gSMOgbmggxJDhu41jIEjDoCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1691676312345!5m2!1svi!2s"
                                        width="100%"
                                        height="200"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Bản đồ"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <hr className="border-secondary" />
                        <div className="text-center pt-3">&copy; 2025 Công ty của bạn. Bản quyền được bảo lưu.</div>
                    </div>
                </footer>
            </div>

        </div>
    );
};

export default FooterComponent;