import axios from 'axios';
import { useEffect, useState } from "react";

function Student() {
    const [studentid, setId] = useState('');
    const [studentname, setName] = useState("");
    const [studentaddress, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [students, setUsers] = useState([]);

    // useEffect(() => {
    //     (async () => await Load())();
    // }, []);

    useEffect(() =>{
        Load();
    },[])

    async function Load() {
        const result = await axios.get(
            "http://localhost:8081/api/v1/student/getAll");
        setUsers(result.data);
        console.log(result.data);
    }

    function save(){
        axios.post("http://localhost:8081/api/v1/student/save",
        {
            studentname:studentname,
            studentaddress:studentaddress,
            mobile:mobile
        });
        alert("Student Registered Successfully");
        setId("");
        setName("");
        setAddress("");
        setMobile("");
        Load();
    }

    function editStudent(students){
        setName(students.studentname);
        setAddress(students.studentaddress);
        setMobile(students.mobile);
        setId(students._id);
    }
    
    function DeleteStudent(studentid){
        axios.delete("http://localhost:8081/api/v1/student/delete/" + studentid);
        alert("Student deleted sccessfully");
        Load();
    }

    async function update(event) {
        event.preventDefault();

        try {
            await axios.put("http://localhost:8081/api/v1/student/edit/" + studentid,
                {

                    studentname: studentname,
                    studentaddress: studentaddress,
                    mobile: mobile

                });
            alert("Registation Updateddddd");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            Load();
        }
        catch (err) {
            alert("Student Updateddd Failed");
        }
    }

    return (
        <div>
            <h1 style={{textAlign:'center',fontWeight:'bold'}}>Student Details</h1>

            {/* form */}
            <form className='form-control'>
                <div className='form-group'>
                    <label>Student Name</label>
                    <input type='text' placeholder='Enter Name' className='form-control' value={studentname} onChange={(event) => {setName(event.target.value)}}/>
                </div>
                <div className='form-group'>
                    <label>Student Address</label>
                    <input type='text' placeholder='Enter address' className='form-control' value={studentaddress} onChange={(event) => {setAddress(event.target.value)}}/>
                </div>
                <div className='form-group'>
                    <label>Student Mobile</label>
                    <input type='text' placeholder='Enter Mobile Number' className='form-control' value={mobile} onChange={(event) => {setMobile(event.target.value)}}/>
                </div>
            </form>

            <div className='buttons'>
                <button className='btn btn-primary' onClick={save}>Register</button>
                <button className='btn btn-warning' onClick={update}>Update</button>
            </div>
            
            <br />
            <table class="table" align="center">
                <thead className='table-light'>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Student Address</th>
                        <th scope="col">Student Mobile</th>

                        <th scope="col">Option</th>
                    </tr>
                </thead>
                {students.map(function fn(student) {
                    return (
                        <tbody>
                            <tr>
                                <td>{student.studentname}</td>
                                <td>{student.studentaddress}</td>
                                <td>{student.mobile}</td>
                                <td>
                                    <button type="button" class="btn btn-warning" onClick={() => editStudent(student)}>Edit</button>
                                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}

export default Student;