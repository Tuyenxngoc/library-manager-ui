import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';

import RequireAuth from './utils/RequireAuth';
import { ROLES } from './common/roleConstants';

import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import AccessDenied from './pages/AccessDenied';
import NotFound from './pages/NotFound';
import News from './pages/News';
import About from './pages/About';
import HolidaySchedule from './pages/HolidaySchedule';
import Rules from './pages/Rules';
import Report from './pages/Report';
import Search from './pages/Search';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminForgotPassword from './pages/AdminForgotPassword';
import Author from './pages/Author';
import AuthorForm from './pages/AuthorForm';
import BookSet from './pages/BookSet';
import Category from './pages/Category';
import Publisher from './pages/Publisher';
import BookDefinition from './pages/BookDefinition';
import BookDefinitionForm from './pages/BookDefinitionForm';
import ClassificationSymbol from './pages/ClassificationSymbol';
import History from './pages/History';
import BookDetail from './pages/BookDetail';
import InwardBook from './pages/InwardBook';
import OutwardBook from './pages/OutwardBook';
import InwardBookForm from './pages/InwardBookForm';
import BookList from './pages/BookList';
import InventoryBook from './pages/InventoryBook';
import OutwardBookForm from './pages/OutwardBookForm';
import BookCollection from './pages/BookCollection';
import NewsArticles from './pages/NewsArticles';
import NewsArticlesForm from './pages/NewsArticlesForm';
import Dashboard from './pages/Dashboard';
import LibraryInfo from './pages/LibraryInfo';
import LibraryRules from './pages/LibraryRules';
import Holidays from './pages/Holidays';
import GeneralConfig from './pages/GeneralConfig';
import SlideConfig from './pages/SlideConfig';
import User from './pages/User';
import UserForm from './pages/UserForm';
import UserGroup from './pages/UserGroup';
import Reader from './pages/Reader';
import LibraryVisit from './pages/LibraryVisit';
import VisitorStatistics from './pages/VisitorStatistics';
import ReaderViolations from './pages/ReaderViolations';
import NewsArticleDetail from './pages/NewsArticleDetail';
import BorrowBook from './pages/BorrowBook';
import ReturnRenewBook from './pages/ReturnRenewBook';
import BorrowBookForm from './pages/BorrowBookForm';
import UserProfile from './pages/UserProfile';
import BorrowedItems from './pages/BorrowedItems';
import BorrowHistory from './pages/BorrowHistory';
import BorrowRequests from './pages/BorrowRequests';
import ReturnHistory from './pages/ReturnHistory';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />

                    <Route path="news" element={<News />} />
                    <Route path="about" element={<About />} />
                    <Route path="holiday-schedule" element={<HolidaySchedule />} />
                    <Route path="rules" element={<Rules />} />
                    <Route path="report" element={<Report />} />
                    <Route path="search" element={<Search />} />
                    <Route path="books" element={<BookCollection />} />
                    <Route path="books/:id" element={<BookDetail />} />
                    <Route path="news-articles/:id" element={<NewsArticleDetail />} />

                    {/* Đường dẫn yêu cầu đăng nhập */}
                    <Route element={<RequireAuth />}>
                        {/* Thông tin cá nhân */}
                        <Route path="profile" element={<UserProfile />} />

                        {/* Lịch sử mượn */}
                        <Route path="borrow-history" element={<BorrowHistory />} />

                        {/* Đã đăng ký mượn */}
                        <Route path="borrowed-items" element={<BorrowedItems />} />
                    </Route>
                </Route>

                <Route
                    element={
                        <RequireAuth
                            allowedRoles={[
                                ROLES.ManageAuthor,
                                ROLES.ManageNewsArticle,
                                ROLES.ManageUser,
                                ROLES.ManageClassificationSymbol,
                                ROLES.ManageCategory,
                                ROLES.ManageBookSet,
                                ROLES.ManageLog,
                                ROLES.ManageRole,
                                ROLES.ManageBook,
                                ROLES.ManageImportReceipt,
                                ROLES.ManageBookDefinition,
                                ROLES.ManageCategoryGroup,
                                ROLES.ManagePublisher,
                                ROLES.ManageSystemSettings,
                                ROLES.ManageBorrowReceipt,
                                ROLES.ManageReader,
                            ]}
                        />
                    }
                >
                    {/* Đường dẫn yêu cầu quyền quản trị */}
                    <Route path="admin/" element={<AdminLayout />}>
                        {/* Trang chủ */}
                        <Route index element={<Dashboard />} />
                        <Route path="home" element={<Dashboard />} />

                        {/* Yêu cầu mượn tài liệu */}
                        <Route path="borrow-requests" element={<BorrowRequests />} />

                        {/* Thiết lập hệ thống */}
                        <Route path="settings">
                            <Route path="library-info" element={<LibraryInfo />} />
                            <Route path="library-rules" element={<LibraryRules />} />
                            <Route path="holidays" element={<Holidays />} />
                            <Route path="general-config" element={<GeneralConfig />} />
                            <Route path="slide-config" element={<SlideConfig />} />
                        </Route>

                        {/* Quản lý người dùng */}
                        <Route path="users">
                            <Route index element={<User />} />
                            <Route path="new" element={<UserForm />} />
                            <Route path="edit/:id" element={<UserForm />} />
                        </Route>

                        {/* Quản lý bạn đọc */}
                        <Route path="readers">
                            <Route path="cards" element={<Reader />} />
                            <Route path="access">
                                <Route index element={<LibraryVisit />} />
                                <Route path="statistics" element={<VisitorStatistics />} />
                            </Route>
                            <Route path="violations" element={<ReaderViolations />} />
                        </Route>

                        {/* Quản lý nhóm người dùng */}
                        <Route path="user-groups">
                            <Route index element={<UserGroup />} />
                        </Route>

                        {/* Sách */}
                        <Route path="books">
                            <Route path="list" element={<BookList />} />

                            <Route path="inward">
                                <Route index element={<InwardBook />} />
                                <Route path="new" element={<InwardBookForm />} />
                                <Route path="edit/:id" element={<InwardBookForm />} />
                            </Route>

                            <Route path="inventory">
                                <Route index element={<InventoryBook />} />
                            </Route>

                            <Route path="outward">
                                <Route index element={<OutwardBook />} />
                                <Route path="new" element={<OutwardBookForm />} />
                                <Route path="edit/:id" element={<OutwardBookForm />} />
                            </Route>
                        </Route>

                        {/* Quản lý lưu thông */}
                        <Route path="circulation">
                            <Route path="borrow">
                                <Route index element={<BorrowBook />} />
                                <Route path="new" element={<BorrowBookForm />} />
                                <Route path="edit/:id" element={<BorrowBookForm />} />
                            </Route>

                            <Route path="return-renew" element={<ReturnRenewBook />} />
                            <Route path="return-history" element={<ReturnHistory />} />
                        </Route>

                        {/* Tác giả */}
                        <Route path="authors">
                            <Route index element={<Author />} />
                            <Route path="new" element={<AuthorForm />} />
                            <Route path="edit/:id" element={<AuthorForm />} />
                        </Route>

                        {/* Bộ sách */}
                        <Route path="collections">
                            <Route index element={<BookSet />} />
                        </Route>

                        {/* Danh mục */}
                        <Route path="categories">
                            <Route index element={<Category />} />
                        </Route>

                        {/* Nhà xuất bản */}
                        <Route path="publishers">
                            <Route index element={<Publisher />} />
                        </Route>

                        {/* Biên mục */}
                        <Route path="book-definitions">
                            <Route index element={<BookDefinition />} />
                            <Route path="new" element={<BookDefinitionForm mode="new" />} />
                            <Route path="edit/:id" element={<BookDefinitionForm mode="edit" />} />
                            <Route path="copy/:id" element={<BookDefinitionForm mode="copy" />} />
                        </Route>

                        {/* Kí hiệu phân loại */}
                        <Route path="classifications">
                            <Route index element={<ClassificationSymbol />} />
                        </Route>

                        {/* Tin tức */}
                        <Route path="news-articles">
                            <Route index element={<NewsArticles />} />
                            <Route path="new" element={<NewsArticlesForm />} />
                            <Route path="edit/:id" element={<NewsArticlesForm />} />
                        </Route>

                        {/* Lịch sử */}
                        <Route path="histories">
                            <Route index element={<History />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin/forgot-password" element={<AdminForgotPassword />} />

                <Route path="access-denied" element={<AccessDenied />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
