// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Task from "./component/Task";
import DetailTask from "./component/DetailTask";
import{
  Center,
  Box,
  CheckboxGroup,
  Text,
  Input,
  Flex,
  Button
} from "@chakra-ui/react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    const res = await axios.get("http://localhost:3001/tasks");
    console.log(res)
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post("http://localhost:3001/tasks", {  // ご自身の環境に合わせてURLを調整してください
      task:{
        name: name,
        is_done: false,
      }
    });
    setName("");     // 
    fetch();   // ← ここでデータを再取得します
  };

  const destroyTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    fetch();
  };

  const toggleIsDone = async (id, index) => {
    const isDone = tasks[index].is_done;
    await axios.put(`http://localhost:3001/tasks/${id}`, {
      is_done: !isDone,
    });
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Router>
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              タスク一覧
            </Text>
          </Box>
          <Flex mb="24px">
            <Input
              placeholder="タスク名を入力"
              vvalue={name.substring(0, 7)}
              onChange={(e) => setName(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを作成
              </Button>
            </Box>
          </Flex>
          <CheckboxGroup>
            {tasks.map((task, index) => {
              let displayedName = task.name.length > 7 ? task.name.substring(0,6) + "..." : task.name;
              return (
                <Task
                  id={task.id}
                  key={index}
                  index={index}
                  name={displayedName}
                  isDone={task.is_done}
                  toggleIsDone={toggleIsDone}
                  destroyTask={destroyTask}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
    <Routes>
      <Route path="/task/:id" element={<DetailTask />} />
    </Routes>
    </Router>
  );
};

export default App;
