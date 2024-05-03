import { useState } from 'react';
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />
      <Button onClick={addTask} colorScheme="blue" mt={2}>Add Task</Button>
      <List spacing={3} mt={5}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon as={task.completed ? FaCheckCircle : FaCheckCircle} color={task.completed ? 'green.500' : 'gray.500'} onClick={() => toggleCompletion(task.id)} cursor="pointer" />
            <Box flex="1" as="span" textDecoration={task.completed ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton
              aria-label="Delete task"
              icon={<FaTrash />}
              onClick={() => deleteTask(task.id)}
              colorScheme="red"
              variant="ghost"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;