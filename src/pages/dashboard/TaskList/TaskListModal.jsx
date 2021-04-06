import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import styled from "styled-components";

import TodoItem from "./TodoItem";

const TaskListModal = (props) => {
  const {
    className,
    startDate,
    toggle,
    modal,
    setAddTodosModal,
    filteredTodos,
    setFilteredTodos
  } = props;

  const externalCloseBtn = (
    <button
      className="close"
      style={{
        position: "absolute",
        top: "15px",
        right: "15%",
        color: "#fff",
        padding: "3px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={toggle}
    >
      &times;
    </button>
  );

  const sD = new Date(startDate);
  const readableDate = sD.toDateString();
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        external={externalCloseBtn}
      >
        <ModalHeader>{readableDate}</ModalHeader>
        <ModalBody>
          <Wrapper>
            <div className="todo-completed box">
              <p className="text-muted mb-3">List of all uncompleted Tasks</p>
              <div className="content">
                <small className="mb-3">
                  To mark a task completed, check the box
                </small>
                {filteredTodos &&
                  filteredTodos.map((todo) =>
                    todo.status === "" ? (
                      <TodoItem
                        task={todo}
                        setFilteredTodos={setFilteredTodos}
                        filteredTodos={filteredTodos}
                      />
                    ) : (
                      <div></div>
                    )
                  )}
              </div>
            </div>
            <div className="todo-uncompleted box">
              <p className="text-muted mb-3">List of all completed Tasks</p>

              <div className="content">
                <small className="mb-3">
                  {" "}
                  To mark a task completed, check the box
                </small>

                {filteredTodos &&
                  filteredTodos.map((todo) =>
                    todo.status !== "completed" ? (
                      <div></div>
                    ) : (
                      <TodoItem
                        task={todo}
                        setFilteredTodos={setFilteredTodos}
                        filteredTodos={filteredTodos}
                      />
                    )
                  )}
              </div>

              <img
                style={{
                  display:
                    startDate.toISOString().substring(0, 10) ===
                    new Date().toISOString().substring(0, 10)
                      ? "unset"
                      : startDate < new Date()
                      ? "none"
                      : "unset",
                }}
                onClick={() => setAddTodosModal(true)}
                src="/images/plus-icon.svg"
                className="plus-icon"
                alt=""
                height="70"
                width="70"
              />
            </div>
          </Wrapper>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TaskListModal;

const Wrapper = styled.div`
  position: relative;
  .plus-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    /* width: 7rem; */
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2rem;
  .todo-uncompleted {
    .content {
      background: #3b5999;
      color: white;
    }
  }

  .todo-completed {
    .content {
      background: #4c4c4c;

      color: white;
    }
  }
  .box {
    width: 100%;
    max-width: 26rem;
    .content {
      padding: 1rem;

      border-radius: 15px;
    }
  }
  .todo-item {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
    .text-content {
      margin-left: 1rem;
      small {
        /* text-align: center; */
        display: block;
      }
    }
  }
`;
