import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Select, Table, TextInput } from "flowbite-react";
import useTeacher from "../app/useTeachers";
import { TeacherType } from "../types/Teacher.type";
import Loading from "../components/Loading";

const Teachers: React.FC = () => {
  const { loading, error, teachers, getTeachers } = useTeacher();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [editingTeacher, setEditingTeacher] = useState<TeacherType | null>(
    null
  );
  const [editedName, setEditedName] = useState<string>("");
  const [editedUserName, setEditedUserName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedGroup, setEditedGroup] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 4;

  useEffect(() => {
    getTeachers();
  }, []);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      // Perform delete operation
      await fetch(`http://localhost:3000/teachers/${id}`, {
        method: "DELETE",
      });
      // After successful deletion, fetch updated teachers list
      getTeachers();
    } catch (err) {
      console.error("Error deleting teacher:", err);
    }
  };

  const handleEdit = (teacher: TeacherType) => {
    setEditingTeacher(teacher);
    setEditedName(teacher.name);
    setEditedUserName(teacher.username);
    setEditedEmail(teacher.email);
    setEditedGroup(teacher.level);
  };

  const saveEditedTeacher = async () => {
    try {
      if (editingTeacher) {
        // Perform update operation
        await fetch(`http://localhost:3000/teachers/${editingTeacher.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedName,
            username: editedUserName,
            email: editedEmail,
            level: editedGroup, // Corrected property name from "group" to "level"
          }),
        });
        // After successful update, fetch updated teachers list
        getTeachers();
        // Reset editing state
        setEditingTeacher(null);
      }
    } catch (err) {
      console.error("Error updating teacher:", err);
    }
  };

  const filteredTeachers = teachers.filter(
    (teacher: TeacherType) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGroup === "" || teacher.level === selectedGroup)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {loading ? <Loading /> : null}
      <div className="flex justify-between p-3">
        <TextInput
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={darkMode ? "dark" : "light"}
        />
        <Select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className={darkMode ? "dark" : "light"}
        >
          <option value="">All Level</option>
          <option value="Junior">Junior</option>
          <option value="Middle">Middle</option>
          <option value="Senior">Senior</option>
        </Select>
        <Button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      {currentItems.length > 0 ? (
        <Table hoverable className={darkMode ? "dark" : "light"}>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>UserName</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Level</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems.map((teacher: TeacherType) => (
              <Table.Row
                key={teacher.id}
                className={darkMode ? "dark" : "light"}
              >
                <Table.Cell>
                  {editingTeacher === teacher ? (
                    <TextInput
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className={darkMode ? "dark" : "light"}
                    />
                  ) : (
                    teacher.name
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingTeacher === teacher ? (
                    <TextInput
                      value={editedUserName}
                      onChange={(e) => setEditedUserName(e.target.value)}
                      className={darkMode ? "dark" : "light"}
                    />
                  ) : (
                    teacher.username
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingTeacher === teacher ? (
                    <TextInput
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className={darkMode ? "dark" : "light"}
                    />
                  ) : (
                    teacher.email
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingTeacher === teacher ? (
                    <Select
                      value={editedGroup}
                      onChange={(e) => setEditedGroup(e.target.value)}
                      className={darkMode ? "dark" : "light"}
                    >
                      <option value="Junior">Junior</option>
                      <option value="Middle">Middle</option>
                      <option value="Senior">Senior</option>
                    </Select>
                  ) : (
                    teacher.level
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingTeacher === teacher ? (
                    <Button
                      onClick={saveEditedTeacher}
                      className={darkMode ? "dark" : "light"}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEdit(teacher)}
                      className={darkMode ? "dark" : "light"}
                    >
                      Edit
                    </Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => handleDelete(teacher.id)}
                    className={`font-medium ${darkMode ? "dark" : "light"}`}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : null}
      <div className="flex justify-center items-center mt-4">
        {totalPages > 1 && (
          <ul className="flex list-none">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } ${darkMode ? "dark" : "light"}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className={`text-center m-auto my-5 ${darkMode ? "dark" : "light"}`}
      >
        <Link to="/addteacher" className={darkMode ? "dark" : "light"}>
          Add Teacher
        </Link>
      </Button>
      {error ? <h2>{error.message}</h2> : null}
    </div>
  );
};

export default Teachers;
