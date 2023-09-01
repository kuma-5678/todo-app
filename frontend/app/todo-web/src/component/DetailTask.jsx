import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Flex,
  Center,
  Box,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';

const DetailTask = () => {
  const { id } = useParams();
  const [detailTask, setDetailtask] = useState(null);

  useEffect(() => {
    const fetchDetailTask = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/tasks/${id}`);
        setDetailtask(res.data);
      } catch (error) {
        console.error("Error fetching detail task:", error);
      }
    };
    fetchDetailTask(); 
  }, [id]);

  return (
    <div>
      <Box mt='100px'>
        <Center>
          <Box mb="100px">
            <Text fontSize="24px" fontWeight="bold">
              タスク詳細
            </Text>
          </Box>
          <Box mt='70px'>
            <Text fontSize="20px" fontWeight="bold" mb='10px'>
              {detailTask && <span>{detailTask.name}</span>}
            </Text>
            <div>
              <span>タスク作成日：</span>
              {detailTask && 
                <span>
                  {new Date(detailTask.created_at).toLocaleDateString()}
                </span>
              }
            </div>
          </Box>
        </Center>
      </Box>
    </div>  
  )
};

export default DetailTask;

