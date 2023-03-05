import axios from 'axios';
import Nav from '../components/Nav';
import { signIn } from 'next-auth/react';
import { signUp } from '../services/auth';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react'
import Router from 'next/router';
import Head from 'next/head';


export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: '/dashboard',
            },
            props: {},
        };
    } else {
        return {

            props: {},
        };
    }
}

export default function Register() {

    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Set message to null upon fresh form submission
        setMessage(null);

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        try {
            const result = await axios.post('/api/register', data);
            console.log(result.data);
            // alert('Successfully Registered!');

            setMessage({
                status: 1,
                text: 'You have Registered Successfully!'
            })
            const res = await signIn('credentials', {
                redirect: false,
                ...data,
            });
            if (res.ok) {
                Router.replace('/dashboard');
                return;

            }

        } catch (error) {
            console.log(error.response.data.message);

            setMessage({
                status: 0,
                text: error.response.data.message
            });
        }
    }

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <Nav />
            <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md space-y-8'>
                    <div>
                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                            Sign Up!
                        </h2>

                    </div>

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

                    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                        <div className='-space-y-px rounded-md shadow-sm'>

                            <div>
                                <label htmlFor='email-address' className='sr-only'>
                                    Username
                                </label>
                                <input
                                    id='username'
                                    name='username'
                                    type='text'
                                    required
                                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                    placeholder='Username'
                                />
                            </div>
                            <div>
                                <label htmlFor='email-address' className='sr-only'>
                                    Email address
                                </label>
                                <input
                                    id='email-address'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                    placeholder='Email address'
                                />
                            </div>
                            <div >
                                <label htmlFor='password' className='sr-only'>
                                    Password
                                </label>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                    placeholder='Password'
                                />
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            {/* <div className='text-sm'>
                                <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                                    Forgot your password?
                                </a>
                            </div> */}
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            >
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                    <p className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
