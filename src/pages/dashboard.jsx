import { useState, useEffect } from "react";
import { todos } from "@/service/todos";
import { todo } from "@/service/todo";
import { useAuthStore } from "@/store/useAuthStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const [getTodos, setGetTodos] = useState([]);
  const [getTodoItems, setGetTodoItems] = useState({});  const { auth_token } = useAuthStore();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todos(auth_token);
        setGetTodos(data);
        console.log("Fetched todos:", data);
      } catch (error) {
        console.log("Failed to fetch todos:", error);
      }
    };

    if (auth_token) {
      fetchTodos();
    }
  }, [auth_token]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todos(auth_token);
        setGetTodos(data);
        console.log("Fetched todos:", data);

        // Fetch items for each todo
        data.forEach(async (todoItem) => {
          const items = await todo(auth_token, todoItem.id); // Panggil API dengan todoId
          setGetTodoItems((prevItems) => ({
            ...prevItems,
            [todoItem.id]: items, // Simpan items berdasarkan todoId
          }));
        });
      } catch (error) {
        console.log("Failed to fetch todos:", error);
      }
    };

    if (auth_token) {
      fetchTodos();
    }
  }, [auth_token]);
  return (
    <>
    <div className="flex flex-colum gap-2">

    
{getTodos.map((todo) => (
<Card 
    key={todo.id}
    className="w-[350px] border border-[#01959F] bg-[#2df1ff23]">
      <CardHeader>
      <Label htmlFor="name" className="bg-[#72f6ff] border border-[#01959F] p-1 w-[35%] rounded-sm ">{todo.title}</Label>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      {getTodoItems[todo.id] && // Pastikan items untuk todo.id tersedia
            getTodoItems[todo.id].map((item) => (
              <CardContent key={item.id}>
                <p>{item.name}</p> {/* Menampilkan nama atau detail dari item */}
              </CardContent>
            ))}
      <CardFooter className="flex justify-between">
        
      </CardFooter>
    </Card>


      
         // Added a unique key for each item
      ))}
      </div>
    </>
  );
};

export default Dashboard;
