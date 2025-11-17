'use server';

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/libs/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const serverActionsToggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    throw `Todo coo id ${id} no encontrado`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete }
  });

  /* Cargue la ruta de nuevo, para validar que se hizo un cambio */
  revalidatePath('/dashboard/rest-todos');
  revalidatePath('/dashboard/server-todos');
  return updateTodo;
}

export const serverActionsAddTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { complete: false, description } })
    /* Cargue la ruta de nuevo, para validar que se hizo un cambio */
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    return {
      message: 'Error creando todo'
    }
  }
}

export const serverActionsDeleteCompleted = async (): Promise<void> => {
  const user = await getUserServerSession();
  if (!user) {
    return revalidatePath('/api/auth/signin')
  }
  await prisma.todo.deleteMany({
    where: { complete: true, userId: user.id }
  })
  revalidatePath('/dashboard/server-todos')
}