interface PaginationProps {
    page: number;
    total: number;
    onChange: (page: number) => void;
}

export const Pagination = ({ page, total, onChange }: PaginationProps) => {
    const totalPages = Math.max(1, Math.ceil(total / 10));
    if (total === 0) return null;
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => start + index);
    const changePage = (next: number) => {
        onChange(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <nav className="mt-4" aria-label="Páginas de publicaciones">
            <p className="small post-muted text-center" role="status">
                Mostrando {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} de {total} publicaciones
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-2">
                <button type="button" className="btn post-secondary" disabled={page === 1} onClick={() => changePage(1)} aria-label="Primera página">«</button>
                <button type="button" className="btn post-secondary" disabled={page === 1} onClick={() => changePage(page - 1)}>Anterior</button>
                {pages.map(number => (
                    <button type="button" key={number} className={number === page ? "btn interact-button" : "btn post-secondary"}
                        aria-current={number === page ? "page" : undefined} aria-label={"Página " + number} onClick={() => changePage(number)}>{number}</button>
                ))}
                <button type="button" className="btn post-secondary" disabled={page === totalPages} onClick={() => changePage(page + 1)}>Siguiente</button>
                <button type="button" className="btn post-secondary" disabled={page === totalPages} onClick={() => changePage(totalPages)} aria-label="Última página">»</button>
            </div>
        </nav>
    );
};
