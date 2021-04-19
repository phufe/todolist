/*
 * FeaturePage
 *
 * List all the features
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ListTodo2 from '../../components/ListTodo2';

// MATERIAL UI
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import H1 from 'components/H1';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  root2: {
    width: "100%",
    backgroundColor: theme.palette.background.transparent
  },
  title: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    justifyContent: 'center',
  },
  container: {
    marginTop: '5px',
  },
  imgContainer: {
    display: 'block',
    margin: 'auto'
  },
}));

const URL = 'https://api-nodejs-todolist.herokuapp.com'
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak'
const axiosConfig = {
  headers: {
    Authorization: `${TOKEN}`
  }
}

export default function TodoPage2() {
    const classes = useStyles();
    const [tasks, setTasks] = useState([])
    const [addTask, setAddTask] = useState('')
    const [editMode, setEditMode] = useState({ isEdit: false, taskId: '' })
    const [taskInput, setTaskInput] = useState('')
    const [loading, setLoading] = useState(false)  
    
    useEffect(() => {
        ;(async () => await fetchTasks())()
    }, [])
    
    async function fetchTasks() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${URL}/task`, axiosConfig)
            setTasks(data.data)
        } catch (err) {
            console.error('Error: ', err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleCreateTask(e) {
        e.preventDefault()
        e.target.reset()
        try {
            setLoading(true)
            await axios.post(`${URL}/task`, axiosConfig)
            await fetchTasks()
        } catch (err) {
            console.error('Error: ', err.message)
        } finally {
            setLoading(false)
        }
    }
    
    async function handleEditTask(e, taskId) {
        try {
            setLoading(true)
            await axios.put(
              `${URL}/task/${taskId}`,
              { description: taskInput },
              axiosConfig
            )
            setEditMode({ isEdit: false, taskId: '' })
            await fetchTasks()
        } catch (err) {
            console.error('Error: ', err.message)
        } finally {
            setLoading(false)
        }    
    }
    
    
    async function handleDeleteTask(e, taskId, taskName) {
        e.preventDefault()
        const isConfirmed = window.confirm(`Are you sure to delete "${taskName}" ?`)
        if (isConfirmed) {
            try {
                setLoading(true)
                await axios.delete(`${URL}/task/${taskId}`, axiosConfig)
                await fetchTasks()
            } catch (err) {
                console.error('Error:', err.message)
            } finally {
                setLoading(false)
            }
        }
    }
      
    return (
        <div>
            <Helmet>
                <title>Todo List 2</title>
                <meta
                name="description"
                content="Add page of React.js Boilerplate application"
                />
            </Helmet>

            <H1 className={classes.title}>
                <FormattedMessage {...messages.header} />
            </H1>

            <Container maxWidth="md">
                <AppBar position="static">
                    <Toolbar variant="dense" className={classes.subtitle}>
                        <Typography variant="h6" color="inherit">
                            React Todo List
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.root}>
                    <Grid container spacing={2} className={classes.container}>
                        <Grid item xs={12}>
                            <form onSubmit={handleCreateTask}>
                                <Grid container justify="center" alignItems="center">
                                    <TextField
                                        id="standard-basic"
                                        label="Add Task"
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                            </form>
                        </Grid>
                        {loading ? (
                            <div className={classes.imgContainer}>
                                <img src="https://s4.gifyu.com/images/dinod9b5f2db539f2a9c.gif" className={classes.img}/>
                            </div>
                        ) : (
                            <Grid item xs={12}>
                                {tasks.map((task) => {
                                    return (
                                        <ListTodo2 
                                            key={task._id}
                                            todo={task}
                                            editMode={editMode}
                                            onDeleteTask={handleDeleteTask}
                                            onEditTask={handleEditTask}
                                            taskInput={taskInput}
                                            setTaskInput={setTaskInput}            
                                        />
                                    )
                                })}
                            </Grid>
                        )}
                    </Grid>
                </div>
            </Container>
        </div>
    );
}