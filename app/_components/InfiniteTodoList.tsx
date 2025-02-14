"use client";

import HomeCard from "@/components/HomeCard";
import { GetPaginatedTodosAction } from "@/features/todos/GetPaginatedTodos.action";
import { isActionSuccessful } from "@/lib/action/ActionUtils";
import { Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteTodoList = () => {
  const session = useSession();
  const [cursor, SetCursor] = useState<string>();
  const { ref: inViewRef, inView } = useInView();
  const pageSize = 3;

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["Todos"],
    queryFn: async () => {
      const result = await GetPaginatedTodosAction({
        take: pageSize,
        lastTodoSlug: cursor,
        ...(session.data?.user?.id && {
          includePrivate: session.data?.user?.id,
        }),
      });

      if (!isActionSuccessful(result)) throw new Error(result?.serverError);

      SetCursor(result.data[result.data?.length - 1].slug);
      return result;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < pageSize) return null;
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
          {page.data.map(({ slug, title, description, members, state }) => {
            const IsOwner =
              members
                .find((m) => m.userId === session.data?.user?.id)
                ?.roles.includes("OWNER") ?? false;

            return (
              <HomeCard
                key={slug}
                title={title}
                description={description ?? undefined}
                isLog={session.status === "authenticated"}
                isOwner={IsOwner}
                isPublic={state === "PUBLIC"}
              />
            );
          })}
        </React.Fragment>
      ))}

      <div ref={inViewRef} />
    </>
  );
};
