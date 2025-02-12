"use client";

import HomeCardComponent from "@/components/HomeCardComponent";
import { GetPaginatedTodosAction } from "@/features/todos/GetPaginatedTodos.action";
import { isActionSuccessful } from "@/lib/action/ActionUtils";
import { Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteTodoList = () => {
  const [cursor, SetCursor] = useState<string>();
  const { ref: inViewRef, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["Todos"],
    queryFn: async () => {
      const result = await GetPaginatedTodosAction({
        take: 2,
        lastTodoSlug: cursor,
      });

      if (!isActionSuccessful(result)) throw new Error(result?.serverError);

      SetCursor(result.data[result.data?.length - 1].slug);
      return result;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data[lastPage.data.length - 1].slug;
    },
  });
  useEffect(() => {
    if (inView && !isFetchingNextPage) fetchNextPage();
  }, [inView, isFetchingNextPage]);

  if (!data)
    return (
      <Typography variant="body1" color="gray">
        Aucune tâche disponible pour le moment.
      </Typography>
    );

  return (
    <>
      {data?.pages.map((page, idx) => (
        <React.Fragment key={idx}>
          {page.data.map(({ slug, title, description }) => (
            <HomeCardComponent
              key={slug}
              todo={{ title, description: description ?? undefined }}
            />
          ))}
        </React.Fragment>
      ))}

      <div ref={inViewRef} />
    </>
  );
};
