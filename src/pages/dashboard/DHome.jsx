import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PromptModal from "./AddTodo/PromptModal";
import AddTodoModal from "./AddTodo/AddTodoModal";
import TaskListModal from "./TaskList/TaskListModal";

import actions from "../../redux/actions";

const DHomePage = () => {
  const { getAllTodos } = actions;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todos);
  const todos = state.todos;

  const [startDate, setStartDate] = useState(new Date());
  const [pModal, setPModal] = useState(false);
  const [addTodosModal, setAddTodosModal] = useState(false);
  const [taskListModal, setTaskListModal] = useState(false);

  const [filteredTodos, setFilteredTodos] = useState([])

  const togglePModal = () => setPModal(!pModal);
  const toggleAddTodosModal = () => setAddTodosModal(!addTodosModal);
  const toggleTaskListModal = () => setTaskListModal(!taskListModal);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch, getAllTodos]);


  const onDateChange = (changedDate) => {
    const newDATE = new Date();
    setStartDate(changedDate);
    
    const filteredTasks =
      todos &&
      todos.filter(
        (task) =>
          task.start_time.substring(0, 10) ===
            changedDate.toISOString().substring(0, 10) ||
          task.end_time.substring(0, 10) ===
            changedDate.toISOString().substring(0, 10)
      );
    setFilteredTodos(filteredTasks)

    if ( changedDate.toISOString().substring(0, 10) === newDATE.toISOString().substring(0, 10)) {
      if (filteredTasks.length === 0) {
        setPModal(true);
      } else {
        setTaskListModal(true);
      }
    } else if (changedDate < newDATE) {
      if (filteredTasks.length === 0){
        return
      } else {
        setTaskListModal(true);
      }
    } else {
      if (filteredTasks.length === 0) {
        setPModal(true);
      } else {
        setTaskListModal(true);
      }
    }
  };

  return (
    <Wrapper className="">
      <p className="my-3 text-primary">Hello, Benjamin</p>
      <p className="my-3 text-dark font-weight-bold d-flex align-items-center justify-content-center">
        Select a Date from the Calendar to view or add a task
      </p>

      <div className="pick-date">
        <DatePicker
          selected={startDate}
          onChange={(date) => onDateChange(date)}
          // onChange={(date) => console.log('selected Date', date)}
          inline
        />
      </div>

      <PromptModal
        className="prompt-modal"
        modal={pModal}
        toggle={togglePModal}
        setAddTodosModal={setAddTodosModal}
      />

      <AddTodoModal
        buttonLabel="Add Todo"
        startDate={startDate}
        toggle={toggleAddTodosModal}
        setAddTodosModal={setAddTodosModal}
        modal={addTodosModal}
        setPModal={setPModal}
      />

      <TaskListModal
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
        className="task-list-modal"
        startDate={startDate}
        toggle={toggleTaskListModal}
        modal={taskListModal}
        setAddTodosModal={setAddTodosModal}
      />
    </Wrapper>
  );
};

export default DHomePage;

const Wrapper = styled.div`
  position: relative;
  .plus-icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .home-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 2rem;
    }
  }
  .pick-date {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
