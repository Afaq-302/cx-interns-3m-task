import { data } from 'autoprefixer';
import axios from 'axios';
import { getSession } from 'next-auth/react'

export async function getProjects(token) {
    return await processApiRequest('get', `/api/projects?populate=*`, token)
}

export async function getProject(projectId, token) {
    return await processApiRequest('get', `/api/projects/${projectId}`, token)
}

export async function getTasksByProject(projectId, token) {
    return await processApiRequest('get', `/api/tasks?populate=*&filters[project][id][$eq]=${projectId}`, token)
}

export async function addProject(data, token) {
    return await processApiRequest('post', `/api/projects`, token, data)
}

export async function deleteProject(projectId, token) {
    return await processApiRequest('delete', `/api/projects/${projectId}`, token)
}

export async function editProject(data, token) {
    return await processApiRequest('put', `/api/projects/${data.id}`, token, data)
}

export async function deleteTask(taskId, token) {
    return await processApiRequest('delete', `/api/tasks/${taskId}`, token)
}

export async function addTask(data, token) {
    return await processApiRequest('post', `/api/tasks/${taskId}`, token, data)
}

async function processApiRequest(method, endpointUrl, token, data = null) {
    let config = {
        method,
        url: process.env.STRAPI_URL + endpointUrl,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    if (data) {
        config.data = {
            data
        }
    }

    const res = await axios.request(config)
    try {
        return res.data
    } catch (error) {
        return error.response.data
    }
}







// //Getting Projects
// async function processGetRequest(endpointUrl, token) {
//     const res = await axios.get(endpointUrl, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     try {
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }

// //Adding Project
// async function processPostRequest(endpointUrl, params, token) {
//     console.log(endpointUrl, params, token);
//     const res = await axios.post(endpointUrl, {
//         data: params
//     }, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     try {
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }

// //Deleting Project
// async function processDeleteRequest(endpointUrl, token) {
//     const res = await axios.delete(endpointUrl, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     try {
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }

// //Update Project
// async function processEditRequest(endpointUrl, data, token) {
//     const res = await axios.put(endpointUrl, {
//         data
//     }, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     try {
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }

// //Deleting Task

// async function processDeleteTask(endpointUrl, token) {
//     const res = await axios.delete(endpointUrl, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     try {
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }