
import TaskList from './TaskList';
import * as TaskStories from './Task.stories';

import { Provider } from 'react-redux';

import { configureStore, createSlice } from '@reduxjs/toolkit';

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Python' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Html' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Css' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Java-script' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Bootstarp' },
    { ...TaskStories.Default.args.task, id: '6', title: 'React js' },
    { ...TaskStories.Default.args.task, id: '7', title: 'My Sql' },
    { ...TaskStories.Default.args.task, id: '8', title: 'Mongo db' },
    { ...TaskStories.Default.args.task, id: '9', title: 'Node js' },
    { ...TaskStories.Default.args.task, id: '10', title: 'Next js' },

  ],
  status: 'idle',
  error: null,
};

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
};

export const Default = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
  ],
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedtasks = [
        ...MockedState.tasks.slice(0, 15),
        { id: '6', title: 'React js (pinned)', state: 'TASK_PINNED' },
        { id: '1', title: 'Python (pinned)', state: 'TASK_PINNED' },
        { id: '3', title: 'Css (pinned)', state: 'TASK_PINNED' },
      ];

      return (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: pinnedtasks,
          }}
        >
          {story()}
        </Mockstore>
      );
    },
  ],
};

export const Loading = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          status: 'loading',
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};