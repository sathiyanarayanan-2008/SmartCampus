import { useTheme } from '../context/ThemeContext';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { darkMode } = useTheme();
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible);
  if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

  for (let i = start; i < end; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center mb-0">
        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            ‹
          </button>
        </li>
        {pages.map((p) => (
          <li key={p} className={`page-item ${p === currentPage ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(p)}
              style={p === currentPage ? {
                background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                border: 'none',
              } : {}}
            >
              {p + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
