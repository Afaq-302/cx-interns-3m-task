import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
// import { getProject, getTasksByProject } from '@/services/projects'
import { getProject, getTasksByProject } from '../../../services/projects';
import Nav from '../../../components/Nav'
import axios from 'axios';
import { useState } from 'react'
import Router from 'next/router';


export async function getServerSideProps(ctx) {
    const userSession = await getSession(ctx)

    const { projectId } = ctx.query;

    if (userSession) {
        const tasks = await getTasksByProject(projectId, userSession.jwt)
        const project = await getProject(projectId, userSession.jwt)

        return {
            props: {
                userSession,
                project: project.data,
                tasks,
            }
        }
    } else {
        return {
            redirect: {
                destination: '/login',
            },
            props: {}
        }
    }
}

export default function Project({ userSession, tasks, project }) {
    const [message, setMessage] = useState(null);

    const deleteTask = async (taskId, projectId) => {
        // console.log(projectId)
        const data = {
            taskId
        }
        //If any data is available in message we set here to null.
        // setMessage(null);
        try {
            // console.log("Data", data);
            const res = await axios.post("/api/process?model=tasks&action=delete", data)
            console.log(res.data);
            setMessage({ status: 1, text: 'Task Deleted!' })
            setTimeout(() => {
                setMessage(null)
            }, 3000)

            Router.replace(`/dashboard/projects/${projectId}`)

        } catch (error) {
            setMessage({ status: 0, text: 'Error Deleting Project!' })
            console.log(error);
            setTimeout(() => {
                setMessage(null)
            }, 3000)

        }
    }

    return (
        <div>
            <Head>
                <title>Project - Tasks</title>
            </Head>
            <Nav userSession={userSession} />
            <div className='py-10 bg-gray-100'>

                {/* <button className='lg:px-5 md:p-2 ml-3 hover:border-transparent font-semibold block bg-transparent rounded  hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500'><a href='/composetask'>New Task</a></button> */}

                <div className='mx-auto grid max-w-screen-2xl '>
                    {message ? (
                        <p
                            className={` ${message ? 'bg-blue-500' : 'bg-red-500'
                                } rounded-lg mx-auto text-white text-sm font-bold px-4 py-3 `}
                            role='alert'
                        >{message.text}</p>
                    ) : (
                        ''
                    )}

                    <article className='mt-4 rounded-xl mx-auto bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ' >


                        <div className='relative flex items-center h-14 space-x-1.5 rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600 mb-5'>
                            <h2 className='mx-auto text-2xl lg:px-12'>Tasks</h2>
                        </div>
                        {tasks.data.map((task) => (
                            <>
                                <div className='mt-1 rounded-xl bg-pink-500 text-white text-sm p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300'>
                                    <h2 className='text-lg' > {task.attributes.name}</h2>
                                    <button
                                        onClick={() => deleteTask(task.id, project.id)}
                                        type='button'
                                        className=' flex items-center justify-center px-1 py-1 font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                                    >Delete</button>
                                </div>

                            </>
                        ))}
                    </article>
                </div>
            </div>
        </div>
    )
}



