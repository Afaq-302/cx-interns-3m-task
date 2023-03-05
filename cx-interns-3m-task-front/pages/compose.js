import Nav from '../components/Nav'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import Router from 'next/router';
import Head from 'next/head'

export async function getServerSideProps(ctx) {
    const userSession = await getSession(ctx)

    if (userSession) {
        // console.log(projects);
        return {
            props: {
                userSession,
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

export default function Compose() {

    const handleAddProject = async (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            description: e.target.description.value
        }

        try {
            const res = await axios.post("/api/process?model=projects&action=add", data)
            console.log(res.data);
            Router.replace('/dashboard')

        } catch (error) {
            console.log(error);

        }
    }

    return (

        <>
            <Head>
                <title>New Project</title>
            </Head>
            <Nav />
            <div className='mb-6 mx-8'>
                <h2 className='text-2xl mt-4'>Add New Project</h2>

                <form onSubmit={handleAddProject}>
                    <label htmlFor='default-input' className='mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Title</label>
                    <input type='text' id='default-input' name='name' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Title...'></input>

                    <label htmlFor='message' className='mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Description</label>
                    <textarea id='message' name='description' rows='4' className='mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Description...'></textarea>
                    <button className="md:p-2 block rounded py-2 bg-purple-200 text-black hover:bg-purple-300 cursor-pointer mt-5"  >
                        Add Project
                    </button>

                </form>
            </div>
        </>
    )


}