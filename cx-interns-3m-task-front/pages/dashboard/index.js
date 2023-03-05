import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { getProjects } from '../../services/projects'
import Nav from '../../components/Nav'
import '/styles/Home.module.css'
import Router from 'next/router'

/** 
 * Checks user session whether user is loggedin or not

 * @param {*} ctx 
 * @returns 
 */
export async function getServerSideProps(ctx) {
    const userSession = await getSession(ctx)

    //If userSession is available, Then userSession and projects will be returned in Props,
    if (userSession) {
        const projects = await getProjects(userSession.jwt)

        return {
            props: {
                userSession,
                projects
            }
        }
        //If userSession not available then user will be redirected to login page
    } else {
        return {
            redirect: {
                destination: '/login',
            },
            props: {}
        }
    }
}

//This is our dashboard or home page. UserSession and projects are passed here as props.
export default function Home({ userSession, projects }) {
    //Created the message State for message to be shown
    const [message, setMessage] = useState(null)

    /**
     * This Function is used for deleting Project purpose
     * @param {*} projectId 
     */
    const deleteProject = async (projectId) => {
        const data = {
            projectId
        }

        //If any data is available in message we set here to null.
        setMessage(null)
        try {
            //Making A post request with action delete to our process model
            const res = await axios.post("/api/process?model=projects&action=delete", data)
            console.log(res.data)
            setMessage({ status: 1, text: 'Project Deleted!' })
            Router.replace('/dashboard')
            setTimeout(() => {
                setMessage(null)
            }, 3000)

        } catch (error) {
            setMessage({ status: 0, text: 'Error Deleting Project!' })
            console.log(error)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }

    //Setting a state variable for Editing Functionality
    const [editRecordData, setEditRecordData] = useState(null)

    const handleEditRecordData = (e, id = null) => {
        // console.log("id", id)
        // console.log("Event", e)
        if (id) {
            var data =
                editRecordData && editRecordData.id == id ? editRecordData : {}
            data.id = id
            console.log(editRecordData)
        }
        if (e) {
            var data = editRecordData ? editRecordData : {}
            data[e.target.getAttribute('name')] = e.target.value
        }
        setEditRecordData(data)
        console.log(data)
    }

    const submitProjectEdit = async (id) => {
        const result = await axios.post(
            `/api/process?model=projects&action=edit`,
            editRecordData
        )

        setEditRecordData(null)
        console.log('Processed Project Data ', result.data)
        Router.replace('/dashboard')
        setMessage({ status: 1, text: result.data.message })


        // setMessage(result.data.message)
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }


    // console.log('Dashboard ', userSession)
    // console.log('Dashboard ', projects)
    // console.log(userSession)

    return (

        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Nav userSession={userSession} />
            {message ? (
                <div
                    className={`flex items-center ${message.status ? 'bg-blue-500' : 'bg-red-500'
                        } text-white text-sm font-bold px-4 py-3`}
                    role='alert'
                >
                    <p>{message.text}</p>
                </div>
            ) : (
                ''
            )}

            <div className='py-10 bg-gray-100 h-screen'>
                <div className='mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

                    {projects.data.map((project) => (
                        <article className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300' key={project.id}>

                            <div className=' flex items-center h-40 space-x-1.5 rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600'>
                                <h2 className='mx-auto text-3xl px-2'>{editRecordData && editRecordData.id == project.id ? <input name='name' type="text" className='rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600 w-full text-center' defaultValue={project.attributes.name} onChange={(e) => handleEditRecordData(e)} /> : project.attributes.name}</h2>
                            </div>

                            <div className='mt-1 p-2 '>

                                {/* <p className='mt-1 text-sm text-slate-400'>{project.attributes.description}</p> */}
                                <p className='mt-1 text-sm text-slate-400 h-full'>{editRecordData && editRecordData.id == project.id ? <textarea className='text-sm text-slate-400 w-full resize-none overflow-y-hidden focus:outline-0 ' rows='5' defaultValue={project.attributes.description} onChange={(e) => handleEditRecordData(e)} name='description' ></textarea> : project.attributes.description}
                                </p>


                                <div className='mt-3 flex items-end justify-between'>
                                    <p className='text-lg font-bold text-blue-500'>{project.attributes.tasks.data.length} Tasks</p>
                                    <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                                        <Link href={`/dashboard/projects/${project.id}`} className='text-sm'>View Tasks</Link>
                                    </div>
                                </div>

                                <div className='flex mt-4'>
                                    <button onClick={() => editRecordData && editRecordData.id == project.id ? submitProjectEdit(project.id) : handleEditRecordData(null, project.id)} className='w-full rounded-lg bg-green-500 px-2 py-1.5 ml-auto mt-1 mr-2 text-white text-sm duration-100 hover:bg-green-600 cursor-pointer'>
                                        {editRecordData && editRecordData.id == project.id ?
                                            'Update' : 'Edit'
                                        }
                                    </button>

                                    <button onClick={() => deleteProject(project.id)} className='w-full rounded-lg bg-red-500 px-2 py-1.5 ml-auto mt-1  text-white text-sm duration-100 hover:bg-red-600 cursor-pointer'>
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}


