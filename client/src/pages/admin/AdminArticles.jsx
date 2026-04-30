import { useCallback, useEffect, useState } from "react";
import ArticleForm from "@/features/admin/articles/components/ArticleForm";
import ArticleList from "@/features/admin/articles/components/ArticleList";
import api from "@/services/api";

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const applyArticlesResponse = useCallback((res) => {
    setArticles(res.data.articles);
    setError("");
  }, []);

  const loadArticles = useCallback(async ({ showLoading = true } = {}) => {
    if (showLoading) setLoading(true);
    try {
      const res = await api.get("/admin/articles");
      applyArticlesResponse(res);
    } catch {
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  }, [applyArticlesResponse]);

  useEffect(() => {
    let active = true;

    api
      .get("/admin/articles")
      .then((res) => {
        if (active) applyArticlesResponse(res);
      })
      .catch(() => {
        if (active) setError("Failed to load articles.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [applyArticlesResponse]);

  const handleCreate = () => {
    setEditing(null);
    setView("create");
  };

  const handleEdit = async (id) => {
    setLoadingArticle(id);
    setError("");
    try {
      const res = await api.get(`/admin/articles/${id}`);
      setEditing(res.data.article);
      setView("edit");
    } catch {
      setError("Failed to load article for editing.");
    } finally {
      setLoadingArticle(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article? This cannot be undone.")) return;

    setDeleting(id);
    try {
      await api.delete(`/admin/articles/${id}`);
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch {
      setError("Failed to delete article.");
    } finally {
      setDeleting(null);
    }
  };

  const returnToList = () => {
    setView("list");
    setEditing(null);
  };

  const handleSave = () => {
    returnToList();
    loadArticles();
  };

  if (view === "create" || view === "edit") {
    return (
      <ArticleForm
        article={view === "edit" ? editing : null}
        onSave={handleSave}
        onCancel={returnToList}
      />
    );
  }

  return (
    <ArticleList
      articles={articles}
      deleting={deleting}
      error={error}
      loading={loading}
      loadingArticle={loadingArticle}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onRetry={loadArticles}
    />
  );
}
