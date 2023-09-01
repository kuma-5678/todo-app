import { Checkbox, Flex, Text, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Task = (props) => {
  return(
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox
        isChecked={props.isDone}
        colorScheme="red" 
        size="lg"
        onChange={() => {
          props.toggleIsDone(props.id, props.index);
        }}
      >
        <Text>{props.name}</Text>
      </Checkbox>
      <Button colorScheme='teal' variant='link'>
        <Link to={`/task/${props.id}`} mt="10px" >詳細</Link>
      </Button>
      <CloseIcon onClick={() => props.destroyTask(props.id)} />
    </Flex>
  )
}

export default Task;