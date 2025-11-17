'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from '@/todos/helpers/todos'
import { serverActionsAddTodo, serverActionsDeleteCompleted } from "../actions/todo-actions";


export const NewTodo = () => {

  const [description, setDescription] = useState('');
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length == 0) return;

    /* SIN Server Actions: */
    /* await todosApi.createTodo(description);
    setDescription('');
    // Vuelve a pedir al servidor la versión más reciente 
    // los componentes de servidor que dependen de datos.
    router.refresh(); */
    
    /* CON Server Actions: */
    /* await serverActionsAddTodo(description);
    setDescription(''); */

    /* SIN Server Actions, guardando TODO por user: */
    await todosApi.createTodo(description);
    setDescription('');
    router.refresh();
  }

  const deleteCompleted = async () => {
    /* SIN Server Actions: */
    /* await todosApi.deleteTodos();
    router.refresh(); */

    /* CON Server Actions: */
    await serverActionsDeleteCompleted();
  }

  return (
    <form
      onSubmit={onSubmit}
      className='flex w-full'>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />
      <button
        type='submit'
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      <span className='flex flex-1'></span>
      <button
        onClick={() => deleteCompleted()}
        type='button'
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        <span className="ml-2">
          Borrar completados
        </span>
      </button>
    </form>
  )
}