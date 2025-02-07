"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetPaginatedTodosAction } from "@/features/todos/GetPaginatedTodos.action";
import HomeCardComponent from "@/components/HomeCardComponent";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

export default function Home() {
  const [todos, setTodos] = useState<{ slug: string; title: string; description?: string; image?: string }[]>([]); // Stocke les tâches
  const [lastTodoSlug, setLastTodoSlug] = useState<string | null>(null); // Gestion de la pagination
  const [hasMore, setHasMore] = useState(true); // Permet de savoir s'il y a encore des données à charger
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial des todos
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["todos", lastTodoSlug], // Clé pour la mise en cache
    queryFn: async () => {
      return GetPaginatedTodosAction({
        lastTodoSlug: lastTodoSlug || undefined,
        take: 9,
      });
    },
  });

  // Effet pour gérer les nouvelles données reçues
  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setHasMore(false); // Plus de données à charger
      } else {
        setTodos((prev) => [...prev, ...data]); // Concatène les nouveaux résultats
        setLastTodoSlug(data[data.length - 1].slug); // Met à jour le dernier `slug`
      }
    }
  }, [data]);

  // Intersection Observer pour charger plus de données au scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLastTodoSlug(todos[todos.length - 1]?.slug || null); // Met à jour le `slug` pour charger plus
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetching, todos]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* Affichage si la liste est vide */}
      {todos.length === 0 && !isLoading ? (
        <Typography variant="body1" color="gray">
          Aucune tâche disponible pour le moment.
        </Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
          {todos.map((todo) => (
            <HomeCardComponent key={todo.slug} todo={todo} />
          ))}
        </Box>
      )}

      {/* Indicateur de chargement */}
      {isLoading && (
        <Box mt={4} textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {/* Chargement automatique */}
      {hasMore && !isFetching && (
        <div ref={loadMoreRef} style={{ height: "20px", width: "100%" }} />
      )}

      {/* Bouton manuel pour charger plus */}
      {!hasMore && todos.length > 0 && (
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setLastTodoSlug(todos[todos.length - 1]?.slug)}>
          Charger plus
        </Button>
      )}
    </Box>
  );
}
