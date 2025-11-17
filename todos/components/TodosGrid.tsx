'use client';

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";
import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from "next/navigation";
import { serverActionsToggleTodo } from "../actions/todo-actions";

interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter();

  /* SIN Server ACtions */
  /* const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodo(id, complete);
    // Al actualizar la ruta no altera el refresh de otros componentes
    // y no los altera. No es un refresh que destruye el estado de otros como
    // si se daría F5 que actualiza toda la pag.
    router.refresh();
  } */

  /* CON Server Actions: serverActionsToggleTodo */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={serverActionsToggleTodo} />
        ))
      }
    </div>
  )
}
