"use client";
import Link from "next/link";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import NotifySubscriber from "@/lib/notify-subscribers";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="text-indigo-500" size={28} />
              <h3 className="text-xl font-bold text-white">JobPortal</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nền tảng tuyển dụng hàng đầu giúp kết nối ứng viên tài năng với
              các công ty uy tín tại Việt Nam.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-indigo-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-indigo-500 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-indigo-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-indigo-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="hover:text-indigo-500 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Tìm việc làm
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/post"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Đăng tin tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tài nguyên</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/blog"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/career-tips"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Mẹo nghề nghiệp
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                <span className="text-sm">
                  123 Nguyễn Huệ, Quận 1
                  <br />
                  TP. Hồ Chí Minh, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-500 shrink-0" />
                <a
                  href="tel:+84123456789"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  (+84) 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-500 shrink-0" />
                <a
                  href="mailto:contact@jobportal.vn"
                  className="text-sm hover:text-indigo-500 transition-colors"
                >
                  contact@jobportal.vn
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">
                Nhận thông báo việc làm mới
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500 text-white placeholder:text-gray-500"
                />
                <Button
                  type="submit"
                  className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
                >
                  Đăng ký
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} JobPortal. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
