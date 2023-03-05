import { getSession } from "next-auth/react"
import { addProject, deleteProject, editProject } from "../../services/projects"
import { deleteTask } from "../../services/projects"


export default async function handler(req, res) {

    const userSession = await getSession({ req })
    // console.log(userSession)
    const { model, action } = req.query
    // console.log("Process", req.query);
    const data = req.body
    console.log('Request Body:', data.taskId);
    var result = { statusCode: 400, message: "Error Occured!" }

    if (model == "projects" && action == "add") {

        try {
            const resData = await addProject(data, userSession.jwt)
            console.log(resData)
            result.statusCode = 200
            result.message = "Project Successfuly Added!"
            result.data = resData.data

        } catch (error) {
            // res.status(result.statusCode).json(result)
            console.log(error.response.data)
        }

    }
    if (model == "projects" && action == "delete") {
        try {
            const resData = await deleteProject(data.projectId, userSession.jwt)
            console.log(resData)
            result.statusCode = 200
            result.message = "Project Successfuly Deleted!"
            result.data = resData.data

        } catch (error) {
            console.log(error)
        }
    }

    // if (model == "projects" && action == "update") {
    //     try {
    //         const resData = await editProject(data, userSession.jwt)
    //         console.log(resData)
    //         result.statusCode = 200
    //         result.message = "Project Successfuly Deleted!"
    //         result.data = resData.data

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    if (model == "projects" && action == "edit") {
        try {
            const resData = await editProject(data, userSession.jwt)
            console.log(resData)
            result.statusCode = 200
            result.message = "Project Successfuly Updated!"
            result.data = resData.data

        } catch (error) {
            console.log(error);
        }
    }

    if (model == "tasks" && action == "delete") {
        try {
            const resData = await deleteTask(data.taskId, userSession.jwt)
            // console.log(resData);
            result.statusCode = 200
            result.message = "Task Deleted!"
            result.data = resData.data

        } catch (error) {
            console.log(error.response.data.error);
        }
    }

    if (model == "tasks" && action == "add") {
        try {
            alert("Request Received")
            const resData = await deleteTask(data, userSession.jwt)
            // console.log(resData);
            result.statusCode = 200
            result.message = "Task Added"
            result.data = resData.data

        } catch (error) {
            console.log(error.response.data.error);
        }
    }
    res.status(result.statusCode).json(result)

}
