import { createStudentType, studentType } from "./homeDataTypes";

const URL = "https://studentmgmtapi.vercel.app/"

export async function getStudentsAPI(url: string) {
    const serverResponse = await fetch(URL + url);
    const data = await serverResponse.json()
    return data.studnets
}
export async function createStudentAPI(url: string, studentDetails: createStudentType) {
    const serverResponse = await fetch(URL + url, {
        body: JSON.stringify(studentDetails),
        method: "POST"
    });
    const data = await serverResponse.json()
    return data.message
}
export async function deleteStudentAPI(url: string, emailId: string) {
    const serverResponse = await fetch(URL + url, {
        body: JSON.stringify({ emailId: emailId }),
        method: "POST"
    });
    const data = await serverResponse.json()
    return data.message
}
export async function editStudentDetailsAPI(url: string, studentDetails: studentType) {
    const serverResponse = await fetch(URL + url, {
        body: JSON.stringify(studentDetails),
        method: "POST"
    });
    const data = await serverResponse.json()
    return data.message
}
