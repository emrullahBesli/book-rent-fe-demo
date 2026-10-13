import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout/Layout.jsx'
import { LoginPage } from '../features/auth/LoginPage.jsx'
import { ProtectedRoute } from '../features/auth/ProtectedRoute.jsx'
import { BooksPage } from '../features/books/BooksPage.jsx'
import { BookDetailPage } from '../features/books/BookDetailPage.jsx'
import { BookFormPage } from '../features/books/BookFormPage.jsx'
import { HomePage } from '../features/home/HomePage.jsx'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/new" element={<BookFormPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/books/:id/edit" element={<BookFormPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
